import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from '../chat/chat.component'; 
import { AuthGuard } from '../_guards/auth.guard';
const routes: Routes = [
  {
    path: '', component: ChatComponent, canActivate: [AuthGuard],

    children: [
      { path: '', component: ChatComponent, canActivate: [AuthGuard] }

    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatroutingModule { }
