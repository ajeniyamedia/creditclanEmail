import { Component, OnInit, OnDestroy, EventEmitter, ViewContainerRef, ViewEncapsulation, Output, Input, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, OptionsserviceService, UserService, CustomerService, AuthenticationService, StorageService, LoansService } from '../_services/index';


@Component({
  selector: 'app-loancustomer',
  templateUrl: './loancustomer.component.html',
  styleUrls: ['./loancustomer.component.css']
})
export class LoancustomerComponent implements OnInit {
  public loan: any;
  public sub: any;
  public currentUser: any;
  public parentRouteId: number;
  constructor(private DataService: DataService, public optionsService: OptionsserviceService, public route: ActivatedRoute, public loansService: LoansService, public customerService: CustomerService, public userService: UserService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');

  }

  ngOnInit() {
    this.getLoan()
  }
  getLoan() {
    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      this.loansService.getLoan(this.currentUser.token, this.parentRouteId)
        .subscribe(loan => {

          this.loan = loan;
          console.log(this.loan)
        });
    });
  }

}
