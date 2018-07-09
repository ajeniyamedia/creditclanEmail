import { Component, OnInit, Input } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms'; 
import { UserService, OperationsService, AuthenticationService, StorageService } from '../_services/index';

@Component({
  selector: 'app-calendardetails',
  templateUrl: './calendardetails.component.html',
  styleUrls: ['./calendardetails.component.css']
})
export class CalendardetailsComponent implements OnInit {
  @Input('schedule_type') schedule_type: any;
  @Input('record_type') record_type: any;
  @Input('datechosen') datechosen: any;
  currentUser: any;
  state: any;
  subopen = '0';
  loading = false;
  constructor(public fb: FormBuilder, public operationsService: OperationsService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');

  }
  //data : any;
  ngOnInit() {
    this.getRecords(0); 
  }
  getRecords(start) {
    this.operationsService.getRepaymentsForTheDay(this.currentUser.token, this.record_type, this.schedule_type, this.datechosen, start)
      .subscribe(data => {
        this.state = data; 
      });
  }
  showNext(start) {
    this.getRecords(start)
  }
  openSub(request_id) {
    this.subopen = request_id;
  }
  paymentReceived(event) {
    this.operationsService.makepayment(this.currentUser.token, event)
      .subscribe(data => {

        if (data.stats == '1') {
          this.state.repayments.splice(event.index, 1);
        }
        this.loading = false;
        this.subopen = '0';
      });
  }
  makePayment(REPAYMENT_SCHEDULE_ID, INDEX) {
    this.loading = true
    this.operationsService.makepayment(this.currentUser.token, REPAYMENT_SCHEDULE_ID)
      .subscribe(data => {

        if (data.stats == '1') {
          this.state.repayments.splice(INDEX, 1);
        }
        this.loading = false;
      });
  }
  makeInvPayment(REPAYMENT_SCHEDULE_ID, INDEX) {
    this.loading = true
    this.operationsService.makeinvpayment(this.currentUser.token, REPAYMENT_SCHEDULE_ID)
      .subscribe(data => {

        if (data.stats == '1') {
          this.state.repayments.splice(INDEX, 1);
        }
        this.loading = false;
      });
  }
}
