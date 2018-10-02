import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService, UserService, OperationsService, AuthenticationService, StorageService, LoansService } from '../../_services/index';
import { FormArray, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notifyremita',
  templateUrl: './notifyremita.component.html',
  styleUrls: ['./notifyremita.component.css']
})
export class NotifyremitaComponent implements OnInit {

  @Input('loan') loan: any;
  @Input('currentUser') currentUser: any;
  loading = false;
  change_payment_form = {
    SECURITY_QUESTION_ANSWER: '',
    REQUEST_ID: '',
    REPAYMENT_MODE: ''
  };
  mode_of_repayment = [
    { 'value': '1', 'display': 'Remita Inflight' },
    { 'value': '2', 'display': 'Cards' },
    { 'value': '3', 'display': 'Direct Debit Mandate' },
    { 'value': '5', 'display': 'Cheques' },
    { 'value': '4', 'display': 'Others' }
  ]
  constructor(public toastr: ToastrService, public loansService: LoansService,
    public fb: FormBuilder, public operationsService: OperationsService, public storageService: StorageService) {

  }

  ngOnInit() {
    console.log(this.loan)
    this.change_payment_form.REQUEST_ID = this.loan.REQUEST_ID;
    this.change_payment_form.REPAYMENT_MODE = this.loan.REPAYMENT_MODE;
  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }

  sendRemitaaNotification(value, valid) {

    this.loading = true;
    this.operationsService.notifyRemitaOfLoan(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === true) {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }

}
