import { Component, OnInit, OnDestroy, EventEmitter, ViewContainerRef, ElementRef, ViewEncapsulation, Output, Input } from '@angular/core';
import { UserService, DataService, OperationsService, CustomerService, AuthenticationService, StorageService, LoansService } from '../_services/index';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { IonRangeSliderComponent } from "ng2-ion-range-slider";
import { Router, ActivatedRoute } from '@angular/router';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-customer-analysis-details',
  templateUrl: './customer-analysis-details.component.html',
  styleUrls: ['./customer-analysis-details.component.css']
})

export class CustomerAnalysisDetailsComponent implements OnInit {
  topBarHidden=false;
  currentUser: any;
  statement: any = "";
  request: any;
  sub: any;
  loading: boolean;
  fqscore: any;
  magic_filter: any;
  sub_profile_analysis: any;
  sub_address_analysis: any;
  sub_income_analysis: any;
  sub_work_analysis: any;
  sub_guarantor_analysis: any;
  sub_account_analysis: any;
  sub_education_analysis: any;
  sub_call_log_analysis: any;
  sub_linkedln_analysis: any;
  sumAnalytics: any;
  subAnalytics: any;
  socialAnalysis: any;
  currentView: any = "master";
  enable: any;
  scores:any;
  analytics_data:any;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public DataService: DataService,
    protected customersSrvc: CustomerService,
    public storageService: StorageService,
    public loansService: LoansService,
    vcr: ViewContainerRef,
    public toastr: ToastrService,
  ) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.DataService.onTweakScores.subscribe(res => {
      this.updateProfilePercentageFromEvent(res);
    });
  }

  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }


  ngOnInit() {
    // alert()
    this.sub = this.route.parent.params.subscribe(params => {
      let request_id = +params["id"];
      this.request = request_id;



      this.loansService.displayanalysis(this.currentUser.token, request_id)
        .subscribe(data => {
          this.statement = data;

          this.magic_filter = {
            profile: this.statement.set_analytics.set_profile,
            address: this.statement.set_analytics.set_address,
            income: this.statement.set_analytics.set_income,
            work: this.statement.set_analytics.set_work,
            guarantor: this.statement.set_analytics.set_guarantor,
            account: this.statement.set_analytics.set_account,
            education: this.statement.set_analytics.set_education,
            call_log: this.statement.set_analytics.set_call_log,
            linkedln: this.statement.set_analytics.set_linkedln,
          }

          this.enable = this.statement.data.ENABLE_ANALYSIS.split(',');
          if (this.enable['1'] == 0) {
            this.socialAnalysis = 0;
          }
          this.loansService.getCustomerAnalyticsRecords(this.currentUser.token, request_id)
            .subscribe(res => {
              this.scores = res.analytics_request.scores;
              this.analytics_data = res.analytics_request.analytics_data;
          });

          this.loansService.getSocialAnalysis(data.data.PEOPLE_ID)
            .subscribe(data => {
              if (data.status == false) {
                this.socialAnalysis = 0;
                this.sub_linkedln_analysis = this.socialAnalysis * this.magic_filter.linkedln;
                this.sub_profile_analysis = this.statement.profile * this.magic_filter.profile;
                this.sub_address_analysis = this.statement.address * this.magic_filter.address;
                this.sub_income_analysis = this.statement.income * this.magic_filter.income;
                this.sub_work_analysis = this.statement.work * this.magic_filter.work;
                this.sub_guarantor_analysis = this.statement.guarantor * this.magic_filter.guarantor;
                this.sub_account_analysis = this.statement.account * this.magic_filter.account;
                this.sub_education_analysis = this.statement.education * this.magic_filter.education;
                this.sub_call_log_analysis = this.statement.call_log_analysis * this.magic_filter.call_log;
                this.subAnalytics = this.sub_profile_analysis + this.sub_address_analysis + this.sub_income_analysis + this.sub_work_analysis + this.sub_guarantor_analysis + this.sub_account_analysis
                  + this.sub_education_analysis + this.sub_call_log_analysis + this.sub_linkedln_analysis;
                this.sumAnalytics = parseFloat(this.magic_filter.profile) + parseFloat(this.magic_filter.address) + parseFloat(this.magic_filter.income) + parseFloat(this.magic_filter.work) + parseFloat(this.magic_filter.guarantor) + parseFloat(this.magic_filter.account) + parseFloat(this.magic_filter.education) + parseFloat(this.magic_filter.call_log) + parseFloat(this.magic_filter.linkedln);
                this.fqscorecalculation();
              } else {
                this.socialAnalysis = data.analytics.final_score;
                this.sub_linkedln_analysis = this.socialAnalysis * this.magic_filter.linkedln;
                this.sub_profile_analysis = this.statement.profile * this.magic_filter.profile;
                this.sub_address_analysis = this.statement.address * this.magic_filter.address;
                this.sub_income_analysis = this.statement.income * this.magic_filter.income;
                this.sub_work_analysis = this.statement.work * this.magic_filter.work;
                this.sub_guarantor_analysis = this.statement.guarantor * this.magic_filter.guarantor;
                this.sub_account_analysis = this.statement.account * this.magic_filter.account;
                this.sub_education_analysis = this.statement.education * this.magic_filter.education;
                this.sub_call_log_analysis = this.statement.call_log_analysis * this.magic_filter.call_log;
                this.subAnalytics = this.sub_profile_analysis + this.sub_address_analysis + this.sub_income_analysis + this.sub_work_analysis + this.sub_guarantor_analysis + this.sub_account_analysis
                  + this.sub_education_analysis + this.sub_call_log_analysis + this.sub_linkedln_analysis;
                this.sumAnalytics = parseFloat(this.magic_filter.profile) + parseFloat(this.magic_filter.address) + parseFloat(this.magic_filter.income) + parseFloat(this.magic_filter.work) + parseFloat(this.magic_filter.guarantor) + parseFloat(this.magic_filter.account) + parseFloat(this.magic_filter.education) + parseFloat(this.magic_filter.call_log) + parseFloat(this.magic_filter.linkedln);
                this.fqscorecalculation();
              }
            });


          //..............CALCULATION OF ALL PERSONAL DETAILS ANALYTICS....................................////

        });
    });


    this.DataService.onSaveFqscore.subscribe(data => {
      this.fqscore = data.fqscore;
    });


  }
  updateProfilePercentageFromEvent(res) {

    this.magic_filter.profile = res.profile;
    this.sub_profile_analysis = this.statement.profile * this.magic_filter.profile;

    this.magic_filter.address = res.address;
    this.sub_address_analysis = this.statement.address * this.magic_filter.address;

    this.magic_filter.income = res.income;
    this.sub_income_analysis = this.statement.income * this.magic_filter.income;

    this.magic_filter.work = res.work;
    this.sub_work_analysis = this.statement.work * this.magic_filter.work;

    this.magic_filter.guarantor = res.guarantor;
    this.sub_guarantor_analysis = this.statement.guarantor * this.magic_filter.guarantor;

    this.magic_filter.account = res.account;
    this.sub_account_analysis = this.statement.account * this.magic_filter.account

    this.magic_filter.education = res.education;
    this.sub_education_analysis = this.statement.education * this.magic_filter.education;

    this.magic_filter.call_log = res.call_log;
    this.sub_call_log_analysis = this.statement.call_log_analysis * this.magic_filter.call_log;

    this.magic_filter.linkedln = res.linkedln;
    this.sub_linkedln_analysis = this.socialAnalysis * this.magic_filter.linkedln;


    this.sumAnalytics = this.magic_filter.profile + this.magic_filter.address + this.magic_filter.income + this.magic_filter.work + this.magic_filter.guarantor + this.magic_filter.account + this.magic_filter.education + this.magic_filter.call_log + this.magic_filter.linkedln;
  }



  // FQ SCORE FOR ANALYTICS.........................//
  fqscorecalculation() {
    if (this.statement.data.FQSCORE == null) {
      if (this.sumAnalytics == 0 || this.subAnalytics == 0) {
        this.fqscore = 0;
      } else {
        this.fqscore = Math.round(this.subAnalytics / this.sumAnalytics);
      }

    } else {
      this.fqscore = this.statement.data.FQSCORE;
    }
  }

  analysisSlider() {
    this.DataService.onOpenLoanChildModal.emit({
      'location': 'customer-analysis-slider', data: this.statement, social: this.socialAnalysis
    });
  }
  sectionOpen = 'profile';
  // Toggle a section open. Shorthand copied from Soji-Okunnuga.
  toogleView(section) {
    this.sectionOpen = section;
  }

  displayAnalysisDetails() {
    this.currentView = 'documents';
  }

  displayAnalyticsScore() {
    this.currentView = 'personal_details';
  }

  saveAnlysisRequest() {
    this.loansService.saveFqscore(this.currentUser.token, this.fqscore, this.request)
      .subscribe(data => {
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  hideTopBar(event){
    this.topBarHidden = event.status;
    this.currentView = 'master';
  }
  adjustWeights(event){
    event.request_id = this.request;
    this.DataService.adjustTheAnalyticsWeight.emit(event)
  }
}
