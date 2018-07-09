import { Component, OnInit, OnDestroy, EventEmitter, ViewContainerRef, ViewEncapsulation, Output, Input, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OptionsserviceService, UserService, CustomerService, AuthenticationService, StorageService, LoansService } from '../_services/index';



@Component({
  selector: 'app-loanschedule',
  templateUrl: './loanschedule.component.html',
  styleUrls: ['./loanschedule.component.css']
})
export class LoanscheduleComponent implements OnInit {

  @Input('parentRouteId') parentRouteId: number;
  @Input('sub_summary') sub_summary = '0';
  currentUser: any;
  public sub: any;
  loan: any;
  PEOPLE_RATING_ID = 0;
  registerPayment = false;
  constructor(public optionsService: OptionsserviceService, public router: Router, public route: ActivatedRoute, 
    public loansService: LoansService, public customerService: CustomerService, public userService: UserService, 
    public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.parentRouteId = route.snapshot.parent.params['id'];
    console.log(this.parentRouteId)
  }

  ngOnInit() {
    this.loansService.getLoan(this.currentUser.token, this.parentRouteId)
      .subscribe(loan => {
        this.loan = loan;
        this.PEOPLE_RATING_ID = loan.PEOPLE_RATING_ID;
      });
  }


}
