import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarComponent } from './bar/bar.component';
import { StackedRevenueComponent } from './stacked-revenue/stacked-revenue.component';
import { Bar2Component } from './bar2/bar2.component';
import { WorldMapComponent } from './world-map/world-map.component';
import { GlobeComponent } from './globe/globe.component';

const routes: Routes = [
  {path: "bar-simple", component: Bar2Component},
  {path: "bar", component: BarComponent},
  {path: "stacked", component: StackedRevenueComponent},
  {path: 'world-map', component: WorldMapComponent},
  {path: 'globe', component: GlobeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
