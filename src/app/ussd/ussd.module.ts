import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UssdsettingsComponent } from './ussdsettings/ussdsettings.component';
import { UssdRoutingModule } from '../ussd/ussd-routing.module';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UssdRoutingModule
  ],
  declarations: [
    UssdsettingsComponent
  ]
})
export class UssdModule { }
