import { Component, signal, computed, inject, effect, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { TimetableService } from '../../services/timetable.service';
import { FavoritesService } from '../../services/favorites.service';
import { DayScheduleComponent } from '../day-schedule/day-schedule.component';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    MatTabsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatCardModule,
    FormsModule,
    DayScheduleComponent,
  ],
  template: `
    <!-- Loading Bar -->
    @if (timetableService.isLoading()) {
      <mat-progress-bar mode="indeterminate" class="loading-bar" />
    }

    <!-- Controls -->
    <div class="controls-container">
      <button
        mat-flat-button
        class="refresh-btn"
        (click)="onRefresh()"
        [disabled]="timetableService.isLoading()"
      >
        <mat-icon [class.spinning]="timetableService.isLoading()">refresh</mat-icon>
        Обновить данные
      </button>

      <div class="segmented-control">
        <button 
          class="segment-btn" 
          [class.active]="viewMode() === 'all'" 
          (click)="viewMode.set('all')"
        >
          <mat-icon>list</mat-icon>
          Все
        </button>
        <button 
          class="segment-btn" 
          [class.active]="viewMode() === 'favorites'" 
          (click)="viewMode.set('favorites')"
        >
          <mat-icon>star</mat-icon>
          Избранное
        </button>
      </div>
    </div>

    <!-- Info Note -->
    @if (timetableService.showDisclaimer()) {
      <mat-card class="note-card">
        <mat-card-content>
          <span>
            <strong>Важное замечание:</strong> У нас нет возможности гарантировать актуальность этого расписания.
            В случае сомнений всегда действует официальное и актуальное расписание от организаторов.
            <br>Нажмите на звёздочку (☆), чтобы сохранить мастерскую в избранное.
          </span>
        </mat-card-content>
      </mat-card>
    }

    <!-- No Favorites Message -->
    @if (viewMode() === 'favorites' && favoritesService.count() === 0) {
      <mat-card class="no-favorites-card">
        <mat-card-content>
          Избранных мастерских нет. Отметьте мастер-классы звёздочкой ☆, чтобы они отображались здесь.
        </mat-card-content>
      </mat-card>
    }

    <!-- Tabs -->
    @if (timetableService.dateKeys().length > 0) {
      <mat-tab-group 
        mat-stretch-tabs="false" 
        animationDuration="200ms"
        [selectedIndex]="selectedTabIndex()"
      >
        @for (dateKey of timetableService.dateKeys(); track dateKey) {
          <mat-tab [label]="tabLabel(dateKey)">
            <ng-template matTabContent>
              <app-day-schedule [dateKey]="dateKey" [viewMode]="viewMode()" />
            </ng-template>
          </mat-tab>
        }
      </mat-tab-group>
    } @else if (!timetableService.isLoading()) {
      <div class="empty-state">
        <mat-icon>event_busy</mat-icon>
        <p>Расписание не загружено. Нажмите «Обновить данные».</p>
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
    }

    .loading-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    .controls-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 0.5rem;
    }

    .refresh-btn {
      background-color: #EF6C00 !important;
      color: white !important;
      border-radius: 50px !important;
      padding: 0 1.5rem !important;
      height: 44px !important;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3) !important;
      transition: transform 0.2s ease, box-shadow 0.2s ease !important;
    }

    .refresh-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(255, 152, 0, 0.4) !important;
    }

    .refresh-btn:disabled {
      background-color: #fff3e0 !important;
      color: #ffb74d !important;
    }

    @media (max-width: 480px) {
      .refresh-btn { display: none; }
      
      .segmented-control {
        width: 100%;
      }
      
      .segment-btn {
        flex: 1;
        justify-content: center;
      }
    }

    .spinning {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    /* Segmented Control */
    .segmented-control {
      display: flex;
      background: rgba(0,0,0,0.04);
      padding: 4px;
      border-radius: 50px;
      gap: 4px;
    }

    .segment-btn {
      border: none;
      background: transparent;
      padding: 0.5rem 1.25rem;
      border-radius: 50px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.9rem;
      font-weight: 600;
      color: #888;
      transition: all 0.25s ease;
    }

    .segment-btn mat-icon {
      font-size: 1.1rem;
      width: 1.1rem;
      height: 1.1rem;
    }

    .segment-btn.active {
      background: white;
      color: #EF6C00;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .segment-btn:hover:not(.active) {
      background: rgba(255,255,255,0.5);
    }

    .note-card {
      background: linear-gradient(135deg, rgba(124,179,66,0.06), rgba(124,179,66,0.02));
      border-left: 4px solid #7CB342; /* Logo Green */
      border-radius: 20px !important;
      margin-top: 1rem;
      margin-bottom: 1.5rem;
      width: 100%;

      mat-card-content {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        color: #4a6c2f;
        padding: 0.75rem;
      }
    }

    .no-favorites-card {
      text-align: center;
      margin-bottom: 1.5rem;
      color: #4b5563;
      border-radius: 20px !important;

      mat-card-content {
        padding: 1rem;
      }
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: #6b7280;

      mat-icon {
        font-size: 3rem;
        width: 3rem;
        height: 3rem;
      }
    }

    mat-tab-group {
      margin-top: 0.5rem;
    }
  `],
})
export class ScheduleComponent implements OnInit {
  protected readonly timetableService = inject(TimetableService);
  protected readonly favoritesService = inject(FavoritesService);

  protected readonly viewMode = signal<'all' | 'favorites'>(
    (localStorage.getItem('workshopPlanView') as 'all' | 'favorites') ?? 'all'
  );

  protected readonly selectedTabIndex = computed(() => {
    const keys = this.timetableService.dateKeys();
    if (keys.length === 0) return 0;
    
    // Format current date as YYYY-MM-DD in local time
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    const index = keys.indexOf(today);
    return index !== -1 ? index : 0;
  });

  protected showOnlyFavorites = this.viewMode() === 'favorites';

  constructor() {
    // Persist viewMode changes to localStorage and handle migration
    effect(() => {
      const mode = this.viewMode();
      localStorage.setItem('workshopPlanView', mode);
      
      if (mode === 'favorites') {
        this.runMigration();
      }
    });
  }

  private runMigration(): void {
    const allEvents = Object.values(this.timetableService.schedule())
      .flatMap(day => day.events);
    
    if (allEvents.length > 0) {
      this.favoritesService.migrateToBlockIds(allEvents);
    }
  }

  ngOnInit(): void {
    // Auto-fetch on load
    this.timetableService.fetchFromGoogleSheets();
  }

  protected tabLabel(dateKey: string): string {
    const day = this.timetableService.schedule()[dateKey];
    return day?.dayLabel_ru ?? dateKey;
  }

  protected onToggleChange(checked: boolean): void {
    this.viewMode.set(checked ? 'favorites' : 'all');
  }

  protected async onRefresh(): Promise<void> {
    const success = await this.timetableService.fetchFromGoogleSheets(true);
    if (!success) {
      console.warn('Daten konnten nicht aktualisiert werden.');
    }
  }
}
