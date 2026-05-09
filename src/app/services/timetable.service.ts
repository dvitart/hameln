import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { TimetableData, DaySchedule, EventLocation } from '../models/timetable.model';
import { JsonConverterService } from './json-converter.service';

const WORKSHOPS_API_URL = 'https://script.google.com/macros/s/AKfycbzLvPkIFQFL-j_VGj4CdJdKWSxagfoB6WVlIhRuOnqDUm9kSOy7lFyrqzjO7ViZikYSlA/exec';
const CACHE_KEY = 'cachedTimetableData';
const CACHE_TS_KEY = 'cachedTimetableTimestamp';
const CACHE_DURATION_MS = 30 * 60 * 1000;

const DEFAULT_LOCATIONS: EventLocation[] = [
  { locationId: 'loc_1', name_ru: 'Главная палатка (1)', name_de: 'Hauptzelt (1)' },
  { locationId: 'loc_1a', name_ru: 'Павильон рядом с главной палаткой', name_de: 'Pavillon neben dem Hauptzelt (1a)' },
  { locationId: 'loc_2', name_ru: 'Просветительская палатка', name_de: 'Informationszelt (2)' },
  { locationId: 'loc_3', name_ru: 'Палатка Рубикус', name_de: 'Rubikus Zelt (3)' },
  { locationId: 'loc_4', name_ru: 'Рукодельная палатка', name_de: 'Bastelzelt (4)' },
  { locationId: 'loc_7', name_ru: 'Центральная поляна', name_de: 'Zentrale Lichtung (7)' },
  { locationId: 'loc_8', name_ru: 'Зеленые скамейки', name_de: 'Grüne Bänke (8)' },
  { locationId: 'loc_10', name_ru: 'Дальняя поляна', name_de: 'Entfernte Lichtung (10)' },
  { locationId: 'loc_11', name_ru: 'Футбольное поле', name_de: 'Fußballfeld (11)' },
];

@Injectable({ providedIn: 'root' })
export class TimetableService {
  private readonly http = inject(HttpClient);
  private readonly jsonConverter = inject(JsonConverterService);

  private readonly _data = signal<TimetableData | null>(null);
  private readonly _isLoading = signal(false);

  readonly isLoading = this._isLoading.asReadonly();
  readonly schedule = computed(() => this._data()?.schedule ?? {});
  readonly locations = computed(() => this._data()?.locations ?? DEFAULT_LOCATIONS);
  readonly dateKeys = computed(() => Object.keys(this.schedule()).sort());
  readonly showDisclaimer = signal(false);

  constructor() {
    this.loadFromCache();
  }

  loadFromCache(): void {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const cachedSchedule: Record<string, DaySchedule> = JSON.parse(raw);
        this._data.set({
          eventInfo: { eventName: 'Hameln', startDate: '2026-05-13', endDate: '2026-05-17', mainLanguage: 'ru' },
          locations: DEFAULT_LOCATIONS,
          schedule: cachedSchedule,
        });
      }
    } catch {
      console.warn('Fehler beim Laden des Caches');
    }
  }

  saveToCache(schedule: Record<string, DaySchedule>): void {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(schedule));
      localStorage.setItem(CACHE_TS_KEY, new Date().getTime().toString());
    } catch {
      console.warn('Fehler beim Speichern des Caches');
    }
  }

  private isCacheValid(): boolean {
    const lastFetch = localStorage.getItem(CACHE_TS_KEY);
    if (!lastFetch) return false;
    const now = new Date().getTime();
    return (now - parseInt(lastFetch, 10)) < CACHE_DURATION_MS;
  }

  async fetchFromGoogleSheets(forceRefresh = false): Promise<boolean> {
    // If not forced and cache is valid, don't fetch
    if (!forceRefresh && this.isCacheValid() && this._data()) {
      return true;
    }

    this._isLoading.set(true);
    try {
      const ts = new Date().getTime();
      const workshops = await firstValueFrom(this.http.get<any[]>(`${WORKSHOPS_API_URL}?_t=${ts}`));

      const result = this.jsonConverter.convert(workshops);

      if (result?.schedule && Object.keys(result.schedule).length > 0) {
        this._data.set({ ...result, locations: DEFAULT_LOCATIONS });
        this.saveToCache(result.schedule);
        return true;
      }
    } catch (err) {
      console.error('Fehler beim Laden der Workshop-Daten:', err);
    } finally {
      this._isLoading.set(false);
    }
    return false;
  }

  getLocationName(locationId: string | null): string {
    if (!locationId) return '';
    const loc = this.locations().find((l) => l.locationId === locationId);
    return loc?.name_ru ?? '';
  }
}
