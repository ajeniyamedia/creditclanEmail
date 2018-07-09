import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BackendRoutingModule } from '../backend/backend-routing/backend-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BackendRoutingModule
  ],
  declarations: [ ]
})
export class BackendModule { }
