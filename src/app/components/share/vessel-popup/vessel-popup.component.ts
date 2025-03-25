import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Vessel } from '../../../models/vessel.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vessel-detail',
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
              <img [src]="vessel.imageUrl" alt="Vessel" class="vessel-image" />

              <!-- Basic Info List -->
              <mat-list>
                <div class="vessel-info">
                  <div class="info-label">MMSI</div>
                  <div class="info-value">{{ vessel.mmsi }}</div>
                </div>
                <div class="vessel-info">
                  <div class="info-label">Tên</div>
                  <div class="info-value">{{ vessel.name }}</div>
                </div>

                <div class="vessel-info">
                  <div class="info-label">Tên khác</div>
                  <div class="info-value">{{ vessel.alternativeName }}</div>
                </div>
                <div class="vessel-info">
                  <div class="info-label">Hô hiệu/IMO</div>
                  <div class="info-value">{{ vessel.callSign }}</div>
                </div>

                <div class="vessel-info">
                  <div class="info-label">Quốc gia</div>
                  <div class="info-value">{{ vessel.country }}</div>
                </div>
                <div class="vessel-info">
                  <div class="info-label">Thời gian</div>
                  <div class="info-value">{{ vessel.time }}</div>
                </div>

                <div class="vessel-info">
                  <div class="info-label">Tọa độ</div>
                  <div class="info-value">{{ vessel.coordinates }}</div>
                </div>

                <div class="vessel-info">
                  <div class="info-label">Hướng/Tốc độ</div>
                  <div class="info-value">{{ vessel.speed }}</div>
                </div>
                <div class="vessel-info">
                  <div class="info-label">Trạng thái</div>
                  <div class="info-value">{{ vessel.status }}</div>
                </div>

                <div class="vessel-info">
                  <div class="info-label">Loại tàu</div>
                  <div class="info-value">{{ vessel.type }}</div>
                </div>

                <div class="vessel-info">
                  <div class="info-label">Trạng thái xác thực</div>
                  <div class="info-value">{{ vessel.confirmStatus }}</div>
                </div>
                <div class="vessel-info">
                  <div class="info-label">Thời gian lịch sử</div>
                  <div class="info-value">{{ vessel.historicalTime }}</div>
                </div>
              </mat-list>

              <!-- Action Buttons -->
              <div class="button-row">
                <button mat-raised-button (click)="goToDetail()" color="primary">
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
  styleUrl: './vessel-popup.component.css',
})
export class VesselPopupComponent {

  constructor(private router: Router) {

  }
  @Input() item: Vessel = {
    id: '',
    name: '',
    type: '',
    position: { lat: 0, lng: 0 },
    speed: 0,
    heading: 0,
  };
  vessel = {
    mmsi: '311010188',
    name: 'STAR UNITED',
    alternativeName: 'STAR UNITED',
    callSign: 'C6FE9 / 9337121',
    country: 'Bahamas',
    time: '16:57, 29-08-2024',
    coordinates: "16°53'57\" N - 110° 52' E",
    speed: '13.10°/12.0 knot',
    status: 'UNDERWAY USING ENGINE',
    type: 'Tàu chở hàng',
    confirmStatus: 'Thông tin đúng',
    historicalTime: '0h',
    imageUrl: 'assets/vessel-example.jpg',
  };

  isVisibale = true;
  isMinimized = false;

  @Output() minimize = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  closePopup() {
    this.isVisibale = false;
  }

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
  goToDetail() {
    this.router.navigate(['vessels/detail']);
  }
}
