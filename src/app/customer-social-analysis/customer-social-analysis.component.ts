import { Component, OnInit,OnDestroy, EventEmitter, ViewContainerRef, ElementRef,ViewEncapsulation, Output, Input} from '@angular/core';
import { UserService, DataService,OperationsService, CustomerService, AuthenticationService, StorageService, LoansService } from '../_services/index';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-social-analysis',
  templateUrl: './customer-social-analysis.component.html',
  styleUrls: ['./customer-social-analysis.component.css']
})
export class CustomerSocialAnalysisComponent implements OnInit {
  currentUser: any;
  request:any;
  sub:any;
  socialRequest :any;
  amount:any;
  availability:any='0';
  fqscore:any;
  socialAnalysis:any;
  currentView: any= "analytics";
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
    this.sub = this.route.parent.params.subscribe(params => {
      let request_id = +params["id"];
      this.request = request_id;

      this.loansService.displayanalysisrequest(this.currentUser.token,  this.request)
        .subscribe(data => {
        this.socialRequest = data.analytics_request;
        this.loansService.analysisAmount(this.currentUser.token)
        .subscribe(datas => {
          this.amount = datas;
        });

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

  

  paysocialanalysis(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'customer-social-analysis-payment', data : this.amount});
  }

  displayAnalysisDetails(){
    this.currentView = 'details';
  }
  
  displayAnalyticsScore(){
    this.currentView = 'analytics';
  }

  sectionOpen = 'linkedln';
// Toggle a section open. Shorthand copied from Soji-Okunnuga.
toogleView(section) {
 this.sectionOpen = section;
}

}
