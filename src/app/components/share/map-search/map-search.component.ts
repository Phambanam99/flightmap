import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapComponent } from '../../map/map.component';
import { MapSearchService } from 'src/app/services/map-search.service';

@Component({
  selector: 'app-map-search',
  standalone: false,
  template: `
    <div class="map-panel">
      <div *ngIf="showSearchPanel">
        <div class="lable-map">
          <span>Lớp bản đồ</span>
          <mat-icon (click)="toggleMapSearch()">{{ 'chevron_left' }}</mat-icon>
        </div>
        <!-- Tabs or sub-sections as you wish -->
        <div class="tabs">
          <div
            class="tab-btns"
            (click)="activeTab = 'sukien'"
            [class.active]="activeTab === 'sukien'"
          >
            <button class="tab-btn" [class.active]="activeTab === 'sukien'">
              <mat-icon>event_available</mat-icon>
              <span>Sự kiện</span>
            </button>
            <div class="icon-container">
              <mat-icon>
                {{
                  activeTab === 'sukien'
                    ? 'keyboard_arrow_up'
                    : 'keyboard_arrow_down'
                }}
              </mat-icon>
            </div>
          </div>
          <div
            class="tab-btns"
            (click)="activeTab = 'tau'"
            [class.active]="activeTab === 'tau'"
          >
            <button class="tab-btn" [class.active]="activeTab === 'tau'">
              <mat-icon>directions_boat</mat-icon>
              <span>Tàu</span>
            </button>
            <div class="icon-container">
              <mat-icon>
                {{
                  activeTab === 'tau'
                    ? 'keyboard_arrow_up'
                    : 'keyboard_arrow_down'
                }}
              </mat-icon>
            </div>
          </div>

          <!-- Example Tàu tab content, matching your screenshot -->
          <div *ngIf="activeTab === 'tau'">
            <div class="tab-content">
              <div class="section-title">Chọn bộ lọc</div>
              <select class="filter-map-search">
                <option>Tất cả tàu</option>
                <option>Tàu theo dõi</option>
                <option>Tàu từ ảnh vệ tinh</option>
                <!-- Add more options as needed -->
              </select>
              <div class="date-filter">
                <div class="section-title">Thời gian phát hiện</div>
                <div class="date-filter-input">
                  <input class="filter-map-search" type="date" />
                  <input class="filter-map-search" type="date" />
                </div>
              </div>
              <div>
                <div class="section-title">Loại tàu</div>
                <app-multi-select-dropdown
                  [options]="optionTypeOfBoats"
                ></app-multi-select-dropdown>
              </div>
              <div>
                <div class="section-title">Trạng thái hoạt động</div>
                <app-multi-select-dropdown></app-multi-select-dropdown>
              </div>

              <div class="filter-group section-title">
                <label>Tốc độ (hải lý)</label>

                <div class="date-filter-input">
                  <input
                    class="filter-map-search"
                    type="number"
                    placeholder="Thấp nhất"
                  />
                  <input
                    class="filter-map-search"
                    type="number"
                    placeholder="Cao nhất"
                  />
                </div>
              </div>

              <div>
                <div class="section-title">Quốc gia</div>
                <app-multi-select-dropdown></app-multi-select-dropdown>
              </div>

              <!-- Buttons to apply or save the filter -->
              <div class="button-row">
                <button class="btn btn-primary" (click)="applyFilter()">
                  Áp dụng
                </button>
                <button class="btn btn-primary" (click)="saveFilter()">
                  Lưu bộ lọc
                </button>
                <a>Lưu bộ lọc</a>
              </div>
            </div>
          </div>

          <div
            class="tab-btns"
            (click)="activeTab = 'flight'"
            [class.active]="activeTab === 'flight'"
          >
            <button class="tab-btn" [class.active]="activeTab === 'flight'">
              <mat-icon>flight</mat-icon>
              <span>Máy bay</span>
            </button>
            <div class="icon-container">
              <mat-icon>
                {{
                  activeTab === 'flight'
                    ? 'keyboard_arrow_up'
                    : 'keyboard_arrow_down'
                }}
              </mat-icon>
            </div>
          </div>
          <!-- Example Flight tab content, matching your screenshot -->
          <div *ngIf="activeTab === 'flight'">
            <div class="tab-content">
              <div class="section-title">Chọn bộ lọc</div>
              <select class="filter-map-search">
                <option>Tất cả máy bay</option>
                <option>Máy bay theo dõi</option>
                <option>Máy bay từ ảnh vệ tinh</option>
                <!-- Add more options as needed -->
              </select>
              <div class="date-filter">
                <div class="section-title">Thời gian phát hiện</div>
                <div class="date-filter-input">
                  <input class="filter-map-search" type="date" />
                  <input class="filter-map-search" type="date" />
                </div>
              </div>
              <div>
                <div class="section-title">Loại tàu</div>
                <app-multi-select-dropdown></app-multi-select-dropdown>
              </div>
              <div>
                <div class="section-title">Trạng thái hoạt động</div>
                <app-multi-select-dropdown></app-multi-select-dropdown>
              </div>

              <div class="filter-group section-title">
                <label>Tốc độ (hải lý)</label>

                <div class="date-filter-input">
                  <input
                    class="filter-map-search"
                    type="number"
                    placeholder="Thấp nhất"
                  />
                  <input
                    class="filter-map-search"
                    type="number"
                    placeholder="Cao nhất"
                  />
                </div>
              </div>

              <div>
                <div class="section-title">Quốc gia</div>
                <app-multi-select-dropdown></app-multi-select-dropdown>
              </div>

              <!-- Buttons to apply or save the filter -->
              <div class="button-row">
                <button class="btn btn-primary" (click)="applyFilter()">
                  Áp dụng
                </button>
                <button class="btn btn-primary" (click)="saveFilter()">
                  Lưu bộ lọc
                </button>
                <a>Lưu bộ lọc</a>
              </div>
            </div>
          </div>

          <!-- Add this new weather section before closing div.tabs -->
          <div
            class="tab-btns"
            (click)="activeTab = 'weather'"
            [class.active]="activeTab === 'weather'"
          >
            <button class="tab-btn" [class.active]="activeTab === 'weather'">
              <mat-icon>cloud</mat-icon>
              <span>Thời tiết</span>
            </button>
            <div class="icon-container">
              <mat-icon>
                {{
                  activeTab === 'weather'
                    ? 'keyboard_arrow_up'
                    : 'keyboard_arrow_down'
                }}
              </mat-icon>
            </div>
          </div>

          <div *ngIf="activeTab === 'weather'">
            <div class="tab-content">
              <div class="section-title">Hiển thị lớp thời tiết</div>
              <div class="weather-controls">
                <mat-radio-group
                  [(ngModel)]="selectedWeather"
                  (change)="onWeatherChange($event)"
                >
                  <mat-radio-button
                    *ngFor="let type of weatherTypes"
                    [value]="type.value"
                  >
                    {{ type.label }}
                  </mat-radio-button>
                </mat-radio-group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './map-search.component.css',
})
export class MapSearchComponent {
  showSearchPanel = false;
  selected = true;
  activeTab:
    | ''
    | 'sukien'
    | 'tau'
    | 'all-boats'
    | 'traking-boats'
    | 'boats-from-satellites'
    | 'flight'
    | 'weather' = '';
  optionTypeOfBoats = ['haha', 'heheh'];
  weatherTypes = [
    { value: 'none', label: 'Không hiển thị' },
    { value: 'wind_new', label: 'Gió' },
    { value: 'wave_new', label: 'Sóng biển' },
  ];
  selectedWeather: string = 'none';

  constructor(
    private mapComponent: MapComponent,
    private mapSearchService: MapSearchService
  ) {}

  applyFilter() {
    // Your filter logic
  }

  saveFilter() {
    // Your save logic
  }

  onWeatherChange(event: any) {
    const weatherType = event.value;
    if (weatherType === 'none') {
      this.mapComponent.showWeather = false;
      this.mapComponent.toggleWeather();
    } else {
      this.mapComponent.showWeather = true;
      this.mapComponent.selectedWeatherLayer = weatherType;
      this.mapComponent.toggleWeather();
    }
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.mapSearchService.showSearchPanel$.subscribe((show) => {
      console.log('Search panel visibility changed:', show);
      this.showSearchPanel = show;
    });
  }
  toggleMapSearch() {
    this.mapSearchService.toggleSearchPanel();
    console.log('Toggle map search');
  }
}
