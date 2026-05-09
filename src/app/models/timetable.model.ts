export interface EventLocation {
  locationId: string;
  name_ru: string;
  name_de: string;
}

export type EventType =
  | 'workshop'
  | 'meal'
  | 'general_activity'
  | 'registration'
  | 'ceremony';
export interface TimetableEvent {
  dateKey: string;
  eventId: string | null;
  title_ru: string;
  eventType: EventType;
  description_ru: string;
  host?: string;
  category?: string;
  nickName?: string;
  wsId?: string;
  blockId?: string;
  details_ru?: string;
  targetAudience_ru?: string;
  url: string;
  locationId: string | null;
  startTime: string;
  endTime: string;
}

export interface DaySchedule {
  dayLabel_ru: string;
  fullDayDescription_ru: string;
  events: TimetableEvent[];
}

export interface TimetableData {
  eventInfo: {
    eventName: string;
    startDate: string;
    endDate: string;
    mainLanguage: string;
  };
  locations: EventLocation[];
  schedule: Record<string, DaySchedule>;
}
