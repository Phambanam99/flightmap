import { Vessel } from './../../models/vessel.model';
import { Component } from '@angular/core';
import { MapSearchService } from 'src/app/services/map-search.service';
@Component({
  selector: 'app-flight',
  template: `<app-map [filter]="'flights'"></app-map>`,
  standalone: false,
  styles: [],
})
export class FlightComponent {
  constructor(private mapSearchService: MapSearchService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.mapSearchService.setShowVessels(false);
  }
}
