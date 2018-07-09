import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { UserService, OperationsService, AuthenticationService, StorageService } from '../_services/index';

@Component({
  selector: 'app-payschedule',
  templateUrl: './payschedule.component.html',
  styleUrls: ['./payschedule.component.css']
})
export class PayscheduleComponent implements OnInit {
  @Input('repayment_schedule_id') repayment_schedule_id: any;
  @Input('record_type') record_type: any;
  @Input('schedule_type') schedule_type: any;
  @Input('index') index: any;
  @Input('repayment') repayment: any;
  @Output() userUpdated = new EventEmitter();
  choosePayment = false;
  currentUser: any;
  public pay_opt = [
    { value: '1', 'display': 'Pay Remaining' },
    { value: '3', 'display': 'Pay Any Amount' }
  ]
  payment = { PAY_WITH: '0', LENDER_ACCOUNT_ID: 0, REQUEST_ID: 0, PAYMENT_DATE: '', AMOUNT_TO_PAY: '', PAYMENT_OPTION: '1' };
  constructor(public fb: FormBuilder, public operationsService: OperationsService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');

  }

  ngOnInit() {
    this.payment.PAYMENT_OPTION = '1';
    this.getRepaymentSchedule();
  }
  getRepaymentSchedule() {
    this.operationsService.getRepaymentSchedule(this.currentUser.token, this.record_type, this.schedule_type, this.repayment_schedule_id)
      .subscribe(data => {

      });
  }
  makepayment() {
    this.userUpdated.emit({ 'payment': this.payment, 'repayment_schedule_id': this.repayment_schedule_id, 'index': this.index });
  }
}
