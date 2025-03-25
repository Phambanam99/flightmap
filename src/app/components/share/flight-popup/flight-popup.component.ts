import { Component, Input } from '@angular/core';
import { Flight } from '../../../models/flight.model';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-flight-detail',
  standalone: false,
  template: `
    <div
      *ngIf="isVisibale"
      class="popup vessel-popup"
      [ngClass]="{ minimized: isMinimized }"
    >
      <mat-card class="vessel-card">
        <div class="vessel-header">
          <span class="title">Thông tin tàu</span>
          <div class="header-controls">
            <button mat-icon-button (click)="onMinimize()">
              <mat-icon>remove</mat-icon>
            </button>
            <button mat-icon-button (click)="closePopup()">
              <mat-icon>close</mat-icon>
            </button>
          </div>
        </div>

        <!-- Tabs for different sections: Chung, Quỹ đạo, Nhật ký, Thống kê -->
        <mat-tab-group>
          <mat-tab
            label="Chung"
            class="
    "
          >
            <div class="tab-content">
              <!-- Vessel Image -->
              <img [src]="item.imageUrl" alt="Flight" class="vessel-image" />

              <!-- Basic Info List -->
              <mat-list>
                <div class="vessel-info">
                  <div class="info-label">MMSI</div>
                  <div class="info-value">{{ item.name }}</div>
                </div>
              </mat-list>

              <!-- Action Buttons -->
              <!-- Action Buttons -->
              <div class="button-row">
                <button mat-raised-button color="primary">
                  <mat-icon>visibility</mat-icon>Chi tiết
                </button>
                <button mat-raised-button>
                  <mat-icon>star_border</mat-icon>Theo dõi
                </button>
                <button mat-raised-button>
                  <mat-icon>sticky_note_2</mat-icon>Nhật ký
                </button>
                <button mat-raised-button>
                  <mat-icon class="mat-18">print</mat-icon>In
                </button>
                <button mat-raised-button color="accent">
                  <mat-icon>history</mat-icon>Lịch sử
                </button>
              </div>
            </div>
          </mat-tab>

          <mat-tab label="Quỹ đạo">
            <div class="tab-content">
              <!-- Add content for Quỹ đạo here -->
              <p>Quỹ đạo content goes here...</p>
            </div>
          </mat-tab>

          <mat-tab label="Nhật ký">
            <div class="tab-content">
              <!-- Add content for Nhật ký here -->
              <p>Nhật ký content goes here...</p>
            </div>
          </mat-tab>

          <mat-tab label="Thống kê">
            <div class="tab-content">
              <!-- Add content for Thống kê here -->
              <p>Thống kê content goes here...</p>
            </div>
          </mat-tab>
        </mat-tab-group>
      </mat-card>
    </div>
  `,
  styleUrl: './flight-popup.component.css',
})
export class FlightDetailComponent {
  @Input() item: Flight = {
    id: '',
    name: 'AHAHA',
    imageUrl: '',
    flightNumber: '',
    airline: '',
    position: { lat: 0, lng: 0 },
    type: '',
    speed: 0,
    altitude: 0,
    heading: 0,
  };
  isVisibale = true;
  closePopup() {
    this.isVisibale = false;
  }

  isMinimized = false;

  @Output() minimize = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  trackLink() {
    // Add functionality for tracking the link
    window.open('http://tracking-link-url.com', '_blank');
  }

  onMinimize() {
    this.isMinimized = !this.isMinimized;
    this.minimize.emit();
  }

  onClose() {
    this.close.emit();
  }
  
}
