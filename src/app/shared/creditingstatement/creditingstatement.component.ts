import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService, UserService, OperationsService, AuthenticationService, StorageService, LoansService } from '../../_services/index';
import { FormArray, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-creditingstatement',
  templateUrl: './creditingstatement.component.html',
  styleUrls: ['./creditingstatement.component.css']
})
export class CreditingstatementComponent implements OnInit {

  @Input('loan') loan: any;
  @Input('currentUser') currentUser: any;
  loading = false;
  @Input('ttype') ttype:any;
  change_payment_form = {
    SECURITY_QUESTION_ANSWER: '',
    REQUEST_ID: '',
    BANK_ID: '',
    PAYMENT_DATE: '',
    AMOUNT_PAID: '',
    NARRATION:''
  };
  banks: any;
  constructor(public toastr: ToastrService, public loansService: LoansService,
    public fb: FormBuilder, public operationsService: OperationsService, public storageService: StorageService) {

  }
  getBanks() {
    this.operationsService.getBanks(this.currentUser.token)
      .subscribe(banks => {
        this.banks = banks.banks;
      });
  }
  ngOnInit() {
console.log(this.ttype)
    this.getBanks();
    this.change_payment_form.REQUEST_ID = this.loan.REQUEST_ID;

  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }

  creditTheStatement(value, valid) {

    this.loading = true;
    this.operationsService.creditTheStatement(this.currentUser.token, value, this.ttype)
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
