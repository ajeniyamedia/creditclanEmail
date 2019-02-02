import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { OperationsService, StorageService,LoansService } from '../../_services/index';
import {OptionsserviceService} from '../../_services/optionsservice.service';
import {Observable} from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LevelModel } from '../../_models/level.model';

@Component({
  selector: 'app-investorsettings',
  templateUrl: './investorsettings.component.html',
  styleUrls: ['./investorsettings.component.css']
})
export class InvestorsettingsComponent implements OnInit {
  companyaccounts:any;
  public currentUser: any;
  isedit=false;
  loading=false;
  public management_fee = {
    FEE_TYPE:'0',
    FEE_PERCENT_VALUE:'0',
    FEE_FLAT_VALUE:'0',
    MANAGEMENT_FEE_ACCOUNT:'0'
  }
  public repayment_settings = {
    
    PAY_INVESTOR_IMMEDIATELY:false
  }
  public product={
    LOAN_PRODUCT_ID:'0'
  }
  public tc = {
    LOAN_PRODUCT_ID:'',
    INVESTOR_TERMS_AND_CONDITIONS:'', 
  }
  editorConfig = {
    editable: true,
    spellcheck: false,
    height: '5rem',
    minHeight: '7rem',
    placeholder: 'Enter your text here',
    translate: 'no',
    width:"100%",
    minWidth:"100%"
  };
  lending_validation = [
    { value: '1', display: 'Phone', checked:false },
    { value: '2', display: 'BVN', checked:false  },
    { value: '3', display: 'Email', checked:false  },
    { value: '4', display: 'Documents', checked:false  },
    { value: '5', display: 'Verify', checked:false  },
    { value: '6', display: 'Backend Verification', checked:false  }
  ]; 
  public general_settings = { 
    MINIMUM_FUNDING_BEFORE_DISBURSE:'0',
    MAXIMUM_INVESTMENT_PERCENT_APPLIES_ABOVE:'0',
    USE_PLATFORM_RATE:false,
    LENDER_SEE_RECORDS:'0',
    MINIMUM_INVESTMENT:'0',
    MAXIMUM_INVESTMENT:'0',
    INVESTMENT_INTERVAL:'0',
    MAXIMUM_INVESTMENT_PERCENT:'',
    LIMIT_LENDERS_TARGETED:'0', 
    SECTIONS_TO_SHOW:[],
    PROFILE_TO_SHOW:[],
    REQUEST_DOCUMENTS:false,
    LENDING_VALIDATION:[]
  }
  sections_to_show = [
    { value: '1', display: 'Lenders', checked:false },
    { value: '2', display: 'Comments', checked:false  },
    { value: '3', display: 'About Loan', checked:false  },
    { value: '4', display: 'Images', checked:false  },
    { value: '5', display: 'Attachments', checked:false  },
    { value: '6', display: 'Profile', checked:false  }
  ]; 
  profile_to_show = [
    { value: '1', display: 'Income', checked:false },
    { value: '2', display: 'Employment', checked:false  },
    { value: '3', display: 'Next of kin', checked:false  },
    { value: '4', display: 'Bank Statements', checked:false  },
    { value: '5', display: 'Expenses', checked:false  },
    { value: '6', display: 'Education', checked:false  },
    { value: '7', display: 'Age', checked:false  },
    { value: '8', display: 'Guarantors', checked:false  },
    { value: '9', display: 'Analysis Document', checked:false  },
    { value: '10', display: 'Bio', checked:false  },
    { value: '11', display: 'Bank Account Details', checked:false  }
  ]; 
  public lender_see_records = [
    { value: '0', display: 'No' },
    { value: '1', display: 'Everytime' },
    { value: '2', display: 'No Offer' }
  ];
  
