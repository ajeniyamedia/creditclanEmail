import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module'; 
import { WebroutingModule } from './webrouting/webrouting.module';
import { WebcomponentComponent } from './webcomponent/webcomponent.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    WebroutingModule
  ],
  declarations: [WebcomponentComponent]
})
export class WebModule { }
