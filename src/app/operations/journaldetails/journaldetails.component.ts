import { Component, OnInit, OnDestroy, EventEmitter, ViewContainerRef, ViewEncapsulation, Output, Input, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OptionsserviceService, UserService, CustomerService, AuthenticationService, StorageService, LoansService, OperationsService } from '../../_services/index';
import { Customer, Loan } from '../../_models/index'; 
import { MomentModule } from 'angular2-moment';
import { FormBuilder, FormGroup, FormControl, FormsModule, Validators } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { IMyDpOptions } from 'mydatepicker';
import { IMyDateModel, IMyInputFieldChanged, IMyCalendarViewChanged, IMyInputFocusBlur, IMyMarkedDate, IMyDate, IMySelector } from 'mydatepicker';

@Component({
  selector: 'app-journaldetails',
  templateUrl: './journaldetails.component.html',
  styleUrls: ['./journaldetails.component.css']
})
export class JournaldetailsComponent implements OnInit {
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    height: '34px',
    width: '210px',
    dateFormat: 'yyyy-mm-dd',
    openSelectorTopOfInput: false,
  };
  public newJournalEntry = false;
  public sub: any;
  public currentUser: any;
  public journal: any;
  public journal_ = { JOURNAL_ENTRY_ID: '' }
  public parentRouteId: any;
  searchForm: FormGroup;
  public searchingForJournal = false;
  public selDate: IMyDate = { year: 0, month: 0, day: 0 };
  public debit_list = [];
  public credit_list = [];
  public debit_total = 0;
  public credit_total = 0;
  public record: any;
  public loans = [];
  public com_accounts = [];
  public people_customers = [];
  public investments = [];
  constructor(public fb: FormBuilder, public operationsService: OperationsService, public optionsService: OptionsserviceService, public route: ActivatedRoute, 
    public loansService: LoansService, public customerService: CustomerService, public userService: UserService, 
    public storageService: StorageService) {

    this.searchForm = fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'fsno': [null, Validators.required],
    })

  }
  editRecord(record, type) {

  }
  deleteRecord(record, type) {

  }
  addDebitRecord(type) {

  }
  ngOnInit() { 
    this.currentUser = this.storageService.read<any>('currentUser');
    this.sub = this.route.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      this.operationsService.getSingleJournal(this.currentUser.token, this.parentRouteId)
        .subscribe(journal => {
          this.journal = journal.journals[0];
          this.journal_.JOURNAL_ENTRY_ID = this.journal.JOURNAL_ENTRY_ID; 
          this.debit_list = journal.journal.debit;
          this.credit_list = journal.journal.credit;
          this.debit_total = journal.debit_total;
          this.credit_total = journal.credit_total;
          let d: Date = new Date(journal.journals[0].JOURNAL_DATE);
          console.log(d.getFullYear())
          this.selDate = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
          };
        });
    });
  }
  searchFormJournal(value: any): void {
 
    this.currentUser = this.storageService.read<any>('currentUser');
    this.operationsService.getSingleJournal(this.currentUser.token, value.fsno)
      .subscribe(journal => {
        this.journal = journal.journals[0];
        this.journal_.JOURNAL_ENTRY_ID = this.journal.JOURNAL_ENTRY_ID; 
        this.debit_list = journal.journal.debit;
        this.credit_list = journal.journal.credit;
        this.debit_total = journal.debit_total;
        this.credit_total = journal.credit_total;
        let d: Date = new Date(journal.journals[0].JOURNAL_DATE);
        console.log(d.getFullYear())
        this.selDate = {
          year: d.getFullYear(),
          month: d.getMonth() + 1,
          day: d.getDate()
        };
      });
  }
  reOpenJournal() {

  }
  approveJournal() {

  }
  rejectJournal() {

  }
  saveJournal() {

  }
  addCreditRecord(a) { }
}
