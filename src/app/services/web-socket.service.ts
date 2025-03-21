// src/app/web-socket.service.ts
import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;
  private vessels: any[] = [];
  private flights: any[] = [];

  private vesselsSubject = new BehaviorSubject<any[]>([]);
  private flightsSubject = new BehaviorSubject<any[]>([]);

  vessels$ = this.vesselsSubject.asObservable();
  flights$ = this.flightsSubject.asObservable();

  constructor() {
    this.socket$ = webSocket('ws://localhost:8080');
    this.socket$.subscribe((message) => this.handleMessage(message));
  }

  private handleMessage(message: any) {
    if (message.type === 'vessels_chunk') {
      // Cập nhật vessels array với chunk mới
      this.vessels.splice(message.offset, message.data.length, ...message.data);
      this.vesselsSubject.next(this.vessels);
    } else if (message.type === 'flights_chunk') {
      // Cập nhật flights array với chunk mới
      this.flights.splice(message.offset, message.data.length, ...message.data);
      this.flightsSubject.next(this.flights);
    }
  }

  getData(): Observable<{ vessels: any[]; flights: any[] }> {
    return new Observable((subscriber) => {
      this.vessels$.subscribe((vessels) => {
        this.flights$.subscribe((flights) => {
          subscriber.next({ vessels, flights });
        });
      });
    });
  }
}
