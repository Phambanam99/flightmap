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
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MapSearchComponent } from './component/map/map-search/map-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    MapComponent,
    AppComponent,
    DashboardComponent,
    VesselComponent,
    FlightComponent,
    VesselDetailComponent,
    FlightDetailComponent,
    HeaderComponent,
    MapSearchComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LeafletModule,
    FormsModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule { }
