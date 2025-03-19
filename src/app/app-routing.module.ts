import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VesselComponent } from './components/vessel/vessel.component';
import { FlightComponent } from './components/flight/flight.component';
import { MapSearchComponent } from './components/map/map-search/map-search.component';

const routes: Routes = [
  { path: 'vessels', component: VesselComponent },
  { path: 'flights', component: FlightComponent },
  {path:'test',component:MapSearchComponent},
  { path: '', redirectTo: '/vessels', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
