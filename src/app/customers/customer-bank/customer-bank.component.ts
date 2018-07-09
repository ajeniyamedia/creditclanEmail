import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../_services/customers.service';
import { DataService } from '../../_services/index';
import { UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';

@Component({
  selector: 'app-customer-bank',
  templateUrl: './customer-bank.component.html',
  styleUrls: ['./customer-bank.component.css']
})

export class CustomerBankComponent implements OnInit {

  resp = [];
  sub; // Instance of the route subscription
  userType;
  userId;
  subSection = 'main';
  model = {};

  public currentUser: any;
  public loading = false;
  public banks = {
    count:'0',
    banks:[]
  };
  public showForm = true;
  public showSearch = false;
  public nigerian_banks: any;
  public VERIFY_STATUS = false;
  public charge_account = false;
  public destination = false;
  public bank = { LENDER_BANK_BANK_NAME: '', LENDER_BANK_ACCOUNT_NAME: '', LENDER_BANK_CODE: '', LENDER_BANK_ACCOUNT_ID: '', LENDER_ACCOUNT_NUMBER: '', LENDER_BANK_ID: '', LENDER_ACCOUNT_GL: '', LENDER_ID: '', ADDED_BY: '', DATE_ADDED: '', PARENT_GL_ID: '', DATE_MODIFIED: '' };
  public credit = { DEST_BANK_ID: '', DEST_BANK_CODE: '', DEST_ACCOUNT_NUMBER: '' };
  public otp = { CONFIRM_OTP_CODE: '', flutterChargeReference: '' };
  public fresponse;
  public confirming = true;
  public otpConfirmed = false;
  public otpHBSFC = false;
  public confirmingOTP = true;
  public lenderbanksaved = false;
  public lbHBSFS = false; 

  constructor(public route: ActivatedRoute,
    public DataService: DataService,
    protected customersSrvc: CustomersService,
    public operationsService: OperationsService,
    public storageService: StorageService,) { 
      this.currentUser = this.storageService.read<any>('currentUser');
      this.operationsService.getNigerianBanks(this.currentUser.token).subscribe(nigerian_banks => this.nigerian_banks = nigerian_banks);
    }

  // Load bank accounts for this user
  ngOnInit() {
    this.getBanks()
  }
  getBanks(){
    this.subSection = "main"
    this.sub = this.route.parent.params.subscribe(params => {
      this.userType = params["type"];
      this.userId = params["id"];
      this.customersSrvc.getBanks(this.userId).subscribe(data => {
        this.resp = data;

        // Publish section
        this.DataService.onProfileNav.emit({ 'location': 'accounts', 'data': data });

      });
    });
  }
  open(section) {
    this.subSection = section;
  }

  addBank() {
    this.customersSrvc.addBank(this.model).subscribe(data => {
      if (data.status) {
        alert(data.message);
      }
    });
  }

  saveLenderBank() {

    this.loading = true; 
    this.operationsService.saveCustomerBank(this.currentUser.token, this.bank, this.userId)
      .subscribe(status => {
        this.lbHBSFS = true; 
        this.loading = false;

        if (status.status == '1') {
          this.lenderbanksaved = true;
          this.loading = false;
          this.confirming = true;
          this.confirmingOTP = false;
          this.otpConfirmed = false
          this.otpHBSFC = false
          this.lenderbanksaved = false;
          this.lbHBSFS = false;
          this.showForm = false;
          this.getBanks()
        } else {
          this.lenderbanksaved = false;
        }
      });
  }

  cancelOperation() {
    this.loading = false;
    this.confirming = true;
    this.confirmingOTP = false;
    this.otpConfirmed = false
    this.otpHBSFC = false
    this.lenderbanksaved = false;
    this.lbHBSFS = false;
  }
  verifyAccount(bank) {
    this.bank = bank;
    this.loading = true;
    this.VERIFY_STATUS = false; 
    this.operationsService.confirmBankAccount(this.currentUser.token, this.bank)
      .subscribe(status => { 
        this.loading = false;

        if (status.status == "success") {
          this.VERIFY_STATUS = false;
          this.charge_account = true;
          this.bank.LENDER_BANK_ACCOUNT_NAME = status.data.account_name;
        } else {
          this.VERIFY_STATUS = true;
        }
      });
  }
 
  changeBankCode(event) {
    if (event.status == true) {
      this.charge_account = false;
      this.VERIFY_STATUS = false;
      this.loading = false;
      this.destination = false;
      this.bank.LENDER_BANK_CODE = event.event.BANK_CODE;
      this.bank.LENDER_BANK_BANK_NAME = event.event.BANK_NAME;
      this.bank.LENDER_BANK_ID = event.event.BANK_ID;
      this.bank.LENDER_BANK_ACCOUNT_NAME = "";
      this.bank.LENDER_ACCOUNT_NUMBER = "";
    } else {
      this.charge_account = false;
      this.VERIFY_STATUS = false;
      this.loading = false;
      this.credit.DEST_BANK_CODE = event.event.BANK_CODE;
    }

  }
   
}
