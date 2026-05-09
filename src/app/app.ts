import { Component, signal, OnInit, inject } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { TimetableService } from './services/timetable.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, ScheduleComponent],
  template: `
    <!-- ===== HEADER ===== -->
    <header class="app-header">
      <div class="header-inner">

        <!-- Logo + Titel -->
        <div class="header-brand">
          <div class="logo-wrap">
            <img src="hameln.png" alt="Hameln Logo" class="logo-img">
          </div>

          <div class="title-block">
            <h1 class="app-title">Гамельн</h1>
            <div class="title-meta">
              <span class="event-year">2026</span>
              <span class="title-divider">·</span>
              <span class="event-date">Май</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="header-actions">
          <!-- Disclaimer Toggle -->
          <button
            class="header-action-btn disclaimer-btn"
            [class.active]="timetableService.showDisclaimer()"
            (click)="timetableService.showDisclaimer.set(!timetableService.showDisclaimer())"
            aria-label="Показать важное замечание"
          >
            <mat-icon>{{ timetableService.showDisclaimer() ? 'info' : 'warning' }}</mat-icon>
          </button>

          <!-- Mobile Refresh Button -->
          <button
            class="header-action-btn mobile-refresh-btn"
            (click)="onRefresh()"
            [disabled]="timetableService.isLoading()"
            aria-label="Refresh data"
          >
            <mat-icon [class.spinning]="timetableService.isLoading()">refresh</mat-icon>
          </button>

          <!-- PWA Install Button -->
          @if (showInstallBtn()) {
            <button class="install-btn" (click)="installPwa()">
              <mat-icon>install_mobile</mat-icon>
              <span>Установить</span>
            </button>
          }
        </div>
      </div>
    </header>

    <!-- ===== MAIN ===== -->
    <main class="main-content">
      <div class="container">
        <app-schedule />
      </div>
    </main>
  `,
  styles: [`
    /* ---- Header ---- */
    .app-header {
      position: sticky;
      top: 0;
      z-index: 2000; /* Highest */
      background: #ffffff;
      border-bottom: 1px solid rgba(0,0,0,0.05);
      box-shadow: 0 2px 15px rgba(0,0,0,0.03);
      height: var(--app-header-height);
    }

    .header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 1.25rem;
      max-width: 56rem;
      margin: 0 auto;
    }

    /* ---- Brand / Logo ---- */
    .header-brand {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .logo-wrap {
      flex-shrink: 0;
      width: 64px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .logo-wrap:hover {
      transform: scale(1.1) rotate(5deg);
    }

    .logo-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    /* ---- Texte ---- */
    .title-block {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .app-title {
      margin: 0;
      font-family: 'Comfortaa', cursive;
      font-size: 1.8rem;
      font-weight: 700;
      color: #EF6C00; /* Orange from logo */
      letter-spacing: -0.02em;
      line-height: 1.1;
    }

    .title-meta {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      margin-top: -2px;
    }

    .event-year {
      font-family: 'Comfortaa', cursive;
      font-size: 1.1rem;
      font-weight: 700;
      color: #FFB300; /* Yellow from logo */
      letter-spacing: 0.05em;
    }

    .title-divider {
      color: #ccc;
      font-size: 1rem;
    }

    .event-date {
      font-size: 0.9rem;
      color: #666;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    /* ---- Actions ---- */
    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .header-action-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: 2px solid #EF6C00;
      border-radius: 50%;
      background: transparent;
      color: #EF6C00 !important;
      width: 40px;
      height: 40px;
      cursor: pointer;
      transition: all 0.2s ease;
      line-height: 0;
    }

    .header-action-btn:hover:not(:disabled) {
      background: #EF6C00;
      color: #fff !important;
    }

    .header-action-btn:disabled {
      opacity: 0.5;
      cursor: default;
    }

    .header-action-btn mat-icon {
      margin: 0;
      padding: 0;
      display: block;
      font-size: 1.25rem;
      width: 1.25rem;
      height: 1.25rem;
    }

    .mobile-refresh-btn {
      display: none;
    }

    .disclaimer-btn.active {
      background: #EF6C00;
      color: #fff !important;
    }

    .spinning {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    /* ---- Install Button ---- */
    .install-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1rem;
      border: 2px solid #EF6C00;
      border-radius: 50px;
      background: transparent;
      color: #EF6C00;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .install-btn:hover {
      background: #EF6C00;
      color: #fff;
    }

    .install-btn mat-icon {
      font-size: 1.2rem;
      width: 1.2rem;
      height: 1.2rem;
    }

    /* ---- Main ---- */
    .main-content {
      padding: 0; /* Remove top padding to stabilize sticky offsets */
    }

    .container {
      max-width: 56rem;
      margin: 0 auto;
      padding: 1.5rem 1rem;
    }

    /* ---- Responsive ---- */
    @media (max-width: 520px) {
      .app-header { height: 64px; }
      .container { padding: 0.5rem; }
      .header-inner { padding: 0 0.5rem; height: 64px; }
      .header-brand { gap: 0.25rem; }
      .logo-wrap { width: 40px; height: 40px; }
      .app-title { font-size: 1.25rem; }
      .header-actions { gap: 0.25rem; }
      .header-action-btn { width: 34px; height: 34px; }
      .header-action-btn mat-icon { font-size: 1rem; width: 1rem; height: 1rem; }
    }

    @media (max-width: 400px) {
      .app-title { font-size: 1.2rem; }
      .logo-wrap { width: 36px; height: 36px; }
      .title-meta { display: none; } /* Hide year/date on very small screens to save space */
    }

    @media (max-width: 480px) {
      .install-btn span { display: none; }
      .install-btn { padding: 0.5rem; border-radius: 50%; width: 36px; height: 36px; min-width: auto; }
      .mobile-refresh-btn { display: flex; }
    }
  `],
})
export class AppComponent implements OnInit {
  protected readonly timetableService = inject(TimetableService);
  protected readonly showInstallBtn = signal(false);
  private deferredPrompt: BeforeInstallPromptEvent | null = null;

  ngOnInit(): void {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e as BeforeInstallPromptEvent;
      this.showInstallBtn.set(true);
    });

    window.addEventListener('appinstalled', () => {
      this.showInstallBtn.set(false);
      this.deferredPrompt = null;
    });
  }

  protected async onRefresh(): Promise<void> {
    await this.timetableService.fetchFromGoogleSheets(true);
  }

  protected async installPwa(): Promise<void> {
    if (!this.deferredPrompt) return;
    await this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;
    console.log(`PWA install: ${outcome}`);
    this.deferredPrompt = null;
    this.showInstallBtn.set(false);
  }
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}
