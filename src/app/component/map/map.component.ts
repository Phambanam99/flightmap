// src/app/map/map.component.ts
import { Component, OnInit, Input, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { latLng, tileLayer, marker, icon, Marker, Circle, circle } from 'leaflet';
import { WebSocketService } from '../../web-socket.service';
import { Vessel } from '../../models/vessel.model';
import { Flight } from '../../models/flight.model';
import { VesselDetailComponent } from '../../component/vessel-detail/vessel-detail.component';
import { FlightDetailComponent } from '../flight-detail/flight-detail.component';
import { min } from 'rxjs';

@Component({
  selector: 'app-map',
  template: `
    <div class="map-container"
         leaflet
         [leafletOptions]="options"
         [leafletLayers]="layers"
         (leafletZoomend)="onZoomEnd($event)">
    </div>
  `,
  standalone: false,
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() filter: 'vessels' | 'flights' | null = null;

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    minZoom: 3, // Adjusted min zoom level for better view of Vietnam
    maxZoom: 18, // Adjusted max zoom level for better view of Vietnam
    zoom: 6, // Adjusted zoom level for better view of Vietnam
    center: latLng(16.0, 106.0) ,
    zoomControl: false  /// Center coordinates for Vietnam
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

  constructor(private wsService: WebSocketService, private resolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {
    this.wsService.getData().subscribe(data => {
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
    this.vesselMarkers.forEach(m => {
      m.setIcon(icon({
        iconSize: [iconSize, iconSize * 1.5],
        iconAnchor: [iconSize/2, iconSize * 1.5],
        iconUrl:  'assets/vessel.png'
      }));
    });

    // Update flight markers
    this.flightMarkers.forEach(m => {
      m.setIcon(icon({
        iconSize: [iconSize, iconSize ],
        iconAnchor: [iconSize/2, iconSize * 1.5],
        iconUrl:  './assets/flight.png'
      }));
    });
  }

  updateVesselLayers(vessels: Vessel[]) {
    const newLayers: any[] = [];
    const currentZoom = this.options.zoom;
    const iconSize = this.getIconSize(currentZoom);

    vessels.forEach(v => {
      let m = this.vesselMarkers.get(v.id);
      if (m) {
        m.setLatLng([v.position.lat, v.position.lng]);
      } else {
        const vesselWithType = { ...v, type: 'Vessel' };
        m = marker([v.position.lat, v.position.lng], {
          icon: icon({
            iconSize: [iconSize, iconSize * 1.5],
            iconAnchor: [iconSize/2, iconSize * 1.5],
            iconUrl: 'assets/vessel.png'
          })
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

    flights.forEach(f => {
      let m = this.flightMarkers.get(f.id);
      if (m) {
        m.setLatLng([f.position.lat, f.position.lng]);
      } else {
        const flightWithType = { ...f, type: 'Flight' };
        m = marker([f.position.lat, f.position.lng], {
          icon: icon({
            iconSize: [iconSize, iconSize * 1.5],
            iconAnchor: [iconSize/2, iconSize * 1.5],
            iconUrl: './assets/flight.png'
          })
        }).on('click', () => {
          this.selectedItem = flightWithType;
          if (m) {
            this.selectedMarker = m;
            this.createPopupContentFlight(flightWithType);
            ;
          }
        })
        this.flightMarkers.set(f.id, m);
      }
      newLayers.push(m);
    });

    this.flightLayers = newLayers;
    this.updateLayers();
  }

  updateLayers() {
    this.layers = [...this.vesselLayers, ...this.flightLayers, ...this.airportLayers, ...this.cloudLayers];

    // // Reapply popup if an item is selected
    // if (this.selectedItem && this.selectedMarker) {
    //   this.selectedMarker.bindPopup(this.createPopupContentVessel(this.selectedItem)).openPopup();
    // }
  }

  createPopupContentVessel(item: Vessel ): HTMLElement {
    this.viewContainerRef.clear();
    const componentRef = this.viewContainerRef.createComponent(
      VesselDetailComponent
    );
    componentRef.instance.item = item;
    console.log(componentRef.instance.item);
    return componentRef.location.nativeElement;
  }
  createPopupContentFlight(item: Flight ): HTMLElement {
    this.viewContainerRef.clear();
    const componentRef = this.viewContainerRef.createComponent(
     FlightDetailComponent
    );
    componentRef.instance.item = item;
    console.log(componentRef.instance.item);
    return componentRef.location.nativeElement;
  }

}
