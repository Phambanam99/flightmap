import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VesselComponent } from './component/vessel/vessel.component';
import { FlightComponent } from './component/flight/flight.component';

const routes: Routes = [
  { path: 'vessels', component: VesselComponent },
  { path: 'flights', component: FlightComponent },
  { path: '', redirectTo: '/vessels', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
