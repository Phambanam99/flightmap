import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './component/map/map.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { VesselComponent } from './component/vessel/vessel.component';
import { FlightComponent } from './component/flight/flight.component';
import { VesselDetailComponent } from './component/vessel-detail/vessel-detail.component';
import { FlightDetailComponent } from './component/flight-detail/flight-detail.component';
import { HeaderComponent } from './component/header/header.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    MapComponent,
    AppComponent,
    DashboardComponent,
    VesselComponent,
    FlightComponent,
    VesselDetailComponent,
    FlightDetailComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    LeafletModule,
    FormsModule,
    // Required for Angular Material
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule { }
