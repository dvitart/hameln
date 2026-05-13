import { Component, input, computed, inject, AfterViewInit } from '@angular/core';
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
export class DayScheduleComponent implements AfterViewInit {
  dateKey = input.required<string>();
  viewMode = input.required<'all' | 'favorites'>();

  private readonly timetableService = inject(TimetableService);

  ngAfterViewInit() {
    // Small delay to ensure tabs animation and rendering are complete
    setTimeout(() => this.scrollToCurrentTime(), 400);
  }

  private scrollToCurrentTime() {
    // Only auto-scroll if it's today
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    if (this.dateKey() !== today) return;

    const currentTimeStr = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    const slots = this.timeslots();
    if (slots.length === 0) return;

    // Find the last slot that has already started
    let targetSlot = slots[0];
    for (const slot of slots) {
      if (slot.startTime <= currentTimeStr) {
        targetSlot = slot;
      } else {
        break;
      }
    }

    if (targetSlot) {
      const el = document.getElementById('slot-' + targetSlot.startTime);
      if (el) {
        const headerOffset = 130; // Height of sticky header + tabs
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }

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
