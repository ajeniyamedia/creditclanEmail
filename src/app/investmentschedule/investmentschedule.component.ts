import { Component, OnInit, OnDestroy, EventEmitter, ViewContainerRef, ViewEncapsulation, Output, Input, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OptionsserviceService, UserService, CustomerService, AuthenticationService, StorageService, LoansService } from '../_services/index'; 
@Component({
  selector: 'app-investmentschedule',
  templateUrl: './investmentschedule.component.html',
  styleUrls: ['./investmentschedule.component.css']
})
export class InvestmentscheduleComponent implements OnInit {
  parentRouteId: number;
  @Input('sub_summary') sub_summary = '0';
  currentUser: any;
  public sub: any;
  data: any;
  constructor(public optionsService: OptionsserviceService, public router: Router, public route: ActivatedRoute, 
    public loansService: LoansService, public customerService: CustomerService, 
    public userService: UserService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.parentRouteId = route.snapshot.parent.params['id'];
    console.log("This" + this.parentRouteId)
  }

  ngOnInit() {
    this.getApp()

  }
  getApp() {
    this.loansService.getInvestment(this.currentUser.token, this.parentRouteId)
      .subscribe(data => {

        this.data = data
      });
  }
}
