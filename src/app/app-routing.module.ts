import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app/app.component';
import { LoginComponent } from '../app/login/login.component'; 
import { CreditComponent } from '../app/credit/credit.component';
import { CreditdashboardComponent } from '../app/creditdashboard/creditdashboard.component'; 
import { PageNotFoundComponent } from '../app/page-not-found/page-not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NewsettingsComponent } from '../app/newsettings/newsettings.component'; 

import { ForgotComponent } from './forgot/forgot.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoggedinGuard } from './_guards/loggedin.guard';
const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotComponent }, 
  {
    path: '', component: CreditdashboardComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'credit', component: CreditComponent,
    children: [
      { path: '', redirectTo: 'creditdashboard', pathMatch: 'full' }, 
      { path: 'creditdashboard', component: CreditdashboardComponent }, 
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'operations',
    loadChildren: '../app/operations/operations.module#OperationsModule',
    data: {
      preload: true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: '../app/settings/settings.module#SettingsModule',
    data: {
      preload: true
    }
  },
  {
    path: 'settings',
    loadChildren: '../app/settings/settings.module#SettingsModule',
    data: {
      preload: true
    }
  },
  {
    path: 'settings/mobile',
    loadChildren: '../app/mobile/mobile.module#MobileModule',
    data: {
      preload: true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'settings/web',
    loadChildren: '../app/web/web.module#WebModule',
    data: {
      preload: true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'settings/decision-engine',
    loadChildren: '../app/decision/decision.module#DecisionModule',
    data: {
      preload: true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'settings/investors',
    loadChildren: '../app/investors/investors.module#InvestorsModule',
    data: { 
      preload: true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'settings/ussd',
    loadChildren: '../app/mobile/mobile.module#MobileModule',
    data: {
      preload: true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'settings/backend',
    loadChildren: '../app/backend/backend.module#BackendModule',
    data: {
      preload: true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'settings/products',
    loadChildren: '../app/products/products.module#ProductsModule',
    data: {
      preload: true
    },
    canActivate: [AuthGuard]
  },

  { 
    path: 'newsettings',
    loadChildren: '../app/setting-module/setting-module.module#SettingModuleModule',
    data: {
      preload: true
    },
    canActivate: [AuthGuard]
   },

  {
    path: 'unauthorized', component: UnauthorizedComponent
  },
  { path: '', redirectTo: 'credit/creditdashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
