import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PickupComponent } from './pickup/pickup.component';
import { PickupRoutingModule } from '../pickup/pickup-routing.module';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PickupRoutingModule
  ],
  declarations: [DashboardComponent, PickupComponent]
})
export class PickupModule { }
