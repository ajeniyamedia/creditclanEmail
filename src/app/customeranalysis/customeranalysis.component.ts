import { Component, OnInit,OnDestroy, EventEmitter, ViewContainerRef, ElementRef,ViewEncapsulation, Output, Input} from '@angular/core';
import { UserService, DataService,OperationsService, CustomerService, AuthenticationService, StorageService, LoansService } from '../_services/index';
import { Router,ActivatedRoute } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-customeranalysis',
  templateUrl: './customeranalysis.component.html',
  styleUrls: ['./customeranalysis.component.css']
})
export class CustomeranalysisComponent implements OnInit {
  amount:any = 0;
  analysisAmount :any;
  loading:boolean;
  currentUser: any;
  sub:any;
  request:any;
  statement:any;
  type:any;
  analysis_settings={
    ENABLE_GENERAL:false,
    ENABLE_SOCIAL:false,
    ENABLE_CREDIT_BUREAU:false
  }
  constructor(
    public route: ActivatedRoute,
    public DataService: DataService,
    protected customersSrvc: CustomerService,
    public storageService:StorageService,
    public loansService:LoansService,
    public router: Router,
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

      this.loansService.displayanalysisrequest(this.currentUser.token,  this.request)
        .subscribe(data => {
        this.statement = data.analytics_request;
        
        if(this.statement.general == '1'){
          this.router.navigate(['/loan/', this.request, 'customer-analysis-details']);
        }else if(this.statement.general == '0'){
          this.router.navigate(['/loan/', this.request, 'customer-analysis']);
        }
      });

      this.loansService.analysisAmount(this.currentUser.token)
        .subscribe(data => {
          this.analysisAmount = data;
          
        });
      

  });

}
changeAnalysisAmount(event,type){
  if(event && type == '1'){
    this.amount = this.amount + parseFloat(this.analysisAmount.GENERAL_AMOUNT);
  }else if(!event && type == '1'){
     
    this.amount = this.amount - parseFloat(this.analysisAmount.GENERAL_AMOUNT);
  }
  if(event && type == '2'){
    this.amount = this.amount + parseFloat(this.analysisAmount.SOCIAL_AMOUNT);
  }else if(!event && type == '2'){
    this.amount = this.amount - parseFloat(this.analysisAmount.SOCIAL_AMOUNT);
  }
  if(event && type == '3'){
    this.amount = this.amount + parseFloat(this.analysisAmount.CREDIT_BUREAU_AMOUNT);
  }else if(!event && type == '3'){
    this.amount = this.amount - parseFloat(this.analysisAmount.CREDIT_BUREAU_AMOUNT);
  }
}

saveAnlysisRequest(value, valid){
  this.loading = true;
  this.loansService.saveAnlysisRequest(this.currentUser.token,value,this.request) 
  .subscribe(data => {
    if (data.status==='1') {
      this.loading = false;
      this.router.navigate(['/loan/', this.request, 'customer-analysis-details']);
    }else{
      console.log('error');
    }
});
}


}
