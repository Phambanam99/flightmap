import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-map-search',
  standalone: false,
  template: `<div class="map-panel">
  <h3 class="lable-map">Lớp bản đồ</h3>

  <!-- Tabs or sub-sections as you wish -->
  <div class="tabs">
    <button class="tab-btn" [class.active]="activeTab === 'sukien'"
            (click)="activeTab = 'sukien'">Sự kiện</button>
    <button class="tab-btn" [class.active]="activeTab === 'tau'"
            (click)="activeTab = 'tau'">Tàu</button>
  </div>

  <!-- Example Tàu tab content, matching your screenshot -->
  <div *ngIf="activeTab === 'tau'" class="tab-content">
    <div class="section-title">Chọn bộ lọc</div>
    <select class="filter-map-search">
      <option>Mặc định</option>
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
      <select class=" filter-map-search"  data-placeholder="Choose anything" >
        <option>Tất cả (11)</option>
        <option>Tất cả (12)</option>
        <!-- ... -->
      </select>
    </div>


    <div >
      <div class="section-title">Trạng thái hoạt động</div>
      <select class="filter-map-search">
        <option>Tất cả (259)</option>
        <!-- ... -->
      </select>
    </div>


    <div class="filter-group section-title">
      <label>Tốc độ (hải lý)</label>

      <div class="date-filter-input">
      <input class="filter-map-search" type="number" placeholder="Thấp nhất" />
      <input class="filter-map-search" type="number" placeholder="Cao nhất" />
    </div>
    </div>

    <div >
      <div class="section-title">Quốc gia</div>
      <select class="filter-map-search">
        <option>Tất cả (259)</option>
        <!-- ... -->
      </select>
    </div>

    <!-- Buttons to apply or save the filter -->
    <div class="button-row">
      <button class="btn btn-primary"  (click)="applyFilter()">Áp dụng</button>
      <button class="btn btn-primary"  (click)="saveFilter()">Lưu bộ lọc</button>
    </div>
    <div class="mat-select-container">
      <mat-form-field appearance="fill" class="w-100">
        <mat-label>Chọn toppings</mat-label>
        <mat-select [formControl]="toppings" multiple>
          <mat-option *ngFor="let topping of toppingList" [value]="topping">
            {{topping}}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>
  </div>

  <!-- Add your Sự kiện tab content similarly -->

</div>
`,
  styleUrl: './map-search.component.css'
})
export class MapSearchComponent implements OnInit {

  activeTab: 'sukien' | 'tau' = 'tau';
  toppings = new FormControl(['']);
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  applyFilter() {
    // Your filter logic
  }

  saveFilter() {
    // Your save logic
  }
  ngOnInit() {
    // Optional: Set default values
    this.toppings.setValue(['Mushroom', 'Onion']);
  }


}