  constructor(public toastr: ToastrService, vcr: ViewContainerRef,public loansService:LoansService,public optionsService: OptionsserviceService,
    private router: Router,public storageService: StorageService,
    public operationsService:OperationsService) { 
    this.currentUser = this.storageService.read<any>('currentUser'); 
    
  }

  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }

  ngOnInit() {  
     
    this.operationsService.getLenderSettings(this.currentUser.token) 
      .subscribe(data => {
        //this.companyaccounts = data.accounts.a;
         this.general_settings.MINIMUM_FUNDING_BEFORE_DISBURSE = data.general_settings.MINIMUM_FUNDING_BEFORE_DISBURSE
         this.general_settings.USE_PLATFORM_RATE = data.general_settings.USE_PLATFORM_RATE
         this.general_settings.LENDER_SEE_RECORDS = this.lender_see_records[data.general_settings.LENDER_SEE_RECORDS].value;
         this.general_settings.MINIMUM_INVESTMENT = data.general_settings.MINIMUM_INVESTMENT
         this.general_settings.MAXIMUM_INVESTMENT = data.general_settings.MAXIMUM_INVESTMENT
         this.general_settings.INVESTMENT_INTERVAL = data.general_settings.INVESTMENT_INTERVAL
         this.general_settings.MAXIMUM_INVESTMENT_PERCENT = data.general_settings.MAXIMUM_INVESTMENT_PERCENT
         this.general_settings.LIMIT_LENDERS_TARGETED = data.general_settings.LIMIT_LENDERS_TARGETED
         this.general_settings.SECTIONS_TO_SHOW = data.general_settings.SECTIONS_TO_SHOW
         this.general_settings.PROFILE_TO_SHOW = data.general_settings.PROFILE_TO_SHOW
         this.general_settings.REQUEST_DOCUMENTS = data.general_settings.REQUEST_DOCUMENTS
         this.general_settings.LENDING_VALIDATION = data.general_settings.LENDING_VALIDATION
         this.general_settings.MAXIMUM_INVESTMENT_PERCENT_APPLIES_ABOVE = data.general_settings.MAXIMUM_INVESTMENT_PERCENT_APPLIES_ABOVE;
        
         this.management_fee.FEE_TYPE=data.management_fee.MANAGEMENT_FEE_TYPE;
         this.management_fee.FEE_FLAT_VALUE=data.management_fee.TOTAL_MANAGEMENT_FLAT_FEES;
         this.management_fee.FEE_PERCENT_VALUE=data.management_fee.TOTAL_MANAGEMENT_PERCENTAGE_FEES;
         this.management_fee.MANAGEMENT_FEE_ACCOUNT=data.management_fee.MANAGEMENT_FEE_ACCOUNT;

         this.product.LOAN_PRODUCT_ID = data.product.LOAN_PRODUCT_ID;

         this.repayment_settings.PAY_INVESTOR_IMMEDIATELY = data.repayment_settings.PAY_INVESTOR_IMMEDIATELY

         this.tc.INVESTOR_TERMS_AND_CONDITIONS = data.general_settings.INVESTOR_TERMS_AND_CONDITIONS

    });
  }
  isSectionToShowAvailable(SECTION,index){
  
    if(this.general_settings.SECTIONS_TO_SHOW.indexOf(SECTION)>-1){
      this.sections_to_show[index]["checked"]=true
      return true;
    }else{
      return false;
    }
  }
  isProfileToShowAvailable(SECTION,index){
  
    if(this.general_settings.PROFILE_TO_SHOW.indexOf(SECTION)>-1){
      this.profile_to_show[index]["checked"]=true
      return true;
    }else{
      return false;
    }
  }
  isLendingValidationAvailable(SECTION,index){
  
    if(this.general_settings.LENDING_VALIDATION.indexOf(SECTION)>-1){
      this.lending_validation[index]["checked"]=true
      return true;
    }else{
      return false;
    }
  }
  checkSectionAvailable(sector, event, index) {
    this.sections_to_show[index]["checked_"] = event;
  }
  checkProfileToShow(sector, event, index) {
    this.profile_to_show[index]["checked_"] = event;

  }
  checkLendingValidation(sector, event, index) {
    this.lending_validation[index]["checked_"] = event;

  }
  saveManagementFee(value, valid){
    
    this.loading = true;
    this.operationsService.saveManagementFee(this.currentUser.token,value) 
    .subscribe(data => {
        this.loading = false;
        if (data.status==='1') {
          this.showSuccess(data.message)
        }else{
          this.showError(data.message)
        }
    });
  }
  saveGeneralSettings(value, valid){
    
    this.loading = true;
    this.operationsService.saveInvestorGeneralSettings(this.currentUser.token,value) 
    .subscribe(data => {
        this.loading = false;
        if (data.status==='1') {
          this.showSuccess(data.message)
        }else{
          this.showError(data.message)
        }
    });
  }
  saveRepayment(value, valid){
    
    this.loading = true;
    this.operationsService.saveInvestorRepayment(this.currentUser.token,value) 
    .subscribe(data => {
        this.loading = false;
        if (data.status==='1') {
          this.showSuccess(data.message)
        }else{
          this.showError(data.message)
        }
    });
  }
  saveTC(value, valid){
    this.loading = true;
    this.operationsService.saveITCSettings(this.currentUser.token,value) 
    .subscribe(data => {
      this.loading = false;
      this.showSuccess(data.message);
  });
 }
}
