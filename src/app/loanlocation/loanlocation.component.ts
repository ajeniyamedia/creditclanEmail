import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService, StorageService } from '../_services/index';
import { DataService, OptionsserviceService, LoansService } from '../_services/index';
@Component({
  selector: 'app-loanlocation',
  templateUrl: './loanlocation.component.html',
  styleUrls: ['./loanlocation.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoanlocationComponent implements OnInit {

  public loading = false;
  @Input('parentRouteId') parentRouteId: number;
  @Input('sub') sub: any;
  @Input('sub_summary') sub_summary: any;
  public currentUser: any;
  loan: any;
  addressList = false;
  
  LAT_: number = 51.678418;
  LNG_: number = 7.809007;
  addresses:any;
  constructor(private DataService: DataService, public route: ActivatedRoute, public storageService: StorageService, public optionsService: OptionsserviceService, public loansService: LoansService) {



  }
  ngOnInit() {
    this.loanAnalysis();
    this.getAddresses();
  }
  sendVal(val){
    return parseFloat(val)
  }
  loanAnalysis() {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      this.loansService.getLoan(this.currentUser.token, this.parentRouteId)
        .subscribe(loan => {
          this.loan = loan;
          
        });
    });
  }
  updateRequestAddress(event){
    if(this.loan.REQUEST_LOCATION_UPDATED=="0"){
      this.currentUser = this.storageService.read<any>('currentUser');
      this.sub = this.route.parent.params.subscribe(params => {
        this.parentRouteId = +params["id"];
        this.loansService.updateRequestLocation(this.currentUser.token, this.parentRouteId,event)
          .subscribe(addresses => {
            this.getAddresses();
            
          });
      });
    }
  }
  getAddresses(){

    this.currentUser = this.storageService.read<any>('currentUser');
    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      this.loansService.getAddresses(this.currentUser.token, this.parentRouteId)
        .subscribe(addresses => {
          this.addresses = addresses;
          
        });
    });

  }
}
