import { Component, OnInit, OnDestroy, EventEmitter, ViewContainerRef, ViewEncapsulation, Output, Input, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, OptionsserviceService, UserService, CustomerService, AuthenticationService, StorageService, LoansService } from '../_services/index';
import { Customer, Loan } from '../_models/index'; 
import { MomentModule } from 'angular2-moment';
import { Router } from '@angular/router';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-paymentrollback',
  templateUrl: './paymentrollback.component.html',
  styleUrls: ['./paymentrollback.component.css']
})
export class PaymentrollbackComponent implements OnInit {
  @Input('trans') trans: any; 
  @Input('loan') loan: any; 
  @Output() modalClosed = new EventEmitter();
  currentUser: any;
  transaction: any;
  current_step = 'setup';
  payment_done = false;
  loading = false;
  public pay_opt = [
    { value: '1' },
    { value: '2' },
    { value: '3' }
  ]
  result:any;
  payment = { REMARKS:'',PAY_WITH: '0', LENDER_ACCOUNT_ID: 0, CHART_ACCOUNT_TRANSACTION_ID: 0, PAYMENT_DATE: '', AMOUNT_TO_PAY: '0', PAYMENT_OPTION: '1' };
  constructor(private DataService: DataService,public toastr: ToastrService, vcr: ViewContainerRef, public optionsService: OptionsserviceService, public fb: FormBuilder, 
    public loansService: LoansService, public storageService: StorageService ) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.optionsService.getDefaultBank(this.currentUser.token).subscribe(bank => {
      
    }); 
  }

  ngOnInit() {
    console.log(this.loan)
  }
  closeOverlay(){
    this.modalClosed.emit()
  }
  initiateRollback(){

  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }
  sendRollbackPayment() {
    //this.current_step = "sending_payment"
    this.loading = true;
    this.loansService.rollbackpayment(this.currentUser.token, this.payment,this.trans)
      .subscribe(result => {
        this.result = result;
        if(result.status==false){
          this.showError(result.data.message)
        }else{
          this.payment_done = true;
          this.current_step = "done"
          this.loading = false;
        }
      });
  }
}
