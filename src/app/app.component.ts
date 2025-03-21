// src/app/app.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <div [ngStyle]="{ display: showMap ? 'block' : 'none' }">
      <app-map></app-map>
    </div>

    <router-outlet></router-outlet>
  `,
  standalone: false,
  styleUrls: ['app.component.css'],
  host: { class: 'app-root' },
})
export class AppComponent {
  showMap = true;

  constructor(private router: Router) {
    router.events.subscribe(() => {
      this.showMap =
        router.url === '/' ||
        router.url === '/vessels' ||
        router.url === '/flights';
    });
  }
}
