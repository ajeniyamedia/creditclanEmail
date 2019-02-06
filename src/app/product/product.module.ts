import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductroutingModule } from './productrouting/productrouting.module';
import { SharedModule } from '../shared/shared.module';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { ProductbasicComponent } from './productbasic/productbasic.component';
import { ProductapprovalsComponent } from './productapprovals/productapprovals.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductroutingModule
  ],
  declarations: [
    ProductdetailsComponent,
    ProductbasicComponent,
    ProductapprovalsComponent
  ]
})
export class ProductModule { }
