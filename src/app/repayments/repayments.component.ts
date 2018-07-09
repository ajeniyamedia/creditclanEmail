import { Component, OnInit, OnDestroy, EventEmitter, ViewContainerRef, ViewEncapsulation, Output, Input, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OptionsserviceService, UserService, CustomerService, AuthenticationService, StorageService, LoansService } from '../_services/index';
 

@Component({
  selector: 'app-repayments',
  templateUrl: './repayments.component.html',
  styleUrls: ['./repayments.component.css']
})
export class RepaymentsComponent implements OnInit {

  @Input('parentRouteId') parentRouteId: number;
  @Input('sub_summary') sub_summary = '0';
  currentUser: any;
  public sub: any;
  loan: any;
  PEOPLE_RATING_ID = 0;
  registerPayment = false;
  constructor(public optionsService: OptionsserviceService, public router: Router, public route: ActivatedRoute, public loansService: LoansService, 
    public customerService: CustomerService, public userService: UserService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
  }
  ngOnInit() {

  }
  // ngOnInit() {
  //   this.loansService.getLoan(this.currentUser.token, this.parentRouteId).subscribe(loan => {
  //     this.loan = loan;
  //     this.PEOPLE_RATING_ID = loan.PEOPLE_RATING_ID;
  //     console.log(loan.REQUEST_ID)
  //   });
  // }
  // open_schedule(request_id){
  //   this.router.navigate(['../repay']);
  // }
  // open_payment(request_id){
  //   this.router.navigate(['../payments']);
  // }
  // open_statement(request_id){
  //   this.router.navigate(['../statement']);
  // }
  // open_contract(request_id){
  //   this.router.navigate(['../loan',request_id]);
  // }

}
