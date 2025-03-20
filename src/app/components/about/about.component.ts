import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: false,
  template: `
    <div class="about-container">
      <h1>About Page</h1>
      <p>This is the about page content.</p>
    </div>
  `,
  styles: [
    `
      .about-container {
        padding: 20px;
        margin-top: 60px;
        position: relative;
        z-index: 1;
        background: white;
        min-height: calc(100vh - 60px);
      }
    `,
  ],
})
export class AboutComponent {}
