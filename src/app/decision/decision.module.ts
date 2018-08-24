import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DecisionComponent } from './decision/decision.component';
import { DecisionRoutingModule } from './decision-routing/decision-routing.module';
import { SimpledecisionComponent } from './simpledecision/simpledecision.component';
import { AdvanceddecisionComponent } from './advanceddecision/advanceddecision.component';
import { ProfileanalyticsComponent } from './profileanalytics/profileanalytics.component';
import { SocialanalyticsComponent } from './socialanalytics/socialanalytics.component';
import { RepaymentanalyticsComponent } from './repaymentanalytics/repaymentanalytics.component';
import { BureauanalyticsComponent } from './bureauanalytics/bureauanalytics.component';
import { RemitaanalyticsComponent } from './remitaanalytics/remitaanalytics.component';
import { CardsanalyticsComponent } from './cardsanalytics/cardsanalytics.component';
import { BankaccountanalyticsComponent } from './bankaccountanalytics/bankaccountanalytics.component'; 

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DecisionRoutingModule
  ],
  declarations: [DecisionComponent, SimpledecisionComponent, AdvanceddecisionComponent, ProfileanalyticsComponent, SocialanalyticsComponent, RepaymentanalyticsComponent, BureauanalyticsComponent, RemitaanalyticsComponent, CardsanalyticsComponent, BankaccountanalyticsComponent]
})
export class DecisionModule { }
