import { Component, OnInit, OnDestroy, EventEmitter, ViewContainerRef, ViewEncapsulation, Output, Input, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OptionsserviceService, UserService, CustomerService, AuthenticationService, StorageService, LoansService } from '../_services/index'; 

@Component({
  selector: 'app-investmentborrower',
  templateUrl: './investmentborrower.component.html',
  styleUrls: ['./investmentborrower.component.css']
})
export class InvestmentborrowerComponent implements OnInit {

  parentRouteId: number;
  @Input('sub_summary') sub_summary = '0';
  currentUser: any;
  public sub: any;
  data: any;
  view = "1";
  constructor(public optionsService: OptionsserviceService, public router: Router, 
    public route: ActivatedRoute, public loansService: LoansService, public customerService: CustomerService, 
    public userService: UserService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.parentRouteId = route.snapshot.parent.params['id'];

  }

  ngOnInit() {
    this.getApp()

  }
  getApp() {
    this.loansService.getInvestmentBorrower(this.currentUser.token, this.parentRouteId)
      .subscribe(data => {

        this.data = data
        console.log(data.loan.REQUEST_ID)
      });
  }


}
