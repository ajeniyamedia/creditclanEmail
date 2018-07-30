import { Component, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { DataService, OptionsserviceService, LoansService, StorageService, KycService } from '../../_services/index';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loankyc',
  templateUrl: './loankyc.component.html',
  styleUrls: ['./loankyc.component.css']
})
export class LoankycComponent implements OnInit {

  public loading = false;
  public kycdetails: any;
  @Input('parentRouteId') parentRouteId: number;
  @Input('sub') sub: any;
  @Input('sub_summary') sub_summary: any;
  public currentUser: any;
  view  = 'master';
  kycrecord:any;
  constructor(private dataService: DataService, public route: ActivatedRoute,
    public storageService: StorageService,
    public optionsService: OptionsserviceService, 
    public loansService: LoansService,
    public kycService:KycService) {


  }

  ngOnInit() {
    this.loadKYCDetails();
  }
  viewKYCDetails(loan){
    this.view = 'detail';
    this.kycrecord = loan;
  }
  loadKYCDetails() {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      this.kycService.getLoanKYC(this.currentUser.token, this.parentRouteId)
        .subscribe(data => {
          if(data.status == true){
            this.kycdetails = data.data;
          }else{

          }
        });
    });
  }
}
