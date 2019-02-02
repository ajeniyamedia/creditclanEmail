import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingComponent } from './onboarding.component';
import { SharedModule } from '../shared/shared.module';
import { OnboardingroutingModule } from '../onboarding/onboardingrouting/onboardingrouting.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OnboardingroutingModule
  ],
  declarations: [OnboardingComponent]
})
export class OnboardingModule { }
