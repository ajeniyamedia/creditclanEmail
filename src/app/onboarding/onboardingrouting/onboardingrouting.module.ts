import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OnboardingComponent } from '../../onboarding/onboarding.component'; 
import { AuthGuard } from '../../_guards/auth.guard';
const routes: Routes = [
  {
    path: '', component: OnboardingComponent, canActivate: [AuthGuard],

    children: [
      { path: '', component: OnboardingComponent, canActivate: [AuthGuard] }

    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingroutingModule { }