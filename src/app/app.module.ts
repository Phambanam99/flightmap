import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { VesselComponent } from './components/vessel/vessel.component';
import { FlightComponent } from './components/flight/flight.component';
import { VesselPopupComponent } from './components/share/vessel-popup/vessel-popup.component';
import { FlightDetailComponent } from './components/share/flight-popup/flight-popup.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MapSearchComponent } from './components/share/map-search/map-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiSelectDropdownComponent } from './components/share/multi-select-dropdown/multi-select-dropdown.component';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './components/about/about.component';
import { ShipDetailComponent } from './components/ship-detail/ship-detail.component';
import { MatTableModule } from '@angular/material/table';
import 'leaflet.markercluster';

@NgModule({
  declarations: [
    MapComponent,
    AppComponent,
    DashboardComponent,
    VesselComponent,
    FlightComponent,
    VesselPopupComponent,
    FlightDetailComponent,
    HeaderComponent,
    MapSearchComponent,
    MultiSelectDropdownComponent,
    AboutComponent,
    ShipDetailComponent,
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
    MatTableModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
