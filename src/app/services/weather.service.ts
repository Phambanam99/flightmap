import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  // Các URL API thay thế, ví dụ:
  private windUrl = 'https://data.flightairmap.com/data/weather/winds.json';
  private waveUrl = 'https://data.flightairmap.com/data/weather/waves.json';

  constructor(private http: HttpClient) {}

  // Lấy dữ liệu gió
  getWindData(): Observable<any> {
    return this.http.get<any>(this.windUrl);
  }

  // Lấy dữ liệu sóng
  getWaveData(): Observable<any> {
    return this.http.get<any>(this.waveUrl);
  }
}
