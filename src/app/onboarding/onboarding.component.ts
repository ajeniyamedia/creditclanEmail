import { Component, OnInit } from '@angular/core';
import { UserService, DataService,OperationsService, CustomerService, AuthenticationService, StorageService, LoansService } from '../_services/index';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css'],
})
export class OnboardingComponent implements OnInit {
  public currentUser: any;
  currentView: any= "dashboard";
  displayView = "ussd";
  setup={
    TC:"0",
    WEB:"0",
    USSD:"0",
    MOBILE:"0",
    ADDRESS:"",
    PHONE:"",
    EMAIL:"",
    CONTACT_NAME:"",
    BUSINESS_NAME:""
  }
  constructor(public storageService: StorageService,public route: ActivatedRoute) { 
    this.currentUser = this.storageService.read<any>('currentUser');
  }
 
  ngOnInit(){
  }

  mobilechecked(){
    this.setup.MOBILE
  }

  displayDashboard(){
    this.currentView = 'dashboard';
  }
  
  displayMobileSettings(){
    this.currentView = 'mobile';
    this.displayView = 'mobile';
  }

  displayUssdSettings(){
    this.currentView = 'ussd';
    this.displayView = 'ussd';
  }
  
  displayWebSettings(){
    this.currentView = 'web';
  }

  displayBackendSettings(){
    this.currentView = 'backend';
  }

  displayInvestorSettings(){
    this.currentView = 'investor';
  }
}