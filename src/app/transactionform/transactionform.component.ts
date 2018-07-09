import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DataService, UserService, OperationsService, AuthenticationService, StorageService } from '../_services/index';
import { Transaction } from './transaction.interface';
@Component({
  selector: 'app-transactionform',
  templateUrl: './transactionform.component.html',
  styleUrls: ['./transactionform.component.css']
})
export class TransactionformComponent implements OnInit {

  @Input('com_accounts') com_accounts: any;
  @Input('people_customers') people_customers: any;
  @Input('currentUser') currentUser: any;
  loans: any;
  investments: any;
  transaction: Transaction;
  @Input('issearching') issearching = false;
  @Output() doTheTransfer = new EventEmitter();
  errors = {
    DATE_ADDED: false,
    INTRAFOLIONUMBER: false,
    ACCOUNT_ID: false,
    OTHER_FORM_TYPE: false,
    LOANS: false,
    INVESTMENTS: false,
    AMOUNT: false,
    AMOUNT_: false,
    NARRATIVE: false,
    ISA: false,
  }
  constructor(public operationsService: OperationsService, public DataService: DataService, ) {
    this.DataService.onEditCredit.subscribe(res => {
      this.transaction = res.credit
      console.log(this.transaction)
    })
    this.DataService.onEditDebit.subscribe(res => {
      this.transaction = res.debit
      console.log(this.transaction)
    })
  }

  ngOnInit() {
    this.transaction = {
      DATE_ADDED: '',
      INTRAFOLIONUMBER: '',
      ACCOUNT_ID: '',
      OTHER_FORM_TYPE: '0',
      LOANS: '',
      INVESTMENTS: '',
      AMOUNT: '',
      AMOUNT_: '',
      NARRATIVE: '',
      ISA: '0'
    }
  }
  save(formvalue, isvalid) {
    this.errors = {
      DATE_ADDED: false,
      INTRAFOLIONUMBER: false,
      ACCOUNT_ID: false,
      OTHER_FORM_TYPE: false,
      LOANS: false,
      INVESTMENTS: false,
      AMOUNT: false,
      AMOUNT_: false,
      NARRATIVE: false,
      ISA: false,
    }
    if (this.transaction.ACCOUNT_ID == "") {
      this.errors.ACCOUNT_ID = true;
      return;
    }

    if (this.transaction.INTRAFOLIONUMBER == "") {
      this.errors.INTRAFOLIONUMBER = true;
      return;
    }

    if (this.transaction.ISA == "1") {
      if (this.transaction.OTHER_FORM_TYPE == "0") {
        this.errors.OTHER_FORM_TYPE = true;

        return;
      }
    }
    if (this.transaction.ISA == "1") {
      if (this.transaction.OTHER_FORM_TYPE == "1") {
        if (this.transaction.LOANS == "") {
          this.errors.LOANS = true;

          return;
        }
      }
      if (this.transaction.OTHER_FORM_TYPE == "2") {
        if (this.transaction.INVESTMENTS == "") {
          this.errors.INVESTMENTS = true;

          return;
        }
      }
    }
    if (this.transaction.AMOUNT == "0" && this.transaction.AMOUNT_ == "0") {
      this.errors.AMOUNT = true;
      this.errors.AMOUNT_ = true;
      return;
    }
    if (this.transaction.AMOUNT_ == "" && this.transaction.AMOUNT == "") {
      this.errors.AMOUNT = true;
      this.errors.AMOUNT_ = true;
      return;
    }
    if (this.transaction.DATE_ADDED == "") {
      this.errors.DATE_ADDED = true;

      return;
    }
    this.doTheTransfer.emit(this.transaction)
    this.transaction = {
      DATE_ADDED: '',
      INTRAFOLIONUMBER: '',
      ACCOUNT_ID: '',
      OTHER_FORM_TYPE: '0',
      LOANS: '',
      INVESTMENTS: '',
      AMOUNT: '',
      AMOUNT_: '',
      NARRATIVE: '',
      ISA: '0'
    }
  }
  changeOtherFormType(event) {
    this.operationsService.getRecords(this.currentUser.token, this.transaction.ACCOUNT_ID.PEOPLE_CUSTOMERS_ID, event)
      .subscribe(options => {
        if (event == '1') {
          this.loans = options
        }
        if (event == '2') {
          this.investments = options
        }
      });
  }
  changeAccountType(event) {
    if (event.ACCOUNT_ID) {
      this.transaction.ISA = '2'
    }
    if (event.PEOPLE_CUSTOMERS_ID) {
      this.transaction.ISA = '1'
    }
  }
}
