import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../_guards/auth.guard';
import { RequestsdashComponent } from '../../requests/requestsdash/requestsdash.component';
import { RequestsComponent } from '../requests.component';
import { AnalyticsComponent } from '../analytics/analytics.component';
const routes: Routes = [
  {
    path: '', component: RequestsdashComponent, canActivate: [AuthGuard],

    children: [
      { path: '', redirectTo: 'pending', pathMatch: 'full' },
      { path: 'pending', component: RequestsComponent },
      { path: 'historical', component: RequestsComponent },
      { path: 'portfolio', component: RequestsComponent },
      { path: 'calendar', component: RequestsComponent },
      { path: 'draft', component: RequestsComponent },
      { path: 'rejected', component: RequestsComponent },
      { path: 'terminated', component: RequestsComponent },
      { path: 'market', component: RequestsComponent },
      { path: 'ineligible', component: RequestsComponent },
      { path: 'disbursements', component: RequestsComponent },
      { path: 'all', component: RequestsComponent },
      { path: 'repaid', component: RequestsComponent },
      { path: 'contract', component: RequestsComponent },
      { path: 'analytics', component: AnalyticsComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }
