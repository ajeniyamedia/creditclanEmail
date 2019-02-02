import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from '../products/products.component';
import { AuthGuard } from '../../_guards/auth.guard';
const routes: Routes = [
  {
    path: '', component: ProductsComponent, canActivate: [AuthGuard],

    children: [
      { path: '', component: ProductsComponent, canActivate: [AuthGuard] },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
