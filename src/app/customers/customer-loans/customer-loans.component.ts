import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../_services/customers.service';
import { DataService } from '../../_services/index';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer-loans',
  templateUrl: './customer-loans.component.html',
  styleUrls: ['./customer-loans.component.css']
})

export class CustomerLoansComponent implements OnInit {

  loans = [];
  resp = {};
  sub; // Instance of the route subscription
  @Input('userType') userType; // Type of user
  @Input('userId') userId; // User Id
  @Input('external') external = false;
  start = 0;
  data: any;
  constructor(public route: ActivatedRoute,
    public DataService: DataService,
    protected customersSrvc: CustomersService,private router: Router) { }

  // Load the basic information on navigation to this page
  ngOnInit() {
    if (this.external == true) {
      this.load_records();
    } else {
      this.sub = this.route.parent.params.subscribe(params => {
        this.userType = params["type"];
        this.userId = params["id"];
        this.load_records();
      });
    }
  }
  about_contract(request_id) {
    this.router.navigate(['../statement/' + request_id + '/schedule']);
  }

  load_records() {
    this.customersSrvc.getLoans(this.userId, this.start).subscribe(data => {
      this.resp = data;
      this.loans = data.loans;
      this.data = data

      // Publish section
      this.DataService.onProfileNav.emit({ 'location': 'loans', 'data': data });
    });
  }
  loadMoreRecords(start) {
    this.start = start;
    this.load_records();
  }
}
