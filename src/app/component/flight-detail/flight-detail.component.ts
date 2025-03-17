import { Component, Input } from '@angular/core';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-flight-detail',
  standalone: false,
  template: `
  <div *ngIf="isVisibale" class="popup flight-popup" >
  <div class="popup-header">
    <span class="popup-title">{{item.name}}</span>
    <span class="popup-close" (click)="closePopup()">X</span>
  </div>
  <div class="popup-body">
      <p>ID: {{ item.id }}</p>
      <p>Flight Number: {{ item.flightNumber }}</p>
      <p>Airline: {{ item.airline }}</p>
      <p>Position: {{ item.position.lat.toFixed(2) }}, {{ item.position.lng.toFixed(2) }}</p>
      <p>Speed: {{ item.speed }}</p>
      <p>Altitude: {{ item.altitude }}</p>
      <p>Heading: {{ item.heading }}</p>
  </div>
</div>

  `,
  styleUrl: './flight-detail.component.css'
})
export class FlightDetailComponent {
  @Input() item: Flight = {
    id: '',
    name: 'AHAHA',
    flightNumber: '',
    airline: '',
    position: { lat: 0, lng: 0 },
    type: '',
    speed: 0,
    altitude: 0,
    heading: 0
  };
  isVisibale = true;
  closePopup() {
    this.isVisibale = false;
  }
}
