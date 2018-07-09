import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KycComponent } from '../kyc/kyc.component';
import { KycRoutingModule } from '../kyc/kyc-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    KycRoutingModule
  ],
  declarations: [
    KycComponent,
    DashboardComponent
  ]
})
export class KycModule { }
