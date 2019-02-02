import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService, UserService, OperationsService, AuthenticationService, StorageService, LoansService, CustomerService } from '../../_services/index';
import { FormArray, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-buybackloan',
  templateUrl: './buybackloan.component.html',
  styleUrls: ['./buybackloan.component.css']
})
export class BuybackloanComponent implements OnInit {

  @Input('loan') loan: any;
  @Input('currentUser') currentUser: any;
  loading = false;
  change_payment_form = {
    SECURITY_QUESTION_ANSWER: '',
    REQUEST_ID: '',
    PEOPLE_ID: ''
  };
  banks: any;
  paymentHasBeenProcessed = false;
  searchString = "";
  searching = false;
  customerSelected = false;
  @Input() selectedCustomer: any;
  public searchedCustomerResult: any;
  constructor(public toastr: ToastrService, public loansService: LoansService,
    public fb: FormBuilder, public operationsService: OperationsService, public storageService: StorageService,
    public customerService: CustomerService) {

  }
  ngOnInit() {
    this.change_payment_form.REQUEST_ID = this.loan.REQUEST_ID;
    this.searchString = "";
  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }
  selectCustomer(customer) {
    this.selectedCustomer = customer;
    this.customerSelected = true;
    this.searching = false;
    this.change_payment_form.PEOPLE_ID = customer.PEOPLE_CUSTOMERS_ID;
  }
  searchCustomers() {
    if (this.searchString == "") {
      this.searchedCustomerResult = {}
    } else {
      this.customerSelected = false;

      this.loading = true;
      this.customerService.searchForCustomers(this.currentUser.token, this.searchString, '')
        .subscribe(customers => {
          this.loading = false;
          this.searchedCustomerResult = customers;
        });
    }

  }
  showError(message) {
    this.toastr.error(message, 'Error');
  }

  creditTheStatement(value, valid) {

    this.loading = true;
    this.operationsService.buyBackLoan(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === true) {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }


}
