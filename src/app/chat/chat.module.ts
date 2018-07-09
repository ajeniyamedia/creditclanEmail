import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ChatComponent } from '../chat/chat.component';
import { ChatroutingModule } from '../chat/chatrouting.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChatroutingModule
  ],
  declarations: [
    ChatComponent
  ]
})
export class ChatModule { }
