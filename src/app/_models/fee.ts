export class Fee {

  AMOUNT_FOR_LOAN: any;
  //AMOUNT_FOR_LOAN_TAX:any;
  CHARGE_ID: any;
  // CHARGE_PAYMENT_TYPE:any;
  // CHARGE_VALUE:any;
  // GL_ACCOUNT_ID:any;
  // HOW_CALCULATED:any;
  // IS_TAXABLE:any;
  // PERCENTAGE_ON:any;
  // PERIODIC_CHARGE:any;
  // PERIODIC_CHARGE_FREQUENCY:any;
  // PERIODIC_CHARGE_ID:any;
  // TAX_PERCENTAGE:any;

  constructor(feeInfo: any) {
    this.CHARGE_ID = feeInfo.CHARGE_ID;
    this.AMOUNT_FOR_LOAN = this.calculateAmountForLoan(this.CHARGE_ID);
  }

  calculateAmountForLoan(CHARGE_ID) {
    return CHARGE_ID;
  }
}
