import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService, UserService, OperationsService, AuthenticationService, StorageService, LoansService } from '../../_services/index';
import { FormArray, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SavingsService } from '../../_services/savings.service';

@Component({
  selector: 'app-postsavings',
  templateUrl: './postsavings.component.html',
  styleUrls: ['./postsavings.component.css']
})
export class PostsavingsComponent implements OnInit {
  loading = false;
  savings: any;
  paymentHasBeenProcessed = false;
  result: any;
  public banks = [];
  @Input('security_question') security_question: any;
  @Input('request_id') request_id: any;
  @Output() requestPosted = new EventEmitter();
  postSavingsForm: FormGroup;
  currentUser: any;
  otpError = false;
  constructor(public savingsService:SavingsService, public toastr: ToastrService, 
    private dataService: DataService, public loansService: LoansService,
    public fb: FormBuilder, public operationsService: OperationsService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');


    this.postSavingsForm = fb.group({
      'LENDER_BANK_ACCOUNT_ID': [null, Validators.required],
      'SECURITY_QUESTION_ANSWER': [null, Validators.required],
    });

  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }
  ngOnInit() {
    this.getBanks();
    this.getSavings();
  }
  getBanks() {
    this.operationsService.getBanks(this.currentUser.token)
      .subscribe(banks => {
        this.banks = banks.banks;
      });
  }
  getSavings() {
    this.savingsService.getSavings(this.currentUser.token, this.request_id)
      .subscribe(data => {
        this.savings = data.savings;
        (<FormControl>this.postSavingsForm.controls['SAVINGS_ID'])
        .setValue(data.savings.SAVINGS_ID, { onlySelf: true });

      (<FormControl>this.postSavingsForm.controls['REPAYMPEOPLE_IDENT_MODE'])
        .setValue(data.savings.PEOPLE_ID, { onlySelf: true });
      });
  }
  doPostSavings(value: any): void {
    this.loading = true;
    this.paymentHasBeenProcessed = false;
    this.savingsService.postSavings(this.currentUser.token, this.request_id, value)
        .subscribe(data => {
          if(data.status == true){
            this.result = data;
            this.paymentHasBeenProcessed = true;
            this.dataService.onSavingsPosted.emit({savings:data.savings});
          }else{
            this.paymentHasBeenProcessed = false;
            this.loading = false;
            this.showError("Unable to process request");
          }
        });
  }
  paymentProcessDone(){
    this.requestPosted.emit({ savings_id: this.request_id })
  }
}
