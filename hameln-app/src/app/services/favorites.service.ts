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
}
