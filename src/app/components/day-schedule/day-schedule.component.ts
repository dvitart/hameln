import { Component, input, computed, inject } from '@angular/core';
import { TimetableService } from '../../services/timetable.service';
import { TimetableEvent } from '../../models/timetable.model';
import { TimeslotGroupComponent } from '../timeslot-group/timeslot-group.component';

interface TimeslotGroup {
  startTime: string;
  endTime: string | null;
  events: TimetableEvent[];
}

@Component({
  selector: 'app-day-schedule',
  standalone: true,
  imports: [TimeslotGroupComponent],
  template: `
    <div class="day-schedule">
      <h2 class="day-header">{{ dayDescription() }}</h2>

      @if (timeslots().length === 0) {
        <p class="no-events">Мероприятий на этот день не запланировано.</p>
      } @else {
        @for (slot of timeslots(); track slot.startTime) {
          <app-timeslot-group
            [startTime]="slot.startTime"
            [endTime]="slot.endTime"
            [events]="slot.events"
            [viewMode]="viewMode()"
          />
        }
      }
    </div>
  `,
  styles: [`
    .day-schedule {
      padding: 0 0.5rem;
    }

    .day-header {
      font-family: 'Comfortaa', cursive;
      font-size: 1.4rem;
      font-weight: 700;
      color: #2d3748;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      border-bottom: 3px solid #4FC3F7; /* Logo Blue */
    }

    .no-events {
      text-align: center;
      color: #6b7280;
      margin-top: 2rem;
    }
  `],
})
export class DayScheduleComponent {
  dateKey = input.required<string>();
  viewMode = input.required<'all' | 'favorites'>();

  private readonly timetableService = inject(TimetableService);

  protected readonly dayDescription = computed(() => {
    const day = this.timetableService.schedule()[this.dateKey()];
    return day?.fullDayDescription_ru ?? '';
  });

  protected readonly timeslots = computed((): TimeslotGroup[] => {
    const day = this.timetableService.schedule()[this.dateKey()];
    if (!day?.events) return [];

    const slotMap = new Map<string, TimetableEvent[]>();
    for (const ev of day.events) {
      const key = ev.startTime;
      if (!slotMap.has(key)) slotMap.set(key, []);
      slotMap.get(key)!.push(ev);
    }

    return [...slotMap.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([startTime, events]) => {
        // Check if all events in slot share the same endTime
        const endTimes = [...new Set(events.map((e) => e.endTime))];
        const commonEndTime = endTimes.length === 1 ? endTimes[0] : null;
        return { startTime, endTime: commonEndTime, events };
      });
  });
}
