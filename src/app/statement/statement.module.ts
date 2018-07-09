import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';


import { StatementdetailsComponent } from './statementdetails/statementdetails.component';
import { LoanstatementComponent } from '../loanstatement/loanstatement.component';
import { StatementscheduleComponent } from '../statementschedule/statementschedule.component';

import {StatementroutingModule} from '../statement/statementrouting.module'; 

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StatementroutingModule
  ],
  declarations: [ 
    StatementdetailsComponent,
    LoanstatementComponent,
    StatementscheduleComponent, 
  ]
})
export class StatementModule { }
