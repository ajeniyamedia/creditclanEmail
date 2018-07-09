import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagesComponent } from '../messages/messages.component';
import { MessagesRoutingModule } from '../messages/messages-routing.module';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MessagesRoutingModule
  ],
  declarations: [
    MessagesComponent,
    DashboardComponent
  ]
})
export class MessagesModule { }
