import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../../_guards/auth.guard';
import { ProductdetailsComponent } from '../productdetails/productdetails.component';
import { ProductbasicComponent } from '../productbasic/productbasic.component';
import { ProductsettingsComponent } from '../productsettings/productsettings.component';
import { ProductapprovalsComponent } from '../productapprovals/productapprovals.component';

const routes: Routes = [
  {
    path: '', component: ProductdetailsComponent, canActivate: [AuthGuard],

    children: [
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: 'details', component: ProductbasicComponent },
      { path: 'settings', component: ProductsettingsComponent },
      { path: 'approvals', component: ProductapprovalsComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductroutingModule { }
