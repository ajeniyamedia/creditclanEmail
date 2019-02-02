import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { OperationsComponent } from '../operations/operations.component';
import { OperationsdashboardComponent } from './operationsdashboard/operationsdashboard.component'; 
import { OperationsRoutingModule } from './operations-routing.module';
@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    OperationsRoutingModule
  ],
  declarations: [
    OperationsComponent,
    OperationsdashboardComponent
  ]
})
export class OperationsModule { }
