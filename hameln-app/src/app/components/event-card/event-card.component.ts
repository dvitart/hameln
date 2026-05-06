import { Component, input, computed, inject, signal, viewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { TimetableEvent } from '../../models/timetable.model';
import { FavoritesService } from '../../services/favorites.service';
import { TimetableService } from '../../services/timetable.service';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatChipsModule,
  ],
  template: `
    @if (isVisible()) {
      @if (event().eventType === 'meal') {
        <div class="meal-item">
          <mat-icon>restaurant</mat-icon>
          <span>{{ event().title_ru }}</span>
          @if (locationName()) {
            <span class="meal-location"> – {{ locationName() }}</span>
          }
        </div>
      } @else {
        <mat-card class="event-card">
          <mat-card-header>
            <mat-card-title class="event-title">{{ event().title_ru }}</mat-card-title>
            <button
              mat-icon-button
              class="favorite-btn"
              [class.favorited]="isFav()"
              [attr.aria-label]="isFav() ? 'Удалить из избранного' : 'Добавить в избранное'"
              (click)="toggleFavorite($event)"
            >
              <mat-icon>{{ isFav() ? 'star' : 'star_border' }}</mat-icon>
            </button>
          </mat-card-header>

          <mat-card-content>
            @if (event().details_ru) {
              <p class="event-details">{{ event().details_ru }}</p>
            }
            @if (event().targetAudience_ru) {
              <p class="event-details">Целевая аудитория: {{ event().targetAudience_ru }}</p>
            }
            @if (event().startTime && event().endTime) {
              <p class="event-details">
                <mat-icon class="inline-icon">schedule</mat-icon>
                {{ event().startTime }} – {{ event().endTime }}
              </p>
            }
            @if (locationName()) {
              <p class="event-location">
                <mat-icon class="inline-icon">place</mat-icon>
                {{ locationName() }}
              </p>
            }

            @if (event().description_ru) {
              <div class="description-container" [class.expanded]="isExpanded()">
                <p class="event-description" #descriptionContent>{{ event().description_ru }}</p>
              </div>
              @if (hasOverflow() || isExpanded()) {
                <button mat-button class="expand-toggle-btn" (click)="toggleExpand()">
                  {{ isExpanded() ? 'Свернуть' : 'Читать далее' }}
                  <mat-icon>{{ isExpanded() ? 'expand_less' : 'expand_more' }}</mat-icon>
                </button>
              }
            }

            @if (event().url) {
              <div class="event-url">
                <a [href]="event().url" target="_blank" rel="noopener noreferrer" mat-button color="primary">
                  Подробнее <mat-icon>open_in_new</mat-icon>
                </a>
              </div>
            }
          </mat-card-content>
        </mat-card>
      }
    }
  `,
  styles: [`
    .event-card {
      margin-bottom: 0.75rem;
      position: relative;
      border-radius: 20px !important;
      overflow: hidden;
      border: 1px solid rgba(0,0,0,0.04) !important;
      border-left: 5px solid #4FC3F7 !important; /* Logo Blue */
      box-shadow: 0 4px 16px rgba(0,0,0,0.04) !important;
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease !important;
    }

    .event-card:hover {
      transform: translateY(-3px) scale(1.005);
      box-shadow: 0 10px 28px rgba(0,0,0,0.08) !important;
    }

    mat-card-header {
      padding: 1rem 1rem 0.5rem !important;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    .event-title {
      font-family: 'Comfortaa', cursive;
      font-size: 1.1rem;
      font-weight: 700;
      color: #2d3748;
      flex: 1;
      padding-right: 2.5rem;
      line-height: 1.3;
    }

    .favorite-btn {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      color: #d1d5db;
      background: rgba(0,0,0,0.02);
      border-radius: 50%;
    }

    .favorite-btn.favorited {
      color: #FFB300; /* Logo Yellow */
      background: rgba(255, 179, 0, 0.12);
    }

    mat-card-content {
      padding: 0 1rem 1rem !important;
    }

    .event-details {
      font-size: 0.9rem;
      color: #4b5563;
      margin: 0.4rem 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .event-location {
      font-style: normal;
      color: #7CB342; /* Logo Green */
      font-size: 0.85rem;
      font-weight: 600;
      margin: 0.5rem 0;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      background: rgba(124, 179, 66, 0.08);
      padding: 0.3rem 0.85rem;
      border-radius: 50px;
      width: fit-content;
    }

    .inline-icon {
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
      color: inherit;
      opacity: 0.7;
    }

    .description-container {
      margin-top: 1rem;
      transition: all 0.3s ease;
    }

    .event-description {
      font-size: 0.9rem;
      color: #334155;
      line-height: 1.5;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .description-container.expanded .event-description {
      -webkit-line-clamp: unset;
    }

    .expand-toggle-btn {
      color: #EF6C00 !important;
      font-size: 0.8rem !important;
      padding: 0 !important;
      height: 32px !important;
      line-height: 32px !important;
      min-width: unset !important;
      margin-top: 0.25rem !important;
    }

    .expand-toggle-btn mat-icon {
      font-size: 1.1rem;
      width: 1.1rem;
      height: 1.1rem;
      margin-left: -4px;
    }

    .event-url {
      text-align: right;
      margin-top: 0.5rem;
    }

    .meal-item {
      background: linear-gradient(135deg, rgba(255,179,0,0.08), rgba(255,179,0,0.03));
      color: #9a6700;
      padding: 1rem 1.25rem;
      border-radius: 20px;
      margin-bottom: 1.25rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      border-left: 5px solid #FFB300; /* Logo Yellow */
    }

    .meal-location {
      font-weight: 500;
      font-style: italic;
      opacity: 0.7;
    }
  `],
})
export class EventCardComponent implements AfterViewInit {
  event = input.required<TimetableEvent>();
  viewMode = input.required<'all' | 'favorites'>();
  
  protected readonly isExpanded = signal(false);
  protected readonly hasOverflow = signal(false);
  private readonly descriptionContent = viewChild<ElementRef<HTMLParagraphElement>>('descriptionContent');

  private readonly favoritesService = inject(FavoritesService);
  private readonly timetableService = inject(TimetableService);

  ngAfterViewInit(): void {
    // Small delay to ensure styles are applied
    setTimeout(() => this.checkOverflow(), 0);
    window.addEventListener('resize', () => this.checkOverflow());
  }

  private checkOverflow(): void {
    const el = this.descriptionContent()?.nativeElement;
    if (el) {
      this.hasOverflow.set(el.scrollHeight > el.clientHeight);
    }
  }

  protected toggleExpand(): void {
    this.isExpanded.set(!this.isExpanded());
    // Re-check overflow after collapsing
    if (!this.isExpanded()) {
      setTimeout(() => this.checkOverflow(), 0);
    }
  }

  protected readonly favoriteKey = computed(() => {
    const ev = this.event();
    const baseId = ev.eventId ?? ev.title_ru;
    return `${baseId}|${ev.dateKey}`;
  });

  protected readonly isFav = computed(() => {
    return this.favoritesService.isFavorite(this.favoriteKey());
  });

  protected readonly locationName = computed(() =>
    this.timetableService.getLocationName(this.event().locationId)
  );

  protected readonly isVisible = computed(() => {
    const ev = this.event();
    if (this.viewMode() === 'all') return true;
    if (ev.eventType === 'meal') return true;
    return this.favoritesService.isFavorite(this.favoriteKey());
  });

  protected toggleFavorite(e: Event): void {
    e.stopPropagation();
    this.favoritesService.toggle(this.favoriteKey());
  }
}
