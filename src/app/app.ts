import { Component, signal, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ScheduleComponent } from './components/schedule/schedule.component';

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

        <!-- PWA Install Button -->
        @if (showInstallBtn()) {
          <button class="install-btn" (click)="installPwa()">
            <mat-icon>install_mobile</mat-icon>
            <span>Установить</span>
          </button>
        }
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
    @media (max-width: 480px) {
      .app-title { font-size: 1.5rem; }
      .logo-wrap { width: 50px; height: 50px; }
      .install-btn span { display: none; }
      .install-btn { padding: 0.5rem; border-radius: 50%; }
    }
  `],
})
export class AppComponent implements OnInit {
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
