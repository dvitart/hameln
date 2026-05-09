import { Injectable, signal, computed } from '@angular/core';

const STORAGE_KEY = 'workshopFavorites';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly _favorites = signal<Set<string>>(
    new Set<string>(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]'))
  );

  readonly favorites = this._favorites.asReadonly();
  readonly count = computed(() => this._favorites().size);

  isFavorite(eventId: string): boolean {
    return this._favorites().has(eventId);
  }

  toggle(eventId: string): void {
    this._favorites.update((set) => {
      const next = new Set(set);
      if (next.has(eventId)) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  }

  /**
   * Migrates old-style favorites (eventId|dateKey) to new-style (blockId).
   * This is called once when the user views their favorites.
   */
  migrateToBlockIds(allEvents: any[]): void {
    const isMigrated = localStorage.getItem('favoritesMigrated_v4');
    if (isMigrated) return;

    this._favorites.update((set) => {
      const next = new Set(set);
      const oldKeysToRemove = new Set<string>();
      let changed = false;

      allEvents.forEach((ev) => {
        const oldKey = `${ev.eventId ?? ev.title_ru}|${ev.dateKey}`;
        if (next.has(oldKey) && ev.blockId) {
          next.add(ev.blockId);
          oldKeysToRemove.add(oldKey);
          changed = true;
        }
      });

      // Remove the old keys as requested
      oldKeysToRemove.forEach(key => {
        next.delete(key);
        changed = true;
      });

      if (changed) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      }
      
      localStorage.setItem('favoritesMigrated_v4', 'true');
      return next;
    });
  }
}
