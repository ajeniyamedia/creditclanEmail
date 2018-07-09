import { Component, OnInit, OnDestroy, EventEmitter, ViewContainerRef, ViewEncapsulation, Output, Input, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OptionsserviceService, UserService, CustomerService, AuthenticationService, StorageService, LoansService } from '../_services/index'; 

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {
  parentRouteId: number;
  @Input('sub_summary') sub_summary = '0';
  currentUser: any;
  public sub: any;
  data: any;
  statement_type = 0;
  constructor(public optionsService: OptionsserviceService, public router: Router, public route: ActivatedRoute, 
    public loansService: LoansService, public customerService: CustomerService, public userService: UserService, 
    public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.parentRouteId = route.snapshot.parent.params['id'];
  }

  ngOnInit() {
    this.getApp()

  }
  getApp() {
    this.loansService.getInvStatement(this.currentUser.token, this.parentRouteId, this.statement_type)
      .subscribe(data => {

        this.data = data
      });
  }
  break_loan(){
    
  }

}
