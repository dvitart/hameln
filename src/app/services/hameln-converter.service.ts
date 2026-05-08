import { Injectable } from '@angular/core';
import Papa from 'papaparse';
import { TimetableData, DaySchedule, TimetableEvent } from '../models/timetable.model';

@Injectable({ providedIn: 'root' })
export class HamelnConverterService {

  parseCSV(text: string): string[][] {
    const result = Papa.parse<string[]>(text, { skipEmptyLines: false });
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

  /**
   * Extract inline time range from event text like "8:00 - 13:00 Регистрация..."
   * Returns { start, end, cleanedText } or null if no inline range found.
   */
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

    // CSV column layout (0-indexed):
    //  0 = Wochentag
    //  1 = Zeit or Datum
    //  2 = Hauptzelt (1)       -> loc_1
    //  3 = Pavillon (1a)       -> loc_1a
    //  4 = Infozelt (2)        -> loc_2
    //  5 = Rubikus (3)         -> loc_3
    //  6 = Bastelzelt (4)      -> loc_4
    //  7 = Zentrale Lichtung   -> loc_7
    //  8 = Grüne Bänke (8)     -> loc_8
    //  9 = Дальняя поляна (10) -> loc_10
    // 10 = Fußballfeld (11)    -> loc_11
    // 11 = Другое место – Was
    // 12 = Другое место – Wo

    const locationColMap: Record<number, string> = {
      2: 'loc_1', 3: 'loc_1a', 4: 'loc_2', 5: 'loc_3',
      6: 'loc_4', 7: 'loc_7', 8: 'loc_8', 9: 'loc_10', 10: 'loc_11',
    };
    const LOCATION_COLS = [2, 3, 4, 5, 6, 7, 8, 9, 10];

    const schedule: Record<string, DaySchedule> = {};
    let currentDayKey: string | null = null;
    let currentTime: string | null = null;

    // Per-column tracking for merged cell reconstruction
    const activeEvents: Map<number, TimetableEvent> = new Map();

    const finalizeAllActive = (endTime: string): void => {
      for (const [, evt] of activeEvents) {
        evt.endTime = endTime;
      }
      activeEvents.clear();
    };

    const finalizeColumn = (col: number, endTime: string): void => {
      const evt = activeEvents.get(col);
      if (evt) {
        evt.endTime = endTime;
        activeEvents.delete(col);
      }
    };

    for (let i = 3; i < timetableRows.length; i++) {
      const row = timetableRows[i];
      // --- Day header detection (date can be in col1 OR col2) ---
      const col1 = row[1]?.trim() ?? '';
      const col2 = row[2]?.trim() ?? '';
      const dateSource = /\d{2}\.\d{2}\.\d{4}/.test(col1) ? col1
                       : /\d{2}\.\d{2}\.\d{4}/.test(col2) ? col2
                       : null;
      if (dateSource) {
        const dateMatch = dateSource.match(/(\d{2})\.(\d{2})\.(\d{4})/);
        if (dateMatch) {
          // Finalize all active events from previous day
          if (currentTime) {
            finalizeAllActive(this.addOneHour(currentTime));
          }
          currentDayKey = `${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}`;
          schedule[currentDayKey] = {
            dayLabel_ru: dateSource.split(',')[0].trim(),
            fullDayDescription_ru: dateSource,
            events: [],
          };
          currentTime = null;
          continue;
        }
      }


      if (!currentDayKey) continue;

      // --- Time parsing ---
      if (/\d{1,2}:\d{2}/.test(col1)) {
        const dashIdx = col1.indexOf('-');
        const startRaw = dashIdx >= 0 ? col1.slice(0, dashIdx).trim() : col1;
        currentTime = this.formatTime(startRaw);
      }

      if (!currentTime) continue;

      // --- Determine if this row has any new content in location columns ---
      const filledCols = new Set<number>();
      for (const col of LOCATION_COLS) {
        if (row[col]?.trim()) {
          filledCols.add(col);
        }
      }
      const hasAnyNewContent = filledCols.size > 0;

      // --- If this row has new content: finalize active events in columns that NOW have new content ---
      // --- If this row is entirely empty (continuation): extend all active events ---
      for (const col of LOCATION_COLS) {
        const content = row[col]?.trim();
        if (content) {
          // New content in this column → finalize any active event, start new one
          finalizeColumn(col, currentTime);

          // Check for inline time range (e.g. "8:00 - 13:00 Регистрация...")
          const inline = this.extractInlineTimeRange(content);
          const eventText = inline ? inline.cleanedText : content;
          const startTime = inline ? inline.start : currentTime;
          const endTime = inline ? inline.end : this.addOneHour(currentTime);

          const event = this.buildEvent(
            eventText, startTime, endTime,
            locationColMap[col], workshopDetails, currentDayKey
          );
          schedule[currentDayKey].events.push(event);

          // Only track for merge-extension if no inline range
          if (!inline) {
            activeEvents.set(col, event);
          }
        } else if (!hasAnyNewContent) {
          // Truly empty continuation row → extend active event in this column
          const active = activeEvents.get(col);
          if (active) {
            active.endTime = this.addOneHour(currentTime);
          }
        } else {
          // Row has content in OTHER columns but not this one → finalize this column's event
          finalizeColumn(col, currentTime);
        }
      }

      // --- "Other place" columns 11 + 12 ---
      const otherName = row[11]?.trim();
      const otherPlace = row[12]?.trim();
      if (otherName) {
        // "Other" events always get exact 1-hour slots (no merge tracking)
        const inline = this.extractInlineTimeRange(otherName);
        const eventText = inline ? inline.cleanedText : otherName;
        const startTime = inline ? inline.start : currentTime;
        const endTime = inline ? inline.end : this.addOneHour(currentTime);

        const event = this.buildEvent(
          eventText, startTime, endTime,
          otherPlace ?? null, workshopDetails, currentDayKey
        );
        schedule[currentDayKey].events.push(event);
      }
    }

    // Finalize any remaining active events at end of data
    if (currentTime) {
      finalizeAllActive(this.addOneHour(currentTime));
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
