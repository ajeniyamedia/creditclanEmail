import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OptionsserviceService, UserService, CustomerService, AuthenticationService, StorageService, LoansService } from '../_services/index';
import { CustomersService } from '../_services/customers.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customersummary',
  templateUrl: './customersummary.component.html',
  styleUrls: ['./customersummary.component.css']
})
export class CustomersummaryComponent implements OnInit {
  @Input('customer_viewed') customer_viewed: any;
  @Input('loan_status') loan_status='0';
  @Output() modalClosed = new EventEmitter();
  customer: any;
  currentUser: any;
  viewing = 'default';
  constructor(public router: Router, public customerService: CustomerService, 
    public userService: UserService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
  }

  ngOnInit() {
    this.customerService.getCustomer(this.currentUser.token, this.customer_viewed)
      .subscribe(customer => {
        this.customer = customer;
      });
  }
  showView(sec) {
    this.viewing = sec;
  }
  backtoloan() {
    this.modalClosed.emit("0");
  }
  view_customer(request_id) {
    this.router.navigate(['/crm/customers', request_id]);
  }
}
