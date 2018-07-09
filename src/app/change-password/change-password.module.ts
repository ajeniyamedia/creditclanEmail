import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ChangePasswordComponent } from './change-password.component';
import {ChangePasswordRoutingModule} from './change-password-routing/change-password-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChangePasswordRoutingModule
  ],
  declarations: [
    ChangePasswordComponent
  ]
})
export class ChangePasswordModule { }
