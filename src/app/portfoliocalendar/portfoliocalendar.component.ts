import { Component, OnInit, Input } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms'; 
import { UserService,DataService, OperationsService, AuthenticationService, StorageService } from '../_services/index';

@Component({
  selector: 'app-portfoliocalendar',
  templateUrl: './portfoliocalendar.component.html',
  styleUrls: ['./portfoliocalendar.component.css']
})
export class PortfoliocalendarComponent implements OnInit {

  state: any;
  schedule_type = false;
  record_type = '1';
  
  default_date: any;
  currentUser: any;
  
  calendarOptions: any;
  
  datechosen: any;
  overlayOpen = false;
  showSwitch = true;
  constructor(public dataService:DataService,public fb: FormBuilder, public operationsService: OperationsService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');

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
    
  }

  getCurrentRepaymentCalendar() {
    this.operationsService.getCurrentRepaymentCalendar(this.currentUser.token, this.record_type, this.schedule_type)
      .subscribe(data => {
        this.state = data;
        this.default_date = data.default_date;
      });
  }
  showdetails(calEvent) {
    this.datechosen = calEvent.start._i;
    //this.overlayOpen = true;
    this.dataService.showCalendarDetails.emit({date_chosen:this.datechosen});
  }
  closeOverlay() {
    this.overlayOpen = false;
    console.log(1)
  }

}
