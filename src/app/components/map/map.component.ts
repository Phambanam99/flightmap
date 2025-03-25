// src/app/map/map.component.ts
import {
  Component,
  OnInit,
  Input,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import {
  latLng,
  tileLayer,
  marker,
  icon,
  Marker,
  Circle,
  circle,
} from 'leaflet';
import { WebSocketService } from '../../services/web-socket.service';
import { Vessel } from '../../models/vessel.model';
import { Flight } from '../../models/flight.model';
import { VesselPopupComponent } from '../share/vessel-popup/vessel-popup.component';
import { FlightDetailComponent } from '../share/flight-popup/flight-popup.component';
import { min } from 'rxjs';
import { MapSearchService } from '../../services/map-search.service';
import { WeatherDataService } from '../../services/weather.service';
import 'leaflet-velocity';
import 'leaflet.markercluster';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import * as L from 'leaflet';
import 'leaflet-draw';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-map',
  standalone: false,
  template: `
    <div class="map-container">
      <app-map-search
        class="map-search"
        *ngIf="showSearchPanel"
        [@slideInOut]
      ></app-map-search>
    
      <div
        class="map"
        leaflet
        [leafletOptions]="options"
        [leafletLayers]="layers"
        (leafletMapReady)="onMapReady($event)"
        (leafletZoomend)="onZoomEnd($event)"
        (leafletMoveend)="onMoveEnd($event)"
      ></div>
    </div>
  `,
  styleUrls: ['./map.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class MapComponent implements OnInit {
  @Input() filter: 'vessels' | 'flights' | null = null;
  showSearchPanel = false;
  unitspeedvalue: string = 'm/s';
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }),
    ],
    minZoom: 6, // Adjusted min zoom level for better view of Vietnam
    maxZoom: 18, // Adjusted max zoom level for better view of Vietnam
    zoom: 6, // Adjusted zoom level for better view of Vietnam
    center: latLng(16.0, 106.0),
    zoomControl: false, /// Center coordinates for Vietnam
  };

  layers: any[] = [];
  vesselLayers: any[] = [];
  flightLayers: any[] = [];
  airportLayers: any[] = [];
  cloudLayers: any[] = [];
  selectedItem: Vessel | Flight | null = null;
  selectedMarker: Marker | null = null;
  vesselMarkers: Map<string, Marker> = new Map();
  flightMarkers: Map<string, Marker> = new Map();
  selectedCircle: Circle | null = null;
  currentZoom: number = 6;
  private map: L.Map; // Replace with your actual API key

  showWeather = false;
  selectedWeatherLayer = 'none';
  private vesselMarkerCluster = L.markerClusterGroup({
    iconCreateFunction: this.createClusterIcon.bind(this),
  });
  private flightMarkerCluster = L.markerClusterGroup({
    iconCreateFunction: this.createClusterIcon.bind(this),
  });
  private weatherLayer: any;

  constructor(
    private wsService: WebSocketService,
    private viewContainerRef: ViewContainerRef,
    private mapSearchService: MapSearchService,
    private weatherDataService: WeatherDataService
  ) {}

  ngOnInit() {
    this.wsService.getData().subscribe((data) => {
      if (this.filter === 'vessels') {
        this.updateVesselLayers(data.vessels);
      } else if (this.filter === 'flights') {
        this.updateFlightLayers(data.flights);
      }
      // Add similar methods for airports and clouds if needed
    });

    this.mapSearchService.showSearchPanel$.subscribe((show) => {
      console.log('Search panel visibility changed:', show);
      this.showSearchPanel = show;
    });
       this.addDrawingTools();
  }

  getIconSize(zoom: number) {
    // Smaller base size
    const baseSize = 20;
    const minSize = 10;
    const maxSize = 40;

    // Calculate size based on zoom level
    // Each zoom level will multiply/divide size by 1.2
    const scaleFactor = Math.pow(1.2, zoom - 6);
    const newSize = baseSize * scaleFactor;

    return Math.min(Math.max(newSize, minSize), maxSize);
  }

  onZoomEnd(event: any) {
    this.currentZoom = event.target.getZoom();
    this.updateAllMarkers();
  }

  onMoveEnd(event: any) {
    this.updateVisibleMarkers();
  }

  updateAllMarkers() {
    const iconSize = this.getIconSize(this.currentZoom);

    // Update vessel markers
    this.vesselMarkers.forEach((m) => {
      m.setIcon(
        icon({
          iconSize: [iconSize, iconSize * 1.5],
          iconAnchor: [iconSize / 2, iconSize * 1.5],
          iconUrl: 'assets/vessel.png',
        })
      );
    });

    // Update flight markers
    this.flightMarkers.forEach((m) => {
      m.setIcon(
        icon({
          iconSize: [iconSize, iconSize],
          iconAnchor: [iconSize / 2, iconSize * 1.5],
          iconUrl: './assets/flight.png',
        })
      );
    });
  }

  updateVisibleMarkers() {
    const bounds = this.map.getBounds();
    const currentZoom = this.map.getZoom();
    const iconSize = this.getIconSize(currentZoom);

    this.vesselMarkerCluster.clearLayers();
    this.flightMarkerCluster.clearLayers();

    if (this.filter === 'vessels') {
      this.vesselMarkers.forEach((m) => {
        if (bounds.contains(m.getLatLng())) {
          this.vesselMarkerCluster.addLayer(m);
        }
      });
      this.map.addLayer(this.vesselMarkerCluster);
    } else if (this.filter === 'flights') {
      this.flightMarkers.forEach((m) => {
        if (bounds.contains(m.getLatLng())) {
          this.flightMarkerCluster.addLayer(m);
        }
      });
      this.map.addLayer(this.flightMarkerCluster);
    }
  }

  updateVesselLayers(vessels: Vessel[]) {
    this.vesselMarkers.clear();
    const currentZoom = this.options.zoom;
    const iconSize = this.getIconSize(currentZoom);

    vessels.forEach((v) => {
      const vesselWithType = { ...v, type: 'Vessel' };
      const m = marker([v.position.lat, v.position.lng], {
        icon: icon({
          iconSize: [iconSize, iconSize * 1.5],
          iconAnchor: [iconSize / 2, iconSize * 1.5],
          iconUrl: 'assets/vessel.png',
        }),
      }).on('click', () => {
        this.selectedItem = vesselWithType;
        if (m) {
          this.selectedMarker = m;
          this.createPopupContentVessel(vesselWithType);
        }
      });
      this.vesselMarkers.set(v.id, m);
    });

    this.updateVisibleMarkers();
  }

  updateFlightLayers(flights: Flight[]) {
    this.flightMarkers.clear();
    const currentZoom = this.options.zoom;
    const iconSize = this.getIconSize(currentZoom);

    flights.forEach((f) => {
      const flightWithType = { ...f, type: 'Flight' };
      const m = marker([f.position.lat, f.position.lng], {
        icon: icon({
          iconSize: [iconSize, iconSize * 1.5],
          iconAnchor: [iconSize / 2, iconSize * 1.5],
          iconUrl: './assets/flight.png',
        }),
      }).on('click', () => {
        this.selectedItem = flightWithType;
        if (m) {
          this.selectedMarker = m;
          this.createPopupContentFlight(flightWithType);
        }
      });
      this.flightMarkers.set(f.id, m);
    });

    this.updateVisibleMarkers();
  }

  createClusterIcon(cluster: any) {
    const childMarkers = cluster.getAllChildMarkers();
    let vesselCount = 0;
    let flightCount = 0;

    childMarkers.forEach((marker: any) => {
      if (marker.options.icon.options.iconUrl.includes('vessel')) {
        vesselCount++;
      } else if (marker.options.icon.options.iconUrl.includes('flight')) {
        flightCount++;
      }
    });

    const iconUrl =
      vesselCount > flightCount ? 'assets/vessel.png' : 'assets/flight.png';

    return L.divIcon({
      // html: `<img src="${iconUrl}" style="width: 40px; height: 40px;"><span>${cluster.getChildCount()}</span>`,
      html: `<img src="${iconUrl}" style="width: 40px; height: 40px;"><span></span>`,
      className: 'custom-cluster-icon',
      iconSize: L.point(40, 40, true),
    });
  }

  updateLayers() {
    this.layers = [
      ...this.vesselLayers,
      ...this.flightLayers,
      ...this.airportLayers,
      ...this.cloudLayers,
    ];
  }

  createPopupContentVessel(item: Vessel): HTMLElement {
    this.viewContainerRef.clear();
    const componentRef =
      this.viewContainerRef.createComponent(VesselPopupComponent);
    componentRef.instance.item = item;
    return componentRef.location.nativeElement;
  }
  createPopupContentFlight(item: Flight): HTMLElement {
    this.viewContainerRef.clear();
    const componentRef = this.viewContainerRef.createComponent(
      FlightDetailComponent
    );
    componentRef.instance.item = item;
    console.log(componentRef.instance.item);
    return componentRef.location.nativeElement;
  }

  onMapReady(map: L.Map) {
    this.map = map;
    this.updateVisibleMarkers();
  }

  toggleWeather() {
    if (this.showWeather) {
      this.updateWeatherLayer();
    } else if (this.weatherLayer) {
      this.map.removeLayer(this.weatherLayer);
      this.weatherLayer = null;
    }
  }

  updateWeatherLayer() {
    if (this.weatherLayer) {
      this.map.removeLayer(this.weatherLayer);
    }
    if (this.showWeather) {
      if (this.selectedWeatherLayer === 'wind_new') {
        this.loadWindData();
      } else if (this.selectedWeatherLayer === 'wave_new') {
        this.loadWaveData();
      }
    }
  }

  private loadWindData(): void {
    this.weatherDataService.getWindData().subscribe((data: any) => {
      let windspeedunit: string;
      if (this.unitspeedvalue === 'knots') {
        windspeedunit = 'kt';
      } else if (this.unitspeedvalue === 'kmh') {
        windspeedunit = 'k/h';
      } else {
        windspeedunit = 'm/s';
      }

      this.weatherLayer = (L as any)
        .velocityLayer({
          displayValues: true,
          displayOptions: {
            velocityType: 'Wind',
            displayPosition: 'bottomleft',
            displayEmptyString: 'No wind data',
            speedUnit: windspeedunit,
          },
          data: data,
          maxVelocity: 20,
          velocityScale: 0.01,
        })
        .addTo(this.map);
    });
  }
  // Hàm fetch dữ liệu sóng và thêm layer velocity
  private loadWaveData(): void {
    this.weatherDataService.getWaveData().subscribe((data: any) => {
      let wavespeedunit: string;
      if (this.unitspeedvalue === 'knots') {
        wavespeedunit = 'kt';
      } else if (this.unitspeedvalue === 'kmh') {
        wavespeedunit = 'k/h';
      } else {
        wavespeedunit = 'm/s';
      }

      this.weatherLayer = (L as any)
        .velocityLayer({
          displayValues: false,
          displayOptions: {
            velocityType: 'Wave',
            displayPosition: 'bottomleft',
            displayEmptyString: 'No wave data',
            speedUnit: wavespeedunit,
          },
          data: data,
          maxVelocity: 40,
          lineWidth: 6,
          velocityScale: 0.03,
        })
        .addTo(this.map);
    });
  }

  toggleMapSearch() {
    this.mapSearchService.toggleSearchPanel();
    console.log('Toggle map search');
  }
  private addDrawingTools(): void {
    // Cấu hình tùy chọn cho các công cụ vẽ
    const drawControl = new (L.Control as any).Draw({
      draw: {
        polyline: false, // Tắt vẽ đường kẻ
        polygon: false, // Tắt vẽ đa giác (nếu không cần)
        circle: true, // Bật vẽ hình tròn
        rectangle: true, // Bật vẽ hình chữ nhật
        marker: false, // Tắt vẽ marker
        circlemarker: false, // Tắt vẽ circlemarker
      },
      edit: {
        featureGroup: new L.FeatureGroup(), // Tập hợp các layer sẽ được chỉnh sửa
        remove: true,
      },
    });
    this.map.addControl(drawControl);

    // Nếu bạn muốn lưu lại các layer vẽ được để xử lý sau này
    const drawnItems = new L.FeatureGroup();
    this.map.addLayer(drawnItems);

    // Lắng nghe sự kiện vẽ xong
    this.map.on((L.Control as any).Draw.Event.CREATED, (event: any) => {
      const layer = event.layer;
      drawnItems.addLayer(layer);

      // Lấy thông tin hình vẽ được vẽ
      console.log('Đã vẽ:', layer.toGeoJSON());
      // Bạn có thể xử lý thêm, ví dụ lưu thông tin vào cơ sở dữ liệu hoặc hiển thị popup, ...
    });
  }
}
