import { Component } from '@angular/core';

@Component({
  selector: 'app-vessel',
  standalone: false,
  template: `
    <h2>Vessels</h2>
    <app-map [filter]="'vessels'"></app-map>
  `,
  styles: [],

})
export class VesselComponent {}
