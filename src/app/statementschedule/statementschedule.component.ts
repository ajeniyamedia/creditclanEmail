import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { AuthenticationService } from '../_services/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-statementschedule',
  templateUrl: './statementschedule.component.html',
  styleUrls: ['./statementschedule.component.css']
})
export class StatementscheduleComponent implements OnInit {
  sub: any;
  public parentRouteId: number;
  loan_status = '0'
  canViewLinks=false;
  constructor(public authService:AuthenticationService,public DataService: DataService, public route: ActivatedRoute) {

    this.parentRouteId = route.snapshot.parent.params['id'];
    if (!this.authService.canViewModule('1,3,1026')) {
      this.canViewLinks = true;
    }
  }

  ngOnInit() {
    // this.sub = this.route.params.subscribe(params => {
    //   this.parentRouteId = +params["id"];
    //   console.log(this.parentRouteId)
    // });
  }
  makeLoanPayment() {

    this.DataService.onMakePaymentFromStatement.emit(this.parentRouteId)
  }
  breakLoan() {
    this.DataService.onBreakingLoan.emit(this.parentRouteId)
  }
  hideFunctions(event) {
    this.loan_status = '5'
  }
  initiate_recollection(event){ 
    
    this.DataService.onInitiateRecollection.emit(event);
  }
}
