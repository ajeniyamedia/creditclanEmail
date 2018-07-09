import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';


import { InvestmentComponent } from '../investment/investment.component';
import { InvestmentborrowerComponent } from '../investmentborrower/investmentborrower.component';
import { InvestmentscheduleComponent } from '../investmentschedule/investmentschedule.component';
import { InvestmentdetailsComponent } from '../investmentdetails/investmentdetails.component';

import {InvestmentroutingModule} from '../investment/investmentrouting.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    InvestmentroutingModule
  ],
  declarations: [
    InvestmentdetailsComponent,
    InvestmentComponent,
    InvestmentborrowerComponent,
    InvestmentscheduleComponent
  ]
})
export class InvestmentModule { }
