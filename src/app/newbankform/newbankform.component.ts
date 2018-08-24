import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-newbankform',
  templateUrl: './newbankform.component.html',
  styleUrls: ['./newbankform.component.css']
})
export class NewbankformComponent implements OnInit {
  @Input('loading') loading = false; 
  @Input('showForm') showForm = false;
  @Input('showTestTransfer') showTestTransfer = false;
  @Input('showSearch') showSearch = false;
  @Input('nigerian_banks') nigerian_banks: any;
  @Input('VERIFY_STATUS') VERIFY_STATUS = false;
  @Input('charge_account') charge_account = false;
  @Input('destination') destination = false;
  @Input('fresponse') fresponse;
  @Input('confirming') confirming = true;
  @Input('otpConfirmed') otpConfirmed = false;
  @Input('otpHBSFC') otpHBSFC = false;
  @Input('confirmingOTP') confirmingOTP = true;
  @Input('lenderbanksaved') lenderbanksaved = false; 
  @Input('lbHBSFS') lbHBSFS = false;
  @Input('isdelete') isdelete = false;
  @Input('banking') banking = false;
  @Input('bank') bank = { LENDER_BANK_BANK_NAME: '', LENDER_BANK_ACCOUNT_NAME: '', LENDER_BANK_CODE: '', LENDER_BANK_ACCOUNT_ID: '', LENDER_ACCOUNT_NUMBER: '', LENDER_BANK_ID: '', LENDER_ACCOUNT_GL: '', LENDER_ID: '', ADDED_BY: '', DATE_ADDED: '', PARENT_GL_ID: '', DATE_MODIFIED: '',IS_FOR_EBILLS:false };
  @Input('credit') credit = { DEST_BANK_ID: '', DEST_BANK_CODE: '', DEST_ACCOUNT_NUMBER: '' };
  @Input('otp') otp = { CONFIRM_OTP_CODE: '', flutterChargeReference: '' };
  @Output() verifyTheAccount = new EventEmitter();
  @Output() changeTheBankCode = new EventEmitter();
  @Output() changeTheBankCode_ = new EventEmitter();
  @Output() testTheTransfer = new EventEmitter();
  @Output() saveTheLenderBank = new EventEmitter();
  @Output() doTheTransfer = new EventEmitter();
  @Output() checkIfEbillsBankAlreadyExists = new EventEmitter();
  @Output() deleteBank = new EventEmitter();
  @Input('has_ebills_error') has_ebills_error = false;
  @Input('ebills_error') ebills_error = "";
  constructor() { }

  ngOnInit() {
  }
  checkIfEbillsAlreadyExists(event){
    if(event==true){
      //check for ebills error
      this.checkIfEbillsBankAlreadyExists.emit()
    }else{
      this.ebills_error = "";
      this.has_ebills_error = false;
    }
  }
  verifyAccount() {
    this.verifyTheAccount.emit(this.bank)
  }
  changeBankCode(event, status) {
    this.changeTheBankCode.emit({ "event": event, "status": status })
  }
  changeBankCode_(event, status) {
    this.changeTheBankCode_.emit({ "event": event, "status": status })
  }
  testTransfer() {
    this.destination = true;
    this.loading = false;
    this.charge_account = false;
    this.VERIFY_STATUS = false;
  }
  saveLenderBank() {
    this.saveTheLenderBank.emit()
  }
  doTransfer() {
    this.doTheTransfer.emit()
  }
  confirmBankDelete(){
    this.deleteBank.emit({bank:this.banking})
  }
} 
