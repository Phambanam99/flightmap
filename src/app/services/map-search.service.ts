import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapSearchService {
  private showSearchPanelSource = new BehaviorSubject<boolean>(true); // Changed initial value to true
  showSearchPanel$ = this.showSearchPanelSource.asObservable();

  toggleSearchPanel() {
    this.showSearchPanelSource.next(!this.showSearchPanelSource.value);
    console.log(this.showSearchPanelSource.value);
  }

  setSearchPanelVisibility(visible: boolean) {
    this.showSearchPanelSource.next(visible);
  }
}
