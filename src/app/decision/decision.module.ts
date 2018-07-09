import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DecisionComponent } from './decision/decision.component';
import { DecisionRoutingModule } from './decision-routing/decision-routing.module';
import { SimpledecisionComponent } from './simpledecision/simpledecision.component';
import { AdvanceddecisionComponent } from './advanceddecision/advanceddecision.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DecisionRoutingModule
  ],
  declarations: [DecisionComponent, SimpledecisionComponent, AdvanceddecisionComponent]
})
export class DecisionModule { }
