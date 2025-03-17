// src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <app-header></app-header>
  <app-map></app-map>
    <!-- <app-dashboard></app-dashboard> -->
  `,
  standalone: false,
  styleUrl: 'app.component.css'
})
export class AppComponent {}
