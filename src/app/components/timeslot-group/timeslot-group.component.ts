import { Component, input, computed, inject } from '@angular/core';
import { TimetableService } from '../../services/timetable.service';
import { FavoritesService } from '../../services/favorites.service';
import { TimetableEvent } from '../../models/timetable.model';
import { EventCardComponent } from '../event-card/event-card.component';

@Component({
  selector: 'app-timeslot-group',
  standalone: true,
  imports: [EventCardComponent],
  template: `
    @if (visibleEvents().length > 0) {
      <div class="timeslot-group">
        <h3 class="timeslot-time-header">
          {{ timeLabel() }}
        </h3>
        @for (ev of visibleEvents(); track ev.blockId || (ev.eventId ?? ev.title_ru) + '|' + ev.dateKey) {
          <app-event-card [event]="ev" [viewMode]="viewMode()" />
        }
      </div>
    }
  `,
  styles: [`
    .timeslot-group {
      margin-bottom: 1.25rem;
      padding: 1rem;
      background: linear-gradient(180deg, rgba(124,179,66,0.03), transparent);
      border-radius: 20px;
    }

    .timeslot-time-header {
      font-size: 1.1rem;
      font-weight: 700;
      color: #7CB342; /* Logo Green */
      margin: 0 0 1rem 0;
      padding: 0.5rem 0;
      border-bottom: 2px solid rgba(124,179,66,0.2);
    }
  `],
})
export class TimeslotGroupComponent {
  startTime = input.required<string>();
  endTime = input<string | null>(null);
  events = input.required<TimetableEvent[]>();
  viewMode = input.required<'all' | 'favorites'>();

  private readonly favoritesService = inject(FavoritesService);

  protected readonly timeLabel = computed(() => {
    const end = this.endTime();
    const start = this.startTime();
    if (end && end !== start) return `${start} - ${end}`;
    return start;
  });

  protected readonly visibleEvents = computed(() => {
    const mode = this.viewMode();
    return this.events().filter((ev) => {
      if (mode === 'all') return true;
      if (ev.eventType === 'meal') return true;
      
      const key = ev.blockId || `${ev.eventId ?? ev.title_ru}|${ev.dateKey}`;
      return this.favoritesService.isFavorite(key);
    });
  });
}
