import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapSearchService {
  private showSearchPanelSource = new BehaviorSubject<boolean>(false); // Changed initial value to true
  showSearchPanel$ = this.showSearchPanelSource.asObservable();
  private showDetailVesselSource = new BehaviorSubject<boolean>(false);
  showDetailVessel = this.showDetailVesselSource.asObservable();

  toggleSearchPanel() {
    this.showSearchPanelSource.next(!this.showSearchPanelSource.value);
  }

  setSearchPanelVisibility(visible: boolean) {
    this.showSearchPanelSource.next(visible);
  }
}
