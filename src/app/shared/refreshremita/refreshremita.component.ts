import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService, UserService, OperationsService, AuthenticationService, StorageService, LoansService } from '../../_services/index';
import { FormArray, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-refreshremita',
  templateUrl: './refreshremita.component.html',
  styleUrls: ['./refreshremita.component.css']
})
export class RefreshremitaComponent implements OnInit {

  @Input('remita_records') remita_records: any;
  @Input('currentUser') currentUser: any;
  @Input('loan') loan: any = {
    PEOPLE_ID: ''
  };
  loading = false;
  change_payment_form = {
    SECURITY_QUESTION_ANSWER: '',
    REQUEST_ID: '',
    REPAYMENT_MODE: '',
    PEOPLE_ID: ''
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
    //this.change_payment_form.PEOPLE_ID = this.loan.PEOPLE_ID;
  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }

  sendRemitaaRefreshNotification(value, valid) {
    this.loading = true;
    this.operationsService.refresh_remita_details(this.currentUser.token, value, this.remita_records, this.loan)
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
