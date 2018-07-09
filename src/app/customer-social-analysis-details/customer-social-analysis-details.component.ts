import { Component, OnInit,OnDestroy, EventEmitter, ViewContainerRef, ElementRef,ViewEncapsulation, Output, Input} from '@angular/core';
import { UserService, DataService,OperationsService, CustomerService, AuthenticationService, StorageService, LoansService } from '../_services/index';
import { Router,ActivatedRoute } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-customer-social-analysis-details',
  templateUrl: './customer-social-analysis-details.component.html',
  styleUrls: ['./customer-social-analysis-details.component.css']
})
export class CustomerSocialAnalysisDetailsComponent implements OnInit {
  currentUser: any;
  type:any = "";
  request:any;
  sub:any;
  fqscore:any;
  socialRequest :any;
  socialAnalysis:any;
  availability:any='0';
  amount:any;
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
    });

    this.sub = this.route.parent.params.subscribe(params => {
      let request_id = +params["id"];
      this.request = request_id;
      this.loansService.displayanalysisrequest(this.currentUser.token,  this.request)
      .subscribe(data => {
      this.socialRequest = data.analytics_request;

      this.loansService.getSocialAnalysis(data.analytics_request.people_id)
        .subscribe(dataa => {
          if(dataa.status==false){
            this.socialAnalysis = dataa;
            this.availability = '0';
          }else{
            this.socialAnalysis = dataa;
            this.availability = '1';
          }

        });
      });
     

    });
    

  }

  requestSocialAnalysisLkdProfile(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'customer-social-analysis-profile', data : this.socialAnalysis});
  }

  requestSocialAnalysisLkdWork(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'customer-social-analysis-work', data : this.socialAnalysis});
  }

 


}
