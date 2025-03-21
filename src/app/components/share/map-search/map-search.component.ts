import { Router } from '@angular/router';
import { Component, OnInit, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapComponent } from '../../map/map.component';
import { MapSearchService } from 'src/app/services/map-search.service';

@Component({
  selector: 'app-map-search',
  standalone: false,
  templateUrl: './map-search.component.html',
  styleUrl: './map-search.component.css',
})
export class MapSearchComponent {
  showSearchPanel = false;
  selected = true;
  activeTab:
    | ''
    | 'sukien'
    | 'tau'
    | 'all-boats'
    | 'traking-boats'
    | 'boats-from-satellites'
    | 'flight'
    | 'weather' = '';
  optionTypeOfBoats = ['haha', 'heheh'];
  weatherTypes = [
    { value: 'none', label: 'Không hiển thị' },
    { value: 'wind_new', label: 'Gió' },
    { value: 'wave_new', label: 'Sóng biển' },
  ];
  selectedWeather: string = 'none';
  showVessels = false;
  constructor(
    private mapComponent: MapComponent,
    private mapSearchService: MapSearchService,
    private router: Router
  ) {}

  applyFilter() {
    // Your filter logic
  }

  saveFilter() {
    // Your save logic
  }

  onWeatherChange(event: any) {
    const weatherType = event.value;
    if (weatherType === 'none') {
      this.mapComponent.showWeather = false;
      this.mapComponent.toggleWeather();
    } else {
      this.mapComponent.showWeather = true;
      this.mapComponent.selectedWeatherLayer = weatherType;
      this.mapComponent.toggleWeather();
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.mapSearchService.showSearchPanel$.subscribe((show) => {
      console.log('Search panel visibility changed:', show);
      this.showSearchPanel = show;
    });
    this.mapSearchService.showVessels.subscribe(
      (show) => (this.showVessels = show)
    );
  }
  toggleMapSearch() {
    this.mapSearchService.toggleSearchPanel();
    console.log('Toggle map search');
  }
  toggleShowVessels() {
    this.mapSearchService.toggleShowVessels();
    if (this.showVessels) {
      this.router.navigate(['/vessels']);
    } else {
      this.router.navigate(['/flights']);
    }
  }
}
