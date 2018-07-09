import { Component, OnInit, Input } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms'; 
import { UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class Calendar implements OnInit {
  state: any;
  schedule_type = false;
  record_type = '1';
  loading=false;
  public record_types = [
    { value: '1', display: 'Due' },
    { value: '2', display: 'Overdue' }
  ];
  default_date: any;
  currentUser: any;
  magic_filter = { loan_status_active: true, loan_status_closed: false, searchText: '', ratings_one: false, ratings_two: false, ratings_three: false, ratings_four: false, ratings_five: false, funding_amount_one: 1, funding_amount_two: 1, funding_amount_three: false, funding_status_contract_created: false, funding_status_applied: false, funding_status_funded: false, funding_status: false, amount: false, approval_level: false, rating: false, sector: false, date: false };
  calendarOptions: any;
  calendarOptions_: any;
  calendarOptions__: any;
  calendarOptions___: any;
  datechosen: any;
  overlayOpen = false;
  showSwitch = true;
  constructor(public fb: FormBuilder, public operationsService: OperationsService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');

  }
  onChange(event) {
    this.schedule_type = event;
    this.getCurrentRepaymentCalendar();
  }
  reloadrecord(event) {

    this.record_type = event;
    this.getCurrentRepaymentCalendar();
  }
  ngOnInit() {
    this.getCurrentRepaymentCalendar();
    this.calendarOptions = {
      height: '1000',
      fixedWeekCount: false,
      defaultDate: this.default_date,
      editable: true,
      eventLimit: true,
      eventClick: (calEvent, jsEvent, view) => {
        console.log(calEvent)
        this.showdetails(calEvent);
      },
      events: (start, end, timezone, callback) => {
        this.operationsService.getCurrentRepaymentCalendar(this.currentUser.token, '1', false)
          .subscribe(data => {
            this.default_date = data.default_date;
            callback(data.events)
          });

      }
    };
    this.calendarOptions_ = {
      height: '1000',
      fixedWeekCount: false,
      defaultDate: this.default_date,
      editable: true,
      eventLimit: true,
      eventClick: (calEvent, jsEvent, view) => {
        this.showdetails(calEvent);
      },
      events: (start, end, timezone, callback) => {
        this.operationsService.getCurrentRepaymentCalendar(this.currentUser.token, '2', false)
          .subscribe(data => {
            this.default_date = data.default_date;
            callback(data.events)
          });

      }
    };
    this.calendarOptions__ = {
      height: '1000',
      fixedWeekCount: false,
      defaultDate: this.default_date,
      editable: true,
      eventLimit: true,
      eventClick: (calEvent, jsEvent, view) => {
        this.showdetails(calEvent);
      },
      events: (start, end, timezone, callback) => {
        this.operationsService.getCurrentRepaymentCalendar(this.currentUser.token, '1', true)
          .subscribe(data => {
            this.default_date = data.default_date;
            callback(data.events)
          });

      }
    };
    this.calendarOptions___ = {
      height: '1000',
      fixedWeekCount: false,
      defaultDate: this.default_date,
      editable: true,
      eventLimit: true,
      eventClick: (calEvent, jsEvent, view) => {
        this.showdetails(calEvent);
      },
      events: (start, end, timezone, callback) => {
        this.operationsService.getCurrentRepaymentCalendar(this.currentUser.token, '2', true)
          .subscribe(data => {
            this.default_date = data.default_date;
            callback(data.events)
          });

      }
    };
  }
  // ngOnInit() {
  //   this.getCurrentRepaymentCalendar();
  // }
  getCurrentRepaymentCalendar() {
    this.operationsService.getCurrentRepaymentCalendar(this.currentUser.token, this.record_type, this.schedule_type)
      .subscribe(data => {
        this.state = data;
      });
  }
  showdetails(calEvent) {
    this.datechosen = calEvent.start._i;
    this.overlayOpen = true;  
  }
  closeOverlay() {
    this.overlayOpen = false; 
  }
  searchForLoans(){
    
  }
}
