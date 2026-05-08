import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { TimetableData, DaySchedule, TimetableEvent } from '../models/timetable.model';

@Injectable({ providedIn: 'root' })
export class ExcelConverterService {

  formatTime(time: string | undefined): string {
    if (!time) return '00:00';
    time = String(time).trim();
    if (/^\d{1}:\d{2}$/.test(time)) return '0' + time;
    return time;
  }

  addHours(time: string, hours: number): string {
    const [h, m] = time.split(':').map(Number);
    return `${String((h + hours) % 24).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  parseExcelDate(serial: number | string): string | null {
    const num = Number(serial);
    if (!isNaN(num) && num > 40000 && num < 50000) {
      const date = new Date(Math.round((num - 25569) * 86400 * 1000));
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    }
    return null;
  }

  extractEventId(content: string): string | null {
    if (!content) return null;
    const match = content.match(/\(W(\d+)\)/);
    return match ? match[0].replace(/[()]/g, '') : null;
  }

  private extractInlineTimeRange(text: string): { start: string; end: string; cleanedText: string } | null {
    const match = text.match(/^(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})\s+(.+)$/);
    if (match) {
      return {
        start: this.formatTime(match[1]),
        end: this.formatTime(match[2]),
        cleanedText: match[3].trim(),
      };
    }
    return null;
  }

  convert(timetableBuffer: ArrayBuffer, workshopsCsv: string): TimetableData {
    // 1. Parse workshops CSV
    const workshopsRows = Papa.parse<string[]>(workshopsCsv, { skipEmptyLines: false }).data;
    const workshopDetails: Record<string, { title_ru: string; description_ru: string; url: string }> = {};
    for (let i = 1; i < workshopsRows.length; i++) {
      const row = workshopsRows[i];
      const id = row[0];
      if (id && id.startsWith('W')) {
        workshopDetails[id] = {
          title_ru: row[2] ?? '',
          description_ru: row[5] ?? '',
          url: row[11] ?? '',
        };
      }
    }

    // 2. Parse Timetable Excel
    const workbook = XLSX.read(timetableBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    
    // Extract merges
    const merges = sheet['!merges'] || [];

    const getRowSpan = (r: number, c: number): number => {
      const merge = merges.find(m => m.s.r === r && m.s.c === c);
      return merge ? (merge.e.r - merge.s.r) + 1 : 1;
    };

    const data = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1, raw: false, defval: '' });

    const schedule: Record<string, DaySchedule> = {};
    let currentDayKey: string | null = null;
    let currentTime: string | null = null;

    const locationColMap: Record<number, string> = {
      2: 'loc_1', 3: 'loc_1a', 4: 'loc_2', 5: 'loc_3',
      6: 'loc_4', 7: 'loc_7', 8: 'loc_8', 9: 'loc_10', 10: 'loc_11',
    };
    const LOCATION_COLS = [2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Pre-calculate exact start times for each row based on col1 or meals
    const rowTimes: string[] = [];
    for (let r = 0; r < data.length; r++) {
      const row = data[r];
      if (!row) { rowTimes[r] = ''; continue; }
      
      const col1 = String(row[1] ?? '').trim();
      const col2 = String(row[2] ?? '').trim();

      if (/\d{1,2}:\d{2}/.test(col1)) {
        const dashIdx = col1.indexOf('-');
        const startRaw = dashIdx >= 0 ? col1.slice(0, dashIdx).trim() : col1;
        rowTimes[r] = this.formatTime(startRaw);
      } else if (col2 === 'Обед') {
        rowTimes[r] = '14:00';
      } else if (col2 === 'Ужин') {
        rowTimes[r] = '18:00';
      } else {
        rowTimes[r] = '';
      }
    }

    // Process actual data
    for (let r = 3; r < data.length; r++) {
      const row = data[r];
      if (!row || row.length === 0) continue;

      const col1 = String(row[1] ?? '').trim();
      const col2 = String(row[2] ?? '').trim();

      let parsedDate: string | null = null;
      let dayLabel = '';

      const dateSource = /\d{2}\.\d{2}\.\d{4}/.test(col1) ? col1
                       : /\d{2}\.\d{2}\.\d{4}/.test(col2) ? col2
                       : null;

      if (dateSource) {
        const dateMatch = dateSource.match(/(\d{2})\.(\d{2})\.(\d{4})/);
        if (dateMatch) {
          parsedDate = `${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}`;
          dayLabel = dateSource.split(',')[0].trim();
        }
      } else {
        // Try Excel serial date
        const excelDate1 = this.parseExcelDate(col1);
        const excelDate2 = this.parseExcelDate(col2);
        const validExcelDate = excelDate1 || excelDate2;
        
        if (validExcelDate) {
          parsedDate = validExcelDate;
          const dateObj = new Date(parsedDate);
          const weekdays = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
          dayLabel = weekdays[dateObj.getDay()];
        }
      }

      if (parsedDate) {
        currentDayKey = parsedDate;
        schedule[currentDayKey] = {
          dayLabel_ru: dayLabel,
          fullDayDescription_ru: dayLabel + ', ' + parsedDate.split('-').reverse().join('.'),
          events: [],
        };
        currentTime = null;
        continue;
      }

      if (!currentDayKey) continue;

      if (rowTimes[r]) {
        currentTime = rowTimes[r];
      }

      if (!currentTime) continue;

      const processEvent = (content: string, colIdx: number, locationId: string | null) => {
        if (!content) return;
        
        const rowSpan = getRowSpan(r, colIdx);
        let endTime = '';

        // Find the time of the row AFTER the merge ends
        for (let nextR = r + rowSpan; nextR < data.length; nextR++) {
           if (rowTimes[nextR]) {
              endTime = rowTimes[nextR];
              break;
           }
        }
        
        if (!endTime) {
          // Fallback if it's the very last event of the day
          endTime = this.addHours(currentTime!, 1);
        }

        const inline = this.extractInlineTimeRange(content);
        const eventText = inline ? inline.cleanedText : content;
        const finalStart = inline ? inline.start : currentTime!;
        const finalEnd = inline ? inline.end : endTime;

        const eventId = this.extractEventId(eventText);
        const title = eventText.replace(/\(W\d+\)/, '').trim();
        const details = eventId ? workshopDetails[eventId] : null;

        schedule[currentDayKey!].events.push({
          dateKey: currentDayKey!,
          eventId,
          title_ru: title || (details?.title_ru ?? ''),
          eventType: 'workshop',
          description_ru: details?.description_ru ?? '',
          url: details?.url ?? '',
          locationId,
          startTime: finalStart,
          endTime: finalEnd,
        });
      };

      for (const col of LOCATION_COLS) {
        processEvent(String(row[col] ?? '').trim(), col, locationColMap[col]);
      }

      // "Other place" columns 11 + 12
      const otherName = String(row[11] ?? '').trim();
      const otherPlace = String(row[12] ?? '').trim();
      if (otherName) {
         processEvent(otherName, 11, otherPlace || null);
      }
    }

    return {
      eventInfo: {
        eventName: 'Hameln',
        startDate: '2026-05-13',
        endDate: '2026-05-17',
        mainLanguage: 'ru',
      },
      locations: [],
      schedule,
    };
  }
}
