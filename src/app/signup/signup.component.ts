import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { OperationsService, StorageService,LoansService } from '../_services/index';
import { LenderModel } from '../_models/lender.model';
import { AuthenticationService } from '../_services/index';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  loading=false;
  formLender: LenderModel;
  currentView: any= "details";

  setup={
    WEB:"0",
    USSD:"0",
    MOBILE:"0",
    ADDRESS:"",
    PHONE:"",
    EMAIL:"",
    PASSWORD:"",
    LEGAL_NAME:"",
    WEBSITE:"",
    LENDER_TYPE: null,
    LOANS_MONTHLY: null,
    STATE_OF_OPERATION: null,
    MAX_AMOUNT: '',
    INT_RATE: '',
    TENOR: null,
    MAX_TENOR: ''
  }

  constructor(public authenticationService: AuthenticationService,
    public toastr: ToastrService,private router: Router,
    public operationsService:OperationsService,
    public storageService: StorageService) {
  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }

  ngOnInit() {
    this._setFormLender();
  }
  _setFormLender(){
    this.formLender = new LenderModel('','','');
  }

  mobileChecked(){
    this.setup.MOBILE = "1";
    this.currentView = 'ussd';
  }
  ussdChecked(){
    this.setup.USSD = "1";
    this.currentView = 'web';
  }
  webChecked(){
    this.setup.WEB = "1";
    this.currentView = 'dashboard';
  }

  displaySetupDetails(){
    this.currentView = 'details';
  }

  displaySetupDashboard(){
    this.currentView = 'dashboard';
  }
  
  displaySetupMobile(){
    this.currentView = 'mobile';
  }

  displaySetupUssd(){
    this.currentView = 'ussd';
  }
  
  displaySetupWeb(){
    this.currentView = 'web';
  }

  displaySetupTc(){
    this.currentView = 'tc';
  }  

  displaySetupRate(){
    this.currentView = 'rates';
  }

  signup(value, valid) { 
    this.loading = true;
    this.authenticationService.signup(this.setup)
      .subscribe(result => {
        if (result.status === true) {
          this.router.navigate(['/setup']);
        } else {
          
          this.loading = false;
          this.showError(result.message)
        }
      });
  }

  
}
