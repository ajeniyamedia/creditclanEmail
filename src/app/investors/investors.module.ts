import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module'; 
import { InvestorsettingsComponent } from './investorsettings/investorsettings.component';
import { InvestorsRoutingModule } from './investors-routing/investors-routing.module';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    InvestorsRoutingModule
  ],
  declarations: [InvestorsettingsComponent]
})
export class InvestorsModule { }
