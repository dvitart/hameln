import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { TimetableData, DaySchedule, EventLocation } from '../models/timetable.model';
import { HamelnConverterService } from './hameln-converter.service';

const GOOGLE_SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1N01z67kji_lReyBoVn0Uh18q5FOa5x2mLclceq1WtjI/export?format=csv&gid=1812892397';
const WORKSHOP_DETAILS_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vSY24UZ5yWEh5zmtL5y_kyEbgpRJFTiE8ZgonH6XurZViY_gmZFWPnayGP9dGnheCT5N2EjjPUUtG3a/pub?gid=1187319932&single=true&output=csv';
const CACHE_KEY = 'cachedTimetableData';

const DEFAULT_LOCATIONS: EventLocation[] = [
  { locationId: 'loc_1', name_ru: 'Главная палатка (1)', name_de: 'Hauptzelt (1)' },
  { locationId: 'loc_1a', name_ru: 'Павильон рядом с главной палаткой (1а)', name_de: 'Pavillon neben dem Hauptzelt (1a)' },
  { locationId: 'loc_2', name_ru: 'Просветительская палатка (2)', name_de: 'Informationszelt (2)' },
  { locationId: 'loc_3', name_ru: 'Палатка Рубикус (3)', name_de: 'Rubikus Zelt (3)' },
  { locationId: 'loc_4', name_ru: 'Рукодельная палатка (4)', name_de: 'Bastelzelt (4)' },
  { locationId: 'loc_7', name_ru: 'Центральная поляна (7)', name_de: 'Zentrale Lichtung (7)' },
  { locationId: 'loc_8', name_ru: 'Зеленые скамейки (8)', name_de: 'Grüne Bänke (8)' },
  { locationId: 'loc_10', name_ru: 'Дальняя поляна (10)', name_de: 'Entfernte Lichtung (10)' },
  { locationId: 'loc_11', name_ru: 'Футбольное поле (11)', name_de: 'Fußballfeld (11)' },
];

@Injectable({ providedIn: 'root' })
export class TimetableService {
  private readonly http = inject(HttpClient);
  private readonly converter = inject(HamelnConverterService);

  private readonly _data = signal<TimetableData | null>(null);
  private readonly _isLoading = signal(false);

  readonly isLoading = this._isLoading.asReadonly();
  readonly schedule = computed(() => this._data()?.schedule ?? {});
  readonly locations = computed(() => this._data()?.locations ?? DEFAULT_LOCATIONS);
  readonly dateKeys = computed(() => Object.keys(this.schedule()).sort());

  constructor() {
    this.loadFromCache();
  }

  loadFromCache(): void {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const cachedSchedule: Record<string, DaySchedule> = JSON.parse(raw);
        this._data.set({
          eventInfo: { eventName: 'Hameln', startDate: '2025-05-28', endDate: '2025-06-01', mainLanguage: 'ru' },
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
    } catch {
      console.warn('Fehler beim Speichern des Caches');
    }
  }

  async fetchFromGoogleSheets(): Promise<boolean> {
    this._isLoading.set(true);
    try {
      const ts = new Date().getTime();
      const [timetableCsv, workshopsCsv] = await Promise.all([
        firstValueFrom(this.http.get(`${GOOGLE_SHEET_CSV_URL}&_t=${ts}`, { responseType: 'text' })),
        firstValueFrom(this.http.get(`${WORKSHOP_DETAILS_CSV_URL}&_t=${ts}`, { responseType: 'text' })),
      ]);

      const result = this.converter.convert(timetableCsv, workshopsCsv);
      if (result?.schedule && Object.keys(result.schedule).length > 0) {
        this._data.set({ ...result, locations: DEFAULT_LOCATIONS });
        this.saveToCache(result.schedule);
        return true;
      }
    } catch (err) {
      console.error('Fehler beim Laden der Google Sheets Daten:', err);
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
