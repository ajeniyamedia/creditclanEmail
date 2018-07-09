import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { OptionsserviceService, LoansService, StorageService } from '../_services/index'; 
import { Loan } from '../_interfaces/loan.interface';
import { Loan_ } from '../_models/loan_';

@Component({
  selector: 'app-loancharges',
  templateUrl: './loancharges.component.html',
  styleUrls: ['./loancharges.component.css']
})
export class LoanchargesComponent implements OnInit {

  @Input('loan') masterLoan: any;
  @Input('allfeesqueue') fees_queue: any;
  @Input('allchargesqueue') charges_queue: any;
  @Input('fees') fees: any;
  @Input('charges') charges: any;
  public currentUser: any;
  @Input('paidfeesandcharges') PAID_FEES_AND_CHARGES: any;
  public lists: any;
  public editFee = false;
  public fee: any;
  @Input('interestAlone') isInterestAlone: any;
  @Input('formValues') formVals: any;
  @Input('totalsecuritydeposit') totalsecuritydeposit: any;
  public newFee = false;
  public INCLUDED_FEE = true;
  constructor(public storageService: StorageService, 
    public optionsService: OptionsserviceService, public loansService: LoansService) {


  }
  closeFee() {
    this.editFee = false;
    this.newFee = false;
  }
  addNewFee() {
    this.fee = { 'PERCENTAGE_ON': 0, 'IS_TAXABLE': 0, 'TAX_PERCENTAGE': 0, 'WAIVE': 0, 'CHARGE_ID': 0, 'HOW_CALCULATED': 0, 'CHARGE_PAYMENT_TYPE': 0, 'CHARGE_VALUE': 0, 'PERIODIC_CHARGE': 0, };
    this.editFee = true;
    this.newFee = true;
  }
  saveNewFee() {
    this.recomputeFee();
    this.charges.push(this.fee);
    this.fee = {};
    this.recomputeTotal();
    this.editFee = false;

  }
  onIncludedChanged(event, index) {
    if (event.target.checked) {
      this.charges[index].WAIVE = 0;
    } else {
      this.charges[index].WAIVE = 1;
    }
    this.recomputeTotal();
  }
  onHowCalculatedChanged(event) {
    this.fee.HOW_CALCULATED = event;
    this.recomputeFee();
  }
  onChargePaymentTypeChanged(event) {
    this.fee.CHARGE_PAYMENT_TYPE = event;
    this.recomputeFee();
  }
  onChargeValueChanged(event) {
    this.fee.CHARGE_VALUE = event;
    this.recomputeFee();
  }
  onPeriodicFeeChanged(event) {
    this.fee.PERIODIC_CHARGE = event;
    this.recomputeFee();
  }
  onPercentageOnChanged(event) {
    this.fee.PERCENTAGE_ON = event;
    this.recomputeFee();
  }
  onIsTaxableChanged(event) {
    this.fee.IS_TAXABLE = event;
    this.recomputeFee();
  }
  onTaxPercentageChanged(event) {
    this.fee.TAX_PERCENTAGE = event;
    this.recomputeFee();
  }
  recomputeAllFees_() {
    console.log(this.charges)
    for (var fee of this.charges) {
      this.fee = fee;
      if (this.fee.HOW_CALCULATED == '3') {

        this.fee.AMOUNT_FOR_LOAN = 0;
        this.fee.AMOUNT_FOR_LOAN_TAX = 0;
        this.recomputeTotal();
      } else {
        if (this.fee.CHARGE_PAYMENT_TYPE == '1') {
          this.fee.AMOUNT_FOR_LOAN = Number(this.fee.CHARGE_VALUE);
          if (this.fee.IS_TAXABLE) {
            this.fee.AMOUNT_FOR_LOAN_TAX = (this.fee.TAX_PERCENTAGE / 100) * this.fee.AMOUNT_FOR_LOAN;
          } else {
            this.fee.AMOUNT_FOR_LOAN_TAX = 0;
          }
        } else {

          let amount = (this.fee.CHARGE_VALUE / 100) * (this.formVals.REQUEST_PRINCIPAL - this.formVals.TOTAL_SECURITY_DEPOSIT);

          this.fee.AMOUNT_FOR_LOAN = amount;
          if (this.fee.IS_TAXABLE) {
            this.fee.AMOUNT_FOR_LOAN_TAX = (this.fee.TAX_PERCENTAGE / 100) * amount;
          } else {
            this.fee.AMOUNT_FOR_LOAN_TAX = 0;
          }
        }
        this.recomputeTotal();
      }

    }
  }
  recomputeAllFees() {
    for (var fee of this.charges_queue.CHARGES_QUEUE) {
      if (this.fee.HOW_CALCULATED == '3') {

        this.fee.AMOUNT_FOR_LOAN = 0;
        this.fee.AMOUNT_FOR_LOAN_TAX = 0;
        this.recomputeTotal();
      } else {
        if (this.fee.CHARGE_PAYMENT_TYPE == '1') {
          this.fee.AMOUNT_FOR_LOAN = Number(this.fee.CHARGE_VALUE);
          if (this.fee.IS_TAXABLE) {
            this.fee.AMOUNT_FOR_LOAN_TAX = (this.fee.TAX_PERCENTAGE / 100) * this.fee.AMOUNT_FOR_LOAN;
          } else {
            this.fee.AMOUNT_FOR_LOAN_TAX = 0;
          }
        } else {

          let amount = (this.fee.CHARGE_VALUE / 100) * (this.formVals.REQUEST_PRINCIPAL - this.formVals.TOTAL_SECURITY_DEPOSIT);

          this.fee.AMOUNT_FOR_LOAN = amount;
          if (this.fee.IS_TAXABLE) {
            this.fee.AMOUNT_FOR_LOAN_TAX = (this.fee.TAX_PERCENTAGE / 100) * amount;
          } else {
            this.fee.AMOUNT_FOR_LOAN_TAX = 0;
          }
        }
        this.recomputeTotal();
      }

    }
  }
  recomputeFee() {

    if (this.fee.HOW_CALCULATED == '3') {

      this.fee.AMOUNT_FOR_LOAN = 0;
      this.fee.AMOUNT_FOR_LOAN_TAX = 0;
      this.recomputeTotal();
    } else {
      if (this.fee.CHARGE_PAYMENT_TYPE == '1') {
        this.fee.AMOUNT_FOR_LOAN = Number(this.fee.CHARGE_VALUE);
        if (this.fee.IS_TAXABLE) {
          this.fee.AMOUNT_FOR_LOAN_TAX = (this.fee.TAX_PERCENTAGE / 100) * this.fee.AMOUNT_FOR_LOAN;
        } else {
          this.fee.AMOUNT_FOR_LOAN_TAX = 0;
        }
      } else {

        let amount = (this.fee.CHARGE_VALUE / 100) * (this.formVals.REQUEST_PRINCIPAL - this.formVals.TOTAL_SECURITY_DEPOSIT);
        this.fee.AMOUNT_FOR_LOAN = amount;
        if (this.fee.IS_TAXABLE) {
          this.fee.AMOUNT_FOR_LOAN_TAX = (this.fee.TAX_PERCENTAGE / 100) * amount;
        } else {
          this.fee.AMOUNT_FOR_LOAN_TAX = 0;
        }
      }
      this.recomputeTotal();
    }

  }
  recomputeTotal() {
    let total_fees = 0;
    let vat_on_fees = 0;
    this.charges_queue.CHARGES_QUEUE = this.charges;
    for (var fee of this.charges_queue.CHARGES_QUEUE) {
      if (fee.WAIVE === 0 && fee.HOW_CALCULATED != 5) {
        total_fees += Number(fee.AMOUNT_FOR_LOAN);
        vat_on_fees += Number(fee.AMOUNT_FOR_LOAN_TAX);
      }

    }
    this.charges_queue.total_charges = total_fees;
    this.charges_queue.vat_on_charges = vat_on_fees;
  }
  onFeeEdit(fee) {
    this.fee = fee;
    this.editFee = true;

  }
  ngOnInit() {

    this.currentUser = this.storageService.read<any>('currentUser');
    this.optionsService.getFeesLists(0).subscribe(lists => {
      this.lists = lists;

    });
    // this.loansService.getLoanFeesAndCharges(this.currentUser.token,this.masterLoan.REQUEST_ID)
    //          .subscribe(loan => {

    //         if(loan.ALL_FEES_AND_CHARGES_PAID!='1'){
    //         		this.PAID_FEES_AND_CHARGES=loan.FEES_QUEUE.total_charges+loan.FEES_QUEUE.vat_on_fees
    //         		+loan.CHARGES_QUEUE.total_charges+loan.CHARGES_QUEUE.vat_on_charges+Number(loan.UPFRONTED_FEES); 
    //         }else{
    //         		this.PAID_FEES_AND_CHARGES=loan.PAID_FEES_AND_CHARGES; 
    //         }

    //         this.fees = loan.FEES_QUEUE.charges; 
    //         this.charges = loan.CHARGES_QUEUE.charges;
    //         this.fees_queue = loan.FEES_QUEUE;
    //         this.charges_queue= loan.CHARGES_QUEUE;

    //  }); 
  }

}
