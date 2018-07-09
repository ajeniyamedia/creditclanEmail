import { Component, OnInit } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { IMyDpOptions } from 'mydatepicker';
import { IMyDateModel, IMyInputFieldChanged, IMyCalendarViewChanged, IMyInputFocusBlur, IMyMarkedDate, IMyDate, IMySelector } from 'mydatepicker';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {
  state={
    complete:false
  }
  public currentUser: any;
  public preloading = true;
  public loading = false;
  public journals = [];
  public bulkApproveClick = false;
  public bulkDeleteClick = false;
  searchForm: FormGroup;
  searchForm_: FormGroup;
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    height: '34px',
    width: '210px',
    dateFormat: 'yyyy-mm-dd',
    openSelectorTopOfInput: false,
  };
  public COUNTAB = 0;
  public index = 0;
  public prev = 0;
  public next = 0;
  public current = 0;
  edit = false;
  journal: any;
  overlayWithdrawal = false;
  issearching = false;
  com_accounts: any;
  people_customers: any;
  constructor(public fb: FormBuilder, public operationsService: OperationsService, 
    public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.operationsService.getOptions(this.currentUser.token)
      .subscribe(options => {
        this.com_accounts = options.com_accounts;
        this.people_customers = options.people_customers;
      });
    this.searchForm = fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'BATCH_ID': [null, Validators.required],
      'index': '',
      'prev': '',
      'current': '',
      'next': ''
    })
    this.searchForm_ = fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'START_DATE': [null, Validators.required],
      'END_DATE': [null, Validators.required],
      'SOURCE': [null, Validators.required],
      'index': '',
      'prev': '',
      'current': '',
      'next': ''
    })

  }
  getJournals() {
    this.operationsService.getJournals(this.currentUser.token)
      .subscribe(journals => { 
        this.journals = journals.journals['a'];
        this.COUNTAB = journals.journals['b'].COUNTAB;
        this.preloading = false;
        this.index = journals.index;
        this.prev = journals.prev;
        this.next = journals.next;
        this.current = journals.next;
        (<FormControl>this.searchForm.controls['index'])
          .setValue(journals.index, { onlySelf: true });
        (<FormControl>this.searchForm.controls['next'])
          .setValue(journals.next, { onlySelf: true });
        (<FormControl>this.searchForm.controls['prev'])
          .setValue(journals.prev, { onlySelf: true });
        (<FormControl>this.searchForm.controls['current'])
          .setValue(journals.current, { onlySelf: true });
        (<FormControl>this.searchForm_.controls['index'])
          .setValue(journals.index, { onlySelf: true });
        (<FormControl>this.searchForm_.controls['next'])
          .setValue(journals.next, { onlySelf: true });
        (<FormControl>this.searchForm_.controls['prev'])
          .setValue(journals.prev, { onlySelf: true });
        (<FormControl>this.searchForm_.controls['current'])
          .setValue(journals.current, { onlySelf: true });
      });
  }
  ngOnInit() {
    this.getJournals();

  } 
  searchJournal(value: any): void {
    this.loading = true; 
    this.operationsService.searchJournal(this.currentUser.token, value)
      .subscribe(journals => {
        this.loading = false; 
        this.journals = journals.journals['a'];
        this.preloading = false;
        this.index = 1;
        this.prev = 0;
        this.next = 20;
        this.current = 20;
        this.COUNTAB = journals.COUNTAB;
      });
  }
  searchJournal_(value: any): void {
    this.loading = true; 
    this.operationsService.searchJournal_(this.currentUser.token, value)
      .subscribe(journals => {
        this.loading = false; 
        this.journals = journals.journals['a'];
        this.preloading = false;
        this.index = 1;
        this.prev = 0;
        this.next = 20;
        this.current = 20;
        this.COUNTAB = journals.COUNTAB;
      });
  }
  nextRecords() {
    this.loading = true; 
    this.operationsService.nextGLAccL(this.currentUser.token, this.next, this.prev, this.index, this.searchForm.value, this.searchForm_.value)
      .subscribe(journals => {
        this.loading = false; 
        this.journals = journals.journals['a'];
        this.COUNTAB = journals.journals['b'].COUNTAB;
        this.preloading = false;
        this.index = journals.index;
        this.prev = journals.prev;
        this.next = journals.next;
        this.current = journals.next;
      });
  }
  prevRecords() {
    this.loading = true; 
    this.operationsService.prevGLAccL(this.currentUser.token, this.next, this.prev, this.index, this.searchForm.value, this.searchForm_.value)
      .subscribe(journals => {
        this.loading = false; 
        this.journals = journals.journals['a'];
        this.COUNTAB = journals.journals['b'].COUNTAB;
        this.preloading = false;
        this.index = journals.index;
        this.prev = journals.prev;
        this.next = journals.next;
        this.current = journals.next;
      });
  }
  saveJournal(event) {
    this.loading = true;
    this.operationsService.saveJournal(this.currentUser.token, event, this.edit)
      .subscribe(journals => {
        this.loading = false;
        this.overlayWithdrawal = false;
        this.getJournals();
      });
  }
  approveJournal(event) {
    this.loading = true;
    this.operationsService.approveJournal(this.currentUser.token, event, this.edit)
      .subscribe(journals => {
        this.loading = false;
        this.overlayWithdrawal = false;
        this.getJournals();
      });
  }
  rejectJournal(event) {
    this.loading = true;
    this.operationsService.rejectJournal(this.currentUser.token, event, this.edit)
      .subscribe(journals => {
        this.loading = false;
        this.overlayWithdrawal = false;
        this.getJournals();
      });
  }
  updateJournal(journal) {
    this.edit = true;
    this.journal = journal;
    this.overlayWithdrawal = true;
  }
  newJournal() {
    this.overlayWithdrawal = true
    this.journal = [];
    this.edit = false;
    this.loading = false;
  }
}
