import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapSearchService {
  private showSearchPanelSource = new BehaviorSubject<boolean>(false); // Changed initial value to true
  showSearchPanel$ = this.showSearchPanelSource.asObservable();
  private showVesselsSource = new BehaviorSubject<boolean>(false);
  showVessels = this.showVesselsSource.asObservable();

  toggleSearchPanel() {
    this.showSearchPanelSource.next(!this.showSearchPanelSource.value);
  }

  setSearchPanelVisibility(visible: boolean) {
    this.showSearchPanelSource.next(visible);
  }
  toggleShowVessels() {
    this.showVesselsSource.next(!this.showVesselsSource.value);
  }
  setShowVessels(visible: boolean) {
    this.showVesselsSource.next(visible);
  }
}
