import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WebcomponentComponent } from '../webcomponent/webcomponent.component';
import { AuthGuard } from '../../_guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: WebcomponentComponent, canActivate: [AuthGuard],

    children: [
      { path: '', component: WebcomponentComponent, canActivate: [AuthGuard] }

    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebroutingModule { }
