import { Component, OnInit } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms'; 
import { UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../_services/customers.service';
import { DataService } from '../../_services/index';
@Component({
  selector: 'app-customer-schedule',
  templateUrl: './customer-schedule.component.html',
  styleUrls: ['./customer-schedule.component.css']
})

export class CustomerScheduleComponent implements OnInit {

  loans = [];
  resp = {};
  sub; // Instance of the route subscription
  userType;
  userId;
  schedule_type = false;
  record_type = '1';
  state: any;
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
  constructor(public route: ActivatedRoute,
    public DataService: DataService,
    protected customersSrvc: CustomersService,
    public fb: FormBuilder,
    public operationsService: OperationsService,
    public storageService: StorageService ) {
    this.currentUser = this.storageService.read<any>('currentUser');

  }

  onChange(event) {
    this.schedule_type = event;
    this.getCurrentRepaymentCalendar();
  }
  reloadrecord(event) {
    this.record_type = event.target.value;
    this.getCurrentRepaymentCalendar();
  }
  ngOnInit() {
    this.sub = this.route.parent.params.subscribe(params => {
      this.userType = params["type"];
      this.userId = params["id"];

    });
    this.getCurrentRepaymentCalendar();
    this.calendarOptions = {
      height: '1000',
      fixedWeekCount: false,
      defaultDate: this.default_date,
      editable: true,
      eventLimit: true,
      eventClick: (calEvent, jsEvent, view) => {
        this.showdetails(calEvent);
      },
      events: (start, end, timezone, callback) => {
        this.operationsService.getCustomerCurrentRepaymentCalendar(this.currentUser.token, '1', false, this.userId)
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
        this.operationsService.getCustomerCurrentRepaymentCalendar(this.currentUser.token, '2', false, this.userId)
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
        this.operationsService.getCustomerCurrentRepaymentCalendar(this.currentUser.token, '1', true, this.userId)
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
        this.operationsService.getCustomerCurrentRepaymentCalendar(this.currentUser.token, '2', true, this.userId)
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
    this.operationsService.getCustomerCurrentRepaymentCalendar(this.currentUser.token, this.record_type, this.schedule_type, this.userId)
      .subscribe(data => {
        this.state = data;
        this.DataService.onScheduleNav.emit({ 'state': data, 'record_type': this.record_type, 'schedule_type': this.schedule_type, 'record_types': this.record_types, "location": "schedule" });
      });
  }
  showdetails(calEvent) {
    this.datechosen = calEvent.start._i;
    this.overlayOpen = true;
  }
  closeOverlay() {
    this.overlayOpen = false;
    console.log(1)
  }
}
