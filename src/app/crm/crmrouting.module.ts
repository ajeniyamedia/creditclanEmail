import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CrmComponent } from '../crm/crm.component';
import { CustomersComponent } from '../customers/customers.component';
import { AuthGuard } from '../_guards/auth.guard';
import { CompaniesComponent } from '../crm/companies/companies.component';
import { AllcustomersComponent } from '../shared/allcustomers/allcustomers.component';
const routes: Routes = [
  {
    path: '', component: CrmComponent, canActivate: [AuthGuard],

    children: [
      { path: '', redirectTo: 'customers', pathMatch: 'full' },
      { path: 'customers', component: AllcustomersComponent },
      { path: 'companies', component: CompaniesComponent }

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmroutingModule { }
