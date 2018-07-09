import { Component, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { DataService, OptionsserviceService, LoansService, StorageService } from '../_services/index';
import { Loan } from '../_interfaces/loan.interface';
import { Loan_ } from '../_models/loan_';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loananalysis',
  templateUrl: './loananalysis.component.html',
  styleUrls: ['./loananalysis.component.css']
})
export class LoananalysisComponent implements OnInit {

  view = 'main';
  public loading = false;
  public analysis: any;
  @Input('parentRouteId') parentRouteId: number;
  @Input('sub') sub: any;
  @Input('sub_summary') sub_summary: any;
  public currentUser: any;
  public yesno = [
    { value: '0', display: 'No' },
    { value: '1', display: 'Yes' }
  ];
  public strengths = [
    { value: '0', display: 'Low' },
    { value: '1', display: 'Medium' },
    { value: '2', display: 'High' }
  ];
  public loan_currency = "NGN";
  public countries: any;
  public loan_durations = [{ "LOAN_INTEREST_DURATION_ID": 1, "LOAN_DURATION": "Days", "INTEREST_DURATION": "Per Day", "ADJECTIVAL": "Daily", "ABBREV": "d" },
  { "LOAN_INTEREST_DURATION_ID": 2, "LOAN_DURATION": "Months", "INTEREST_DURATION": "Per Month", "ADJECTIVAL": "Monthly", "ABBREV": "Mo" },
  { "LOAN_INTEREST_DURATION_ID": 3, "LOAN_DURATION": "Years", "INTEREST_DURATION": "Per Year", "ADJECTIVAL": "Yearly", "ABBREV": "Yr" },
  { "LOAN_INTEREST_DURATION_ID": 4, "LOAN_DURATION": "Weeks", "INTEREST_DURATION": "Per Week", "ADJECTIVAL": "Weekly", "ABBREV": "Wk" }]
  ;
  public interest_duration = "Per Month";
  public insurance_firms: any;
  analysis_form = {
    is_guarantor_provided: this.yesno[0].value,
    no_of_guarantors: 0,
    strength: 0,
    is_collateral_provided: this.yesno[0].value,
    collateral_liquidity_strength: this.strengths[0].value,
    collat_current_value: 0,
    collat_liquidity_validy: 0,
    insurance_firm_id: 0,
    cash_flow: 0,
    income_cover_rating: 0,
    percent_dispose_income: 0,
    analyst_remark: this.strengths[0].value,
    recommended_interest_rate: 0,
    recommended_interest_rate_period_id: 2,
    recommended_principal: 0,
    credit_score:0,
    is_guarantor_verified: this.yesno[0].value,
    is_address_verified: this.yesno[0].value,
    is_salary_verified: this.yesno[0].value,
    is_work_details_verified:this.yesno[0].value,
  }
  constructor(private DataService: DataService, public route: ActivatedRoute, public storageService: StorageService, 
    public optionsService: OptionsserviceService, public loansService: LoansService) {

    this.optionsService.getCountries().subscribe(countries => this.countries = countries);

  }
  ngOnInit() {
    this.loanAnalysis();
  }
  changeCurrency(c) {
    this.loan_currency = c.currency[0];

  }


  changeDuration(d, T) {

    if (T === 2) {
      this.interest_duration = this.loan_durations[d]["INTEREST_DURATION"];
      this.analysis_form.recommended_interest_rate_period_id = this.loan_durations[d]["LOAN_INTEREST_DURATION_ID"];

    }

  }
  loanAnalysis() {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      this.loansService.getLoanAnalysis(this.currentUser.token, this.parentRouteId, '')
        .subscribe(analysis => {
          this.analysis = analysis
          this.insurance_firms = analysis.insurance_firms;
          this.analysis_form.is_guarantor_provided = analysis.guarantors.IS_PROVIDED
          
          this.analysis_form.no_of_guarantors = analysis.guarantors.HOW_MANY
          this.analysis_form.strength = analysis.guarantors.STRENGTH
          this.analysis_form.is_collateral_provided = analysis.collaterals.IS_PROVIDED
          this.analysis_form.collateral_liquidity_strength = analysis.collaterals.LIQUIDATE_STRENGTH
          this.analysis_form.collat_current_value = analysis.collaterals.TOTAL_COLLATERAL_CURRENT_VALUE
          this.analysis_form.collat_liquidity_validy = analysis.collaterals.TOTAL_COLLATERAL_EST_LIQUIDATION_VALUE
          this.analysis_form.insurance_firm_id = analysis.INSURANCE_FIRM_ID
          this.analysis_form.cash_flow = analysis.CASHFLOW_ANALYSIS_DONE
          this.analysis_form.income_cover_rating = analysis.INCOME_COVER_RATING
          this.analysis_form.percent_dispose_income = analysis.PERCENT_OF_DISPOSE_INCOME
          this.analysis_form.analyst_remark = analysis.ANALYST_REMARK
          this.analysis_form.recommended_interest_rate = analysis.RECOMMENDED_INTEREST_RATE
          this.analysis_form.recommended_interest_rate_period_id = analysis.RECOMMENDED_INTEREST_RATE_PERIOD_ID
          this.analysis_form.recommended_principal = analysis.RECOMMENDED_PRINCIPAL
          this.analysis_form.credit_score = analysis.CREDIT_SCORE

          this.analysis_form.is_guarantor_verified = analysis.IS_GUARANTOR_VERIFIED
          this.analysis_form.is_address_verified = analysis.HAS_VERIFIED_ADDRESS
          this.analysis_form.is_salary_verified = analysis.SALARY_VERIFIED
          this.analysis_form.is_work_details_verified = analysis.WORK_DETAILS_VERIFIED
     
        });
    });
  }
  open(section) {
    this.view = section;
  }
  close() {

    this.loansService.updateAnalysis(this.currentUser.token, this.parentRouteId, this.analysis_form)
      .subscribe(analysis => {
        this.loanAnalysis()
        this.view = 'main';
      });

  }

}
