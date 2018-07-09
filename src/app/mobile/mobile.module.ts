import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module'; 
import { MobileRoutingModule } from './mobile-routing.module';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MobileRoutingModule
  ],
  declarations: []
})
export class MobileModule { }
