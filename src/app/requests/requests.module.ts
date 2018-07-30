import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';


import { RequestsComponent } from '../requests/requests.component';
import { RequestsdashComponent } from './requestsdash/requestsdash.component';
import { RequestslistComponent } from '../requestslist/requestslist.component';
import { RequestsRoutingModule } from './requests-routing/requests-routing.module';
import { PortfoliocalendarComponent } from '../portfoliocalendar/portfoliocalendar.component';
import { ReversetransactionComponent } from './reversetransaction/reversetransaction.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AnalyticsEngineComponent } from './analytics-engine/analytics-engine.component';
import { AdvancedofferComponent } from './advancedoffer/advancedoffer.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RequestsRoutingModule
  ],
  declarations: [
    RequestsdashComponent,
    RequestsComponent,
    RequestslistComponent,
    PortfoliocalendarComponent,
    ReversetransactionComponent,
    AnalyticsComponent,
    AnalyticsEngineComponent,
    AdvancedofferComponent
  ]
})
export class RequestsModule { }
