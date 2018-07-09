import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { CustomersComponent } from '../customers/customers.component';
import { CrmroutingModule } from '../crm/crmrouting.module';
import { CrmComponent } from '../crm';
import { CompaniesComponent } from './companies/companies.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CrmroutingModule
  ],
  declarations: [
    CrmComponent,
    CustomersComponent,
    CompaniesComponent,

  ]
})
export class CrmModule { }
