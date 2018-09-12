import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityComponent } from './security/security.component';
import { SecurityRoutingModule } from './security-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SecurityRoutingModule,
    SharedModule
  ],
  declarations: [SecurityComponent]
})
export class SecurityModule { }
