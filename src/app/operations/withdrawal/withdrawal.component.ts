import { Component, OnInit, OnDestroy, Output, Input, EventEmitter } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DataService, UserService, OperationsService, AuthenticationService, StorageService, LoansService } from '../../_services/index';
@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css']
})
export class WithdrawalComponent implements OnInit {

  @Input('lender_banks') lender_banks: any;
  @Input('wallet') wallet: any;
  @Input('icon') icon: any;
  @Input('legal_name') legal_name: any;
  @Input('loading') loading = false;
  @Input('withdrawal') withdrawal: any;
  @Input('otpError') otpError = false;
  @Input('otpSent') otpSent = false;
  @Input('otpMessage') otpMessage = '';
  @Input('withdrawalDone') withdrawalDone = false;
  @Input('fundingQueued') fundingQueued = false;
  withdrawalForm: FormGroup;
  @Output() doInitiateFuning = new EventEmitter();
  @Output() confirmWithdrawal = new EventEmitter();
  public currentUser: any;
  public cu = 0;
  constructor(public fb: FormBuilder, public operationsService: OperationsService, public storageService: StorageService) {

    this.withdrawalForm = fb.group({
      'AMOUNT': '',
      'LENDER_BANK_ACCOUNT_ID': [null, Validators.required],
      'SECURITY_QUESTION_ANSWER': '',
      'CHARGES': [75]
    });
    this.currentUser = this.storageService.read<any>('currentUser');
  }

  ngOnInit() {
    this.withdrawalDone = false;
    this.fundingQueued = false;

    this.operationsService.getWalletSummary(this.currentUser.token)
      .subscribe(data => {
        this.cu = data.data.LENDER_WALLET_BALANCE;
        this.otpSent = false;
      });
  }
  doInitiateWithdrawal(value: any): void {
    this.loading = true;
    if (!this.otpSent) {
      this.loading = true;
      this.operationsService.doInitiateWithdrawal(this.currentUser.token, value)
        .subscribe(data => {
          if (data.status == true) {
            this.loading = false;
            this.otpSent = true;
            this.otpMessage = data.data.message
          } else {

          }
        });
    } else {
      this.confirmWithdrawal.emit(value);
    }

  }
  doInit
  charges = 75;
  adjustThecharges(amount) {
    console.log(amount.target.value)
    let charge = parseInt(amount.target.value) / 1000000 < 1 ? 75 : 75 * parseInt(amount.target.value) / 1000000;
    this.charges = charge;
    if (amount.target.value > this.wallet.cu) {
      (<FormControl>this.withdrawalForm.controls['AMOUNT'])
        .setValue(this.wallet.cu, { onlySelf: true });
      let charge = parseInt(this.wallet.cu) / 1000000 < 1 ? 75 : 75 * parseInt(this.wallet.cu) / 1000000;
      this.charges = charge;
    }
  }
}
