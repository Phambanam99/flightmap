import { Component } from '@angular/core';

@Component({
  selector: 'app-flight',
  template: `
    <h2>Flights</h2>

    <app-map [filter]="'flights'"></app-map>
  `,
  standalone: false,
  styles: []
})
export class FlightComponent {}
