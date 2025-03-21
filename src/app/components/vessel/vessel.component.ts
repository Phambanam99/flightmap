import { Component } from '@angular/core';
import { MapSearchService } from 'src/app/services/map-search.service';
@Component({
  selector: 'app-vessel',
  standalone: false,
  template: ` <app-map [filter]="'vessels'"></app-map> `,
  styles: [],
})
export class VesselComponent {
  constructor(private mapSearchService: MapSearchService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.mapSearchService.setShowVessels(true);
  }
}
