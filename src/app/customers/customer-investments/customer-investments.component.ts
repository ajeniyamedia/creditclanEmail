import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../_services/customers.service';
import { DataService } from '../../_services/index';

@Component({
  selector: 'app-customer-investments',
  templateUrl: './customer-investments.component.html',
  styleUrls: ['./customer-investments.component.css']
})

export class CustomerInvestmentsComponent implements OnInit {

  investments = [];
  resp = {
    count:'0'
  };
  sub; // Instance of the route subscription

  @Input('userType') userType; // Type of user
  @Input('userId') userId; // User Id
  @Input('external') external = false;

  start = "0"
  data: any;

  constructor(public route: ActivatedRoute,
    public DataService: DataService,
    protected customersSrvc: CustomersService) { }

  // Load the basic information on navigation to this page
  ngOnInit() {

    if (this.external == true) {
      this.loadrecords();
    } else {
      this.sub = this.route.parent.params.subscribe(params => {
        this.userType = params["type"];
        this.userId = params["id"];
        this.loadrecords();
      });
    }
  }

  loadrecords() {
    this.customersSrvc.getInvestments(this.userId, this.start).subscribe(data => {
      this.resp = data;
      this.investments = data.investments;
      // Publish section
      this.DataService.onProfileNav.emit({ 'location': 'investments', 'data': data });
    });
  }

  loadMoreRecords(start) {
    this.start = start;
    this.loadrecords();
  }
}
