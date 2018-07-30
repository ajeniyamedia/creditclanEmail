import { Component, OnInit, OnDestroy, Output, Input, EventEmitter } from '@angular/core';
import { UserService, OperationsService, AuthenticationService, StorageService } from '../_services/index';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit {
  @Input('account_details') account_details: any;
  @Input('ledger') ledger: any;
  @Input('transactions') transactions: any;
  @Output() dateChanged = new EventEmitter();
  ledgers: any;
  loading = false;
  currentUser: any;
  FISCAL_DATE_START = '';
  FISCAL_DATE_END = '';
  TTYPE='0';
  LENDER_ACCOUNT_ID = '';
  exportable = false;
  constructor(public fb: FormBuilder, public operationsService: OperationsService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');

  }

  ngOnInit() {
    this.getStatement();

  }
  exportRecords() {
    this.loading = true;
    this.exportable = false;
    // Send to the server
    this.operationsService.exportRecords(this.currentUser.token, this.account_details, this.FISCAL_DATE_START, this.FISCAL_DATE_END,this.ledgers.contra_charts).subscribe(data => {
      this.loading = false;
      if (data.status) {
        alert("Data Successfully exported. Download would start automatically.");
        window.open(data.message);
        return;
      } else {
        alert("Data could not be exported.");
      }
    });
  }
  getStatement() {
    this.loading = true;
    this.exportable = false;
    this.operationsService.getAccountStatement(this.currentUser.token, this.account_details, this.FISCAL_DATE_START, this.FISCAL_DATE_END, this.TTYPE)
      .subscribe(data => {
        this.loading = false;
        this.ledgers = data;
        this.exportable = true;
      });
  }
  filterRecords() {
    this.getStatement()
  }
}
