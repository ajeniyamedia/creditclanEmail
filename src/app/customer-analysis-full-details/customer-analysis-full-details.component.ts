import { Component, OnInit,OnDestroy, EventEmitter, ViewContainerRef, ElementRef,ViewEncapsulation, Output, Input} from '@angular/core';
import { UserService, DataService,OperationsService, CustomerService, AuthenticationService, StorageService, LoansService } from '../_services/index';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-analysis-full-details',
  templateUrl: './customer-analysis-full-details.component.html',
  styleUrls: ['./customer-analysis-full-details.component.css']
})
export class CustomerAnalysisFullDetailsComponent implements OnInit {
  sub: any;
  userType;
  userId;
  currentUser:any;
  statement:any ="";
  type:any = "";
  enable:any;
  request:any;
  magic_filter:any;
  sub_profile_analysis: any;
  sub_address_analysis: any;
  sub_income_analysis: any;
  sub_work_analysis : any;
  sub_guarantor_analysis : any;
  sub_account_analysis : any;
  sub_education_analysis : any;
  sub_call_log_analysis:any;
  sub_linkedln_analysis:any;
  sumAnalytics:any;
  subAnalytics :any;
  fqscore : any;
  socialAnalysis:any;
  constructor(public route: ActivatedRoute,
    public DataService: DataService,
    protected customersSrvc: CustomerService,
    public storageService:StorageService,
    public loansService:LoansService
  ) { 
    this.currentUser = this.storageService.read<any>('currentUser');
  }


  ngOnInit() {
    this.route.params.subscribe((data)=>{
      this.type = data.type;
    })
    
    this.sub = this.route.parent.params.subscribe(params => {
      let request_id = +params["id"];
      this.request = request_id;

      

      this.loansService.displayanalysis(this.currentUser.token,  request_id)
      .subscribe(data => {
        this.statement = data;
        this.magic_filter = {
          profile:this.statement.set_analytics.set_profile,
          address:this.statement.set_analytics.set_address,
          income:this.statement.set_analytics.set_income,
          work:this.statement.set_analytics.set_work,
          guarantor:this.statement.set_analytics.set_guarantor,
          account:this.statement.set_analytics.set_account,
          education:this.statement.set_analytics.set_education,
          call_log:this.statement.set_analytics.set_call_log,
          linkedln:this.statement.set_analytics.set_linkedln,
        }

        this.enable= this.statement.data.ENABLE_ANALYSIS.split(',');
        if(this.enable['1'] == 0){
          this.socialAnalysis = 0;
        }


        this.loansService.getSocialAnalysis(data.data.PEOPLE_ID)
        .subscribe(data => {
        if(data.status==false){
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
        }else{
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
        
      });

    });
      this.DataService.onSaveFqscore.subscribe(data => {
        this.fqscore = data.fqscore;
      })
  }

  fqscorecalculation(){
    if(this.statement.data.FQSCORE == null){
      if(this.sumAnalytics == 0 || this.subAnalytics == 0){
        this.fqscore = 0;
      }else{
        this.fqscore = Math.round(this.subAnalytics/this.sumAnalytics);
      }
    }else{
      this.fqscore = this.statement.data.FQSCORE;
    }
  
  }

  requestAnalysisOccupation(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'customer-analysis-profileOccupation', data : this.statement});
  }

  requestAnalysisName(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'customer-analysis-profileName', data : this.statement});
  }
  
  requestAnalysisAge(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'customer-analysis-profileAge', data : this.statement});
  }
  
  requestAnalysisMobile(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'customer-analysis-profileMobile', data : this.statement});
  }
  
  requestAnalysisEmail(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'customer-analysis-profileEmail', data : this.statement});
  }
  
  requestAnalysisOrigin(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'customer-analysis-profileOrigin', data : this.statement});
  }
  
  requestAnalysisGender(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'customer-analysis-profileGender', data : this.statement});
  }
  
  requestAnalysisId(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'customer-analysis-profileId', data : this.statement});
  }

  requestAnalysisMarital(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'customer-analysis-profileMarital', data : this.statement});
  }

  requestAnalysisNok(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'customer-analysis-profileNOK', data : this.statement});
  }

  requestAnalysisAddress(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'customer-analysis-profileAddress', data : this.statement});
  }

  requestAnalysisOffice(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'customer-analysis-profileOffice', data : this.statement});
  }

  requestAnalysisWork(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'customer-analysis-profileWork', data : this.statement});
  }

  requestAnalysisIncome(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'customer-analysis-profileIncome', data : this.statement});
  }

  requestAnalysisExpenses(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'customer-analysis-profileExpenses', data : this.statement});
  }

  requestAnalysisRatio(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'customer-analysis-profileRatio', data : this.statement});
  }

  requestAnalysisGuarantor(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'customer-analysis-profileGuarantor', data : this.statement});
  }

  requestAnalysisAcct(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'customer-analysis-profileAcct', data : this.statement});
  }

  requestAnalysisCard(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'customer-analysis-profileCard', data : this.statement});
  }

  requestAnalysisBvn(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'customer-analysis-profileBvn', data : this.statement});
  }

  requestAnalysisEdu(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'customer-analysis-profileEdu', data : this.statement});
  }
  
  requestAnalysisOutgoing(){
    this.DataService.onOpenLoanChildModal.emit({'location': 'customer-analysis-profileOutgoing', data : this.statement});
  }

  requestAnalysisIncoming(){
    this.DataService.onOpenLoanChildModal.emit({'location': 'customer-analysis-profileIncoming', data : this.statement});
  }


}
