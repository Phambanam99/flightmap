import { Component } from '@angular/core';
import { MapSearchService } from '../../services/map-search.service';

@Component({
  selector: 'app-header',
  standalone: false,
  template: `<header class="app-header">
  <div class="header-left">
    <nav class="main-nav">
      <ul>
      <li (click)="toggleMapSearch()">
          <mat-icon >map</mat-icon>
          <a>Bản đồ</a>
          <!-- Example dropdown -->
        </li>
        <li>
          <mat-icon>monitoring</mat-icon>
          <a href="#">Giám sát báo chí</a>
          <!-- Example dropdown -->

        </li>
        <li>
         <mat-icon>newspaper</mat-icon>
          <a href="#">Thông tin báo chí</a>

        </li>
        <li>
          <mat-icon>directions_boat</mat-icon>
          <a href="#">Thông tin tàu</a>
          <ul class="dropdown">

          </ul>
        </li>
        <li>
          <mat-icon>flight</mat-icon>
          <a href="#">Quản lý hàng không</a>
        </li>
        <li>
          <a href="#">Quản lý chung</a>

        </li>
        <li><a href="#">Về sản phẩm</a></li>
      </ul>
    </nav>
  </div>

  <div class="header-right">
  <div class="user-info">
      <span>nosi_tcdt_1</span>
    </div>
    <div class="avatar">
      <mat-icon>account_circle</mat-icon>
    </div>
    <!-- Notifications -->
    <div class="notification">
      <mat-icon>notifications</mat-icon>
      <span class="badge">2</span>
    </div>
    <!-- Username -->

  </div>
</header>
`,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private mapSearchService: MapSearchService) {}

  toggleMapSearch() {
    this.mapSearchService.toggleSearchPanel();
    console.log('Toggle map search');
  }
}
