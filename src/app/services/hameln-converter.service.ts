import { Injectable } from '@angular/core';
import Papa from 'papaparse';
import { TimetableData, DaySchedule, TimetableEvent } from '../models/timetable.model';

@Injectable({ providedIn: 'root' })
export class HamelnConverterService {
  private readonly locationMapping: Record<number, string> = {
    2: 'loc_1',
    3: 'loc_1a',
    4: 'loc_2',
    5: 'loc_3',
    6: 'loc_4',
    7: 'loc_7',
    8: 'loc_8',
    9: 'loc_10',
    10: 'loc_11',
  };

  parseCSV(text: string): string[][] {
    const result = Papa.parse<string[]>(text, { skipEmptyLines: true });
    return result.data;
  }

  formatTime(time: string | undefined): string {
    if (!time) return '00:00';
    time = time.trim();
    if (/^\d{1}:\d{2}$/.test(time)) return '0' + time;
    return time;
  }

  addOneHour(time: string): string {
    const [h, m] = time.split(':').map(Number);
    return `${String((h + 1) % 24).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  extractEventId(content: string): string | null {
    if (!content) return null;
    const match = content.match(/\(W(\d+)\)/);
    return match ? match[0].replace(/[()]/g, '') : null;
  }

  convert(timetableCsv: string, workshopsCsv: string): TimetableData {
    const timetableRows = this.parseCSV(timetableCsv);
    const workshopsRows = this.parseCSV(workshopsCsv);

    // Map Workshop Details by ID
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

    const schedule: Record<string, DaySchedule> = {};
    let currentDayKey: string | null = null;

    for (let i = 3; i < timetableRows.length; i++) {
      const row = timetableRows[i];

      // Date detection
      const dateStr =
        (row[1] && /\d{2}\.\d{2}\.\d{4}/.test(row[1])) ? row[1] :
        (row[2] && /\d{2}\.\d{2}\.\d{4}/.test(row[2])) ? row[2] : null;

      if (dateStr) {
        const m = dateStr.match(/(\d{2})\.(\d{2})\.(\d{4})/);
        if (m) {
          currentDayKey = `${m[3]}-${m[2]}-${m[1]}`;
          schedule[currentDayKey] = {
            dayLabel_ru: dateStr.split(',')[0].trim(),
            fullDayDescription_ru: dateStr.trim(),
            events: [],
          };
          continue;
        }
      }

      const timeStr = row[1];
      if (timeStr && timeStr.includes(':') && currentDayKey) {
        const startRaw = timeStr.split('-')[0].trim();
        const endRaw = timeStr.includes('-') ? timeStr.split('-')[1].trim() : null;
        const startTime = this.formatTime(startRaw);
        const endTime = endRaw ? this.formatTime(endRaw) : this.addOneHour(startTime);

        // Location columns 2–10
        for (let col = 2; col <= 10; col++) {
          const content = row[col];
          if (content && content.trim()) {
            const event = this.buildEvent(content, startTime, endTime, this.locationMapping[col] ?? null, workshopDetails, currentDayKey);
            schedule[currentDayKey].events.push(event);
          }
        }

        // "Other place" column 11
        const other = row[11];
        if (other && other.trim()) {
          const event = this.buildEvent(other, startTime, endTime, null, workshopDetails, currentDayKey);
          schedule[currentDayKey].events.push(event);
        }
      }
    }

    return {
      eventInfo: {
        eventName: 'Hameln',
        startDate: '2025-05-28',
        endDate: '2025-06-01',
        mainLanguage: 'ru',
      },
      locations: [],
      schedule,
    };
  }

  private buildEvent(
    content: string,
    startTime: string,
    endTime: string,
    locationId: string | null,
    workshopDetails: Record<string, { title_ru: string; description_ru: string; url: string }>,
    dateKey: string
  ): TimetableEvent {
    const eventId = this.extractEventId(content);
    const title = content.replace(/\(W\d+\)/, '').trim();
    const details = eventId ? workshopDetails[eventId] : null;

    return {
      dateKey,
      eventId,
      title_ru: title || (details?.title_ru ?? ''),
      eventType: 'workshop',
      description_ru: details?.description_ru ?? '',
      url: details?.url ?? '',
      locationId,
      startTime,
      endTime,
    };
  }
}
