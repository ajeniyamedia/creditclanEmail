import { Component, OnInit, OnDestroy, EventEmitter, ViewContainerRef, ViewEncapsulation, Output, Input, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OptionsserviceService, UserService, CustomerService, AuthenticationService, StorageService, LoansService } from '../_services/index';
import { Customer, Loan } from '../_models/index'; 
import { MomentModule } from 'angular2-moment';  

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @Input('parentRouteId') parentRouteId: number;
  @Input('sub_summary') sub_summary = '0';
  currentUser: any;
  public sub: any;
  loan: any;
  PEOPLE_RATING_ID = 0;
  registerPayment = false;
  constructor(public optionsService: OptionsserviceService, public route: ActivatedRoute, public loansService: LoansService, 
    public customerService: CustomerService, public userService: UserService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
  }

  ngOnInit() {
    console.log("Schedule" + " " + this.parentRouteId)
    if (this.sub_summary == '0') {
      this.sub = this.route.params.subscribe(params => {
        this.parentRouteId = +params["id"];
        this.loansService.getLoan(this.currentUser.token, this.parentRouteId)
          .subscribe(loan => {
            this.loan = loan;
            this.PEOPLE_RATING_ID = loan.PEOPLE_RATING_ID;
          });
      });
    } else {

      this.loansService.getLoan(this.currentUser.token, this.parentRouteId)
        .subscribe(loan => {
          this.loan = loan;
          this.PEOPLE_RATING_ID = loan.PEOPLE_RATING_ID;
        });
    }
  }

}
