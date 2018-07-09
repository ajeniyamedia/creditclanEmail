import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { InvestmentsComponent } from '../investments/investments.component';
import { InvestmentsroutingModule } from '../investments/investmentsrouting.module';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    InvestmentsroutingModule
  ],
  declarations: [
    InvestmentsComponent
  ]
})
export class InvestmentsModule { }
