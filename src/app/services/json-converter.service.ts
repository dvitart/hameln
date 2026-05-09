import { Injectable } from '@angular/core';
import { TimetableData, DaySchedule, TimetableEvent, EventLocation } from '../models/timetable.model';

interface WorkshopBlock {
  WSID: string;
  blockID: string;
  name: string;
  leader: string;
  start: string;
  end: string;
  place: string;
  link: string | null;
}

interface Workshop {
  ID: string;
  name: string;
  leader: string;
  description: string;
  link: string | null;
  category: string;
  blocks: WorkshopBlock[];
  nickName?: string;
}

@Injectable({ providedIn: 'root' })
export class JsonConverterService {

  private readonly locationMap: Record<string, string> = {
    'Главная палатка': 'loc_1',
    'Павильон рядом с главной палаткой': 'loc_1a',
    'Просветительская палатка': 'loc_2',
    'Палатка Рубикус': 'loc_3',
    'Рукодельная палатка': 'loc_4',
    'Центральная поляна': 'loc_7',
    'Зеленые скамейки': 'loc_8',
    'Дальняя поляна': 'loc_10',
    'Футбольное поле': 'loc_11',
    'Танцплощадка': 'loc_11', // Mapping unknown to soccer field/dance floor
  };

  convert(workshops: Workshop[]): TimetableData {
    const schedule: Record<string, DaySchedule> = {};
    const dateKeysSet = new Set<string>();

    for (const ws of workshops) {
      for (const block of ws.blocks) {
        if (!block.start || !block.end) continue;

        // Extract date and time from ISO string
        // Assuming the time in JSON is the intended display time (ignoring UTC vs Local for now as it's likely pre-formatted)
        const startDateObj = new Date(block.start);
        const endDateObj = new Date(block.end);
        if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) continue;

        const dateKey = block.start.split('T')[0]; // YYYY-MM-DD
        
        const formatTime = (date: Date) => {
          return date.getHours().toString().padStart(2, '0') + ':' + 
                 date.getMinutes().toString().padStart(2, '0');
        };

        const startTime = formatTime(startDateObj);
        const endTime = formatTime(endDateObj);

        dateKeysSet.add(dateKey);

        if (!schedule[dateKey]) {
          const weekdays = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
          const dayLabel = weekdays[startDateObj.getUTCDay()];
          schedule[dateKey] = {
            dayLabel_ru: dayLabel,
            fullDayDescription_ru: `${dayLabel}, ${dateKey.split('-').reverse().join('.')}`,
            events: [],
          };
        }

        const locationId = this.mapLocation(block.place);

        schedule[dateKey].events.push({
          dateKey,
          eventId: ws.ID,
          title_ru: ws.name,
          eventType: 'workshop',
          description_ru: ws.description,
          host: block.leader || ws.leader || '',
          category: ws.category || '',
          nickName: ws.nickName || '',
          wsId: block.WSID || ws.ID || '',
          blockId: block.blockID || '',
          url: block.link || ws.link || '',
          locationId,
          startTime,
          endTime,
        });
      }
    }

    // Sort events by start time
    for (const key of Object.keys(schedule)) {
      schedule[key].events.sort((a, b) => a.startTime.localeCompare(b.startTime));
    }

    return {
      eventInfo: {
        eventName: 'Hameln',
        startDate: '2026-05-13',
        endDate: '2026-05-17',
        mainLanguage: 'ru',
      },
      locations: [], // Will be filled with DEFAULT_LOCATIONS in TimetableService
      schedule,
    };
  }

  private mapLocation(place: string): string | null {
    if (!place) return null;
    
    // Try exact match
    if (this.locationMap[place]) return this.locationMap[place];

    // Try substring match
    for (const [key, value] of Object.entries(this.locationMap)) {
      if (place.includes(key) || key.includes(place)) {
        return value;
      }
    }

    return null;
  }
}
