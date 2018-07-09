import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Journal } from './journal.interface';
import { Transaction } from '../../../app/transactionform/transaction.interface';
import { DataService } from '../../_services/index';
@Component({
  selector: 'app-newjournal',
  templateUrl: './newjournal.component.html',
  styleUrls: ['./newjournal.component.css']
})
export class NewjournalComponent implements OnInit {
  @Input('com_accounts') com_accounts: any;
  @Input('people_customers') people_customers: any;
  @Input('currentUser') currentUser: any;
  @Input('edit') edit: any;
  @Input('journals') journals: any;
  public journal: Journal;
  updateJournal = false;
  debits = [];
  credits = [];
  issearching = false;
  secOpen = 'total';
  has_error = false;
  isediting = false;
  @Input('loading') loading = false;
  @Output() saveTheJournal = new EventEmitter();
  @Output() approveTheJournal = new EventEmitter();
  @Output() rejectTheJournal = new EventEmitter();
  errors = { DATE_ADDED: false, NARRATION: false }
  constructor(private DataService: DataService) { }

  ngOnInit() {
    this.journal = {
      DATE_ADDED: '',
      NARRATION: '',
      USE_AS_SUB: false,
      JOURNAL_ENTRY_ID: '',
      TOTAL_DEBIT: 0,
      TOTAL_CREDIT: 0
    }
    if (this.edit) {
      this.journal = {
        DATE_ADDED: this.journals.JOURNAL_DATE,
        NARRATION: this.journals.NARRATIVE,
        USE_AS_SUB: this.journals.USE_AS_SUB,
        JOURNAL_ENTRY_ID: this.journals.JOURNAL_ENTRY_ID,
        TOTAL_DEBIT: parseFloat(this.journals.TOTAL_DEBIT),
        TOTAL_CREDIT: parseFloat(this.journals.TOTAL_CREDIT),
      }
      this.debits = this.journals.debits;
      this.credits = this.journals.credits;
      this.calculateJournal();
      this.issearching = true;
      console.log(this.journals)
    }
  }
  saveJournal() {
    //do all validations
    this.errors.DATE_ADDED = false;
    this.has_error = false;
    if (this.journal.DATE_ADDED == '') {
      this.errors.DATE_ADDED = true;
      this.updateJournal = true;
      return
    }
    if (this.journal.NARRATION == '') {
      this.errors.NARRATION = true;
      this.updateJournal = true;
      return
    }
    if (this.journal.TOTAL_DEBIT === 0 && this.journal.TOTAL_CREDIT === 0) {
      this.has_error = true;
      return;
    }
    if (this.journal.TOTAL_DEBIT != this.journal.TOTAL_CREDIT) {
      this.has_error = true;
      return;
    }
    this.saveTheJournal.emit({ 'journal': this.journal, 'debits': this.debits, 'credits': this.credits });
  }
  approveJournal() {
    this.approveTheJournal.emit({ 'journal': this.journal, 'debits': this.debits, 'credits': this.credits });
  }
  rejectJournal() {
    this.rejectTheJournal.emit({ 'journal': this.journal, 'debits': this.debits, 'credits': this.credits });
  }
  doTransfer(event) {
    if (event.AMOUNT == '0') {
      this.credits.push(event);
    }
    if (event.AMOUNT_ == '0') {
      this.debits.push(event)
    }
    this.calculateJournal()
  }
  deleteTransaction(type, i) {
    if (type == '1') {
      this.debits.splice(i, 1)
    }
    if (type == '2') {
      this.credits.splice(i, 1)
    }
    this.calculateJournal()
  }

  calculateJournal() {
    this.journal.TOTAL_CREDIT = 0;
    this.journal.TOTAL_DEBIT = 0;
    let cr = 0;
    let dr = 0;
    this.credits.map(function(element) {
      cr = cr + parseFloat(element["AMOUNT_"]);
      //this.journal.TOTAL_DEBIT=this.journal.TOTAL_DEBIT+parseFloat(element["AMOUNT"]);
    });
    this.debits.map(function(element) {
      //this.journal.TOTAL_CREDIT=this.journal.TOTAL_CREDIT+parseFloat(element["AMOUNT_"]);
      dr = dr + parseFloat(element["AMOUNT"]);
    });
    this.journal.TOTAL_CREDIT = cr;
    this.journal.TOTAL_DEBIT = dr;
  }
}
