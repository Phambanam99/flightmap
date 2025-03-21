import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-rotatedmarker';

interface PortHistory {
  stt: number;
  port: string;
  country: string;
  arrivalTime: string;
  departureTime: string;
}

@Component({
  selector: 'app-ship-detail',
  standalone: false,
  templateUrl: './ship-detail.component.html',
  styleUrls: ['./ship-detail.component.css'],
})
export class ShipDetailComponent implements AfterViewInit {
  // Dữ liệu tabs
  tabs = ['Hệ thống', 'Hifleet', 'Marinetraffic', 'Vesselfinder'];
  selectedTabIndex = 0;

  // Thông tin tàu
  ship = {
    mmsi: '368887000',
    name: 'USNS CITY OF BISMARCK (T-EPF-9)',
    diffName: '',
    imageUrl: '',
    callSign: 'NBMK',
    imo: '9677571',
    country: 'USA',
    type: 'Military ops',
    mainPort: 'Unknown',
    width: 29,
    own: '',
    length: 103,
    deadWeight: 9154,
    grossTonnage: 9781,
    builderYear: 2017,
    lat: 15.24,
    lng: 108.47,
    speed: 20, // knots
    heading: 263.4,
    waterDepth: 44,
    manufacture: 'Viet Nam',
    status: 'Đang buộc cầu',
    aisType: 'Mặt đất',
    time: '12:53, 29-08-2024',
    source: 'CHINAPORTS',
  };

  // Lịch sử cập cảng
  portHistories: PortHistory[] = [
    {
      stt: 1,
      port: 'Cảng 1',
      country: 'Vietnam',
      arrivalTime: '19:00, 25-12-2024',
      departureTime: '',
    },
    {
      stt: 2,
      port: 'Cảng 2',
      country: 'Philippines',
      arrivalTime: '08:39, 19-08-2024',
      departureTime: '',
    },
    {
      stt: 3,
      port: 'Cảng 3',
      country: 'Singapore',
      arrivalTime: '04:53, 30-07-2024',
      departureTime: '',
    },
    {
      stt: 4,
      port: 'Cảng 4',
      country: 'Indonesia',
      arrivalTime: '11:45, 16-07-2024',
      departureTime: '',
    },
  ];

  displayedColumns: string[] = [
    'stt',
    'port',
    'country',
    'arrivalTime',
    'departureTime',
  ];

  private map: L.Map;
  private marker: L.Marker;

  // Chuyển tab
  onTabChange(index: number) {
    this.selectedTabIndex = index;
  }

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      attributionControl: false,
    }).setView([this.ship.lat, this.ship.lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(
      this.map
    );

    this.updateMarker();

    this.map.on('zoomend', () => {
      this.updateMarker();
    });
  }

  private updateMarker(): void {
    const zoom = this.map.getZoom();
    const iconSize = this.getIconSize(zoom);

    const shipIcon = L.icon({
      iconUrl: 'assets/vessel.png', // Replace with your ship icon URL
      iconSize: [iconSize, iconSize],
      iconAnchor: [iconSize / 2, iconSize],
    });

    if (this.marker) {
      this.marker.setIcon(shipIcon);
      this.marker.setLatLng([this.ship.lat, this.ship.lng]);
    } else {
      this.marker = L.marker([this.ship.lat, this.ship.lng], {
        icon: shipIcon,
      }).addTo(this.map) as any;
      (this.marker as any).setRotationAngle(this.ship.heading);
      (this.marker as any).setRotationOrigin('center center');
    }
  }

  private getIconSize(zoom: number): number {
    const baseSize = 32;
    const minSize = 4;
    const maxSize = 64;

    const scaleFactor = Math.pow(1.2, zoom - 13);
    const newSize = baseSize * scaleFactor;

    return Math.min(Math.max(newSize, minSize), maxSize);
  }

  locateMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log(`Current position: ${lat}, ${lng}`);
          this.map.setView([lat, lng], 13);
        },
        (error) => {
          console.error('Error getting location', error);
          alert('Error getting location: ' + error.message);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}
