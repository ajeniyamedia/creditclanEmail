import { Component, OnInit, OnDestroy, EventEmitter, ViewContainerRef, ViewEncapsulation, Output, Input, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, DataService, CustomerService, AuthenticationService, StorageService, LoansService } from '../_services/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investmentdetails',
  templateUrl: './investmentdetails.component.html',
  styleUrls: ['./investmentdetails.component.css']
})
export class InvestmentdetailsComponent implements OnInit {
  public parentRouteId: number;
  public loading = false;
  public sub: any;
  public currentUser: any;
  public data;
  constructor(private DataService: DataService, public router: Router, public route: ActivatedRoute, 
    public loansService: LoansService, public storageService: StorageService) {

  }

  ngOnInit() {
    this.getApp()

  }
  getApp() {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.sub = this.route.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      this.loansService.getInvestment(this.currentUser.token, this.parentRouteId)
        .subscribe(data => {

          this.data = data
        });
    });
  }
}
