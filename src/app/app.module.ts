import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarComponent } from './bar/bar.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { StackedRevenueComponent } from './stacked-revenue/stacked-revenue.component';
import { Bar2Component } from './bar2/bar2.component';
import { WorldMapComponent } from './world-map/world-map.component';
import { GlobeComponent } from './globe/globe.component';
import { IndiaComponent } from './india/india.component';
import { India2Component } from './india2/india2.component';

@NgModule({
  declarations: [AppComponent, BarComponent, StackedRevenueComponent, Bar2Component, WorldMapComponent, GlobeComponent, IndiaComponent, India2Component],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
