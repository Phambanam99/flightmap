// src/app/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../web-socket.service';
import { Vessel } from '../../models/vessel.model';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  template: `
    <h2>Dashboard</h2>
    <p>Total Vessels: {{ vessels.length }}</p>
    <p>Total Flights: {{ flights.length }}</p>
    <table>
      <tr>
        <th>ID</th>
        <th>Type</th>
        <th>Position</th>
        <th>Speed</th>
      </tr>
      <tr *ngFor="let item of allItems">
        <td>{{ item.id }}</td>
        <td>{{ item.type }}</td>
        <td>{{ item.position.lat.toFixed(2) }}, {{ item.position.lng.toFixed(2) }}</td>
        <td>{{ item.speed }}</td>
      </tr>
    </table>
  `,
  styles: [`table { border-collapse: collapse; width: 100%; } th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }`]
})
export class DashboardComponent implements OnInit {
  vessels: Vessel[] = [];
  flights: Flight[] = [];
  allItems: (Vessel | Flight)[] = [];

  constructor(private wsService: WebSocketService) {}

  ngOnInit() {
    this.wsService.getData().subscribe(data => {
      this.vessels = data.vessels;
      this.flights = data.flights;
      this.allItems = [
        ...data.vessels.map((v: any) => ({ ...v, type: 'Vessel' })),
        ...data.flights.map((f: any) => ({ ...f, type: 'Flight' }))
      ];
    });
  }
}
