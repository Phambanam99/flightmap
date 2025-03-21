import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VesselComponent } from './components/vessel/vessel.component';
import { FlightComponent } from './components/flight/flight.component';
import { MapSearchComponent } from './components/share/map-search/map-search.component';
import { AboutComponent } from './components/about/about.component';
import { MapComponent } from './components/map/map.component';
import { ShipDetailComponent } from './components/ship-detail/ship-detail.component';

const routes: Routes = [
  { path: 'vessels', component: VesselComponent },
  { path: 'flights', component: FlightComponent },
  { path: 'test', component: MapSearchComponent },
  { path: 'about', component: AboutComponent },
  { path: 'vessels/detail', component: ShipDetailComponent },
  { path: '', component: VesselComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
