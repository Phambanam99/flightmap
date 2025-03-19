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
import { VesselDetailComponent } from '../vessel-detail/vessel-detail.component';
import { FlightDetailComponent } from '../flight-detail/flight-detail.component';
import { min } from 'rxjs';
import { MapSearchService } from '../../services/map-search.service';
import * as L from 'leaflet';
import { WeatherDataService } from '../../services/weather.service';
import 'leaflet-velocity';
@Component({
  selector: 'app-map',
  template: `
    <div class="map-container">
      <app-map-search
        class="map-search"
        *ngIf="showSearchPanel"
      ></app-map-search>
      <div
        class="map"
        leaflet
        [leafletOptions]="options"
        [leafletLayers]="layers"
        (leafletMapReady)="onMapReady($event)"
        (leafletZoomend)="onZoomEnd($event)"
      ></div>
    </div>
  `,
  standalone: false,
  styleUrls: ['./map.component.css'],
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
    minZoom: 3, // Adjusted min zoom level for better view of Vietnam
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
  private weatherLayer: L.TileLayer | null = null;

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
      } else {
        this.updateVesselLayers(data.vessels);
        this.updateFlightLayers(data.flights);
        // Add similar methods for airports and clouds if needed
      }
    });

    this.mapSearchService.showSearchPanel$.subscribe((show) => {
      console.log('Search panel visibility changed:', show);
      this.showSearchPanel = show;
    });
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

  updateVesselLayers(vessels: Vessel[]) {
    const newLayers: any[] = [];
    const currentZoom = this.options.zoom;
    const iconSize = this.getIconSize(currentZoom);

    vessels.forEach((v) => {
      let m = this.vesselMarkers.get(v.id);
      if (m) {
        m.setLatLng([v.position.lat, v.position.lng]);
      } else {
        const vesselWithType = { ...v, type: 'Vessel' };
        m = marker([v.position.lat, v.position.lng], {
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
      }
      newLayers.push(m);
    });

    this.vesselLayers = newLayers;
    this.updateLayers();
  }

  updateFlightLayers(flights: Flight[]) {
    const newLayers: any[] = [];
    const currentZoom = this.options.zoom;
    const iconSize = this.getIconSize(currentZoom);

    flights.forEach((f) => {
      let m = this.flightMarkers.get(f.id);
      if (m) {
        m.setLatLng([f.position.lat, f.position.lng]);
      } else {
        const flightWithType = { ...f, type: 'Flight' };
        m = marker([f.position.lat, f.position.lng], {
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
      }
      newLayers.push(m);
    });

    this.flightLayers = newLayers;
    this.updateLayers();
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
    const componentRef = this.viewContainerRef.createComponent(
      VesselDetailComponent
    );
    componentRef.instance.item = item;
    console.log(componentRef.instance.item);
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
}
