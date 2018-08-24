import { Component, OnInit, Output, Input, ViewContainerRef, EventEmitter } from '@angular/core';
import { OperationsService, DataService, StorageService } from '../_services/index';
import { CustomersService } from '../_services/customers.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-loancustomerform',
  templateUrl: './loancustomerform.component.html',
  styleUrls: ['./loancustomerform.component.css']
})
export class LoancustomerformComponent implements OnInit {
  @Input('appsettings') appsettings: any;
  @Input('editing_customer') editing_customer: any;
  @Input('selectedCustomer') selectedCustomer: any;
  @Input('customer') customer;
  @Input('gender') gender;
  @Input('id_means') id_means: any;
  @Input('marital_statuses') marital_statuses;
  @Input('countries') countries;
  @Input('relations') relations;
  @Input('occupations') occupations;
  @Input('sectors') sectors;
  @Input('designations') designations;
  @Input('edu_qua') edu_qua;
  @Input('nigerian_banks') nigerian_banks: any;
  currentUser: any;
  @Output() customerCreated = new EventEmitter();
  savedcustomer: any;
  actionText = "Save"
  stat = '0';
  months = [
    { value: '1', display: 'January' },
    { value: '2', display: 'Feburary' },
    { value: '3', display: 'March' },
    { value: '4', display: 'April' },
    { value: '5', display: 'May' },
    { value: '6', display: 'June' },
    { value: '7', display: 'July' },
    { value: '8', display: 'August' },
    { value: '9', display: 'September' },
    { value: '10', display: 'October' },
    { value: '11', display: 'November' },
    { value: '12', display: 'December' }
  ];
  years = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026']
  days = new Array(31)
  loading = false;
  people_id: any;
  constructor(public operationsService: OperationsService, private toastr: ToastrService,
    protected customersSrvc: CustomersService, private storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
  }

  ngOnInit() {
    if (!this.editing_customer) {
      this.customer = {
        personal: {
          'LEGAL_NAME': '',
          'EMAIL': '',
          'PHONE': '',
          'GENDER': '',
          'DATE_OF_BIRTH': '',
          'NATIONALITY': '',
          'MARITAL_STATUS': '',
          'MEANS_OF_ID': '',
          'ID_NUMBER': '',
          'PEOPLE_ID': '',
          'CUSTOMER_TYPE': 1,
          'PROFILE_PHOTO': '',
          'COUNTRY_CODE': 1,
          'PHONE_TYPE': '',
          'STAFF_NUMBER': ''
        },
        nok: {
          'nok_name': '',
          'nok_email': '',
          'nok_phone': '',
          'nok_relationship': '',
          'nok_address': '',
        },
        education: {
          'education_qualification': '',
          'education_institution': '',
          'education_year': '',
          'education_others': '',
        },
        address: {
          'country_id': '',
          'state_id': '',
          'address': '',
          'landmark': '',
          'nature_of_accomodation': '',
          'time_at_current_address': '',
          'year': '',
          'month': ''
        },
        work: {
          'occupation_id': '',
          'work_sector': '',
          'designation': '',
          'NET_MONTHLY_INCOME': '',
          'DESIGNATION': '',
          'GROSS_ANNUAL_INCOME': '',
          'WORK_START_DATE': '',
          'WORK_END_DATE': ''
        },
        account: {
          'bank_id': '',
          'account_name': '',
          'account_number': '',
          'is_verified': '',
          'i_certify': false,
        },
        bvn: {
          'bvn_number': '',
          'bvn_reponse': '',
          'is_verified': '',
          'i_certify': false,
          'bvn_name': ''
        }
      }
    } else {
      this.customer = {
        personal: {
          'PEOPLE_ID': this.selectedCustomer.PEOPLE_CUSTOMERS_ID,
          'LEGAL_NAME': this.selectedCustomer.LEGAL_NAME,
          'EMAIL': this.selectedCustomer.EMAIL,
          'PHONE': this.selectedCustomer.PHONE,
          'GENDER': this.selectedCustomer.GENDER,
          'DATE_OF_BIRTH': this.selectedCustomer.BIRTH_YEAR+'-'+this.selectedCustomer.BIRTH_MONTH+'-'+this.selectedCustomer.BIRTH_DAYE,
          'NATIONALITY': this.selectedCustomer.NATIONALITY,
          'MARITAL_STATUS': this.selectedCustomer.MARITAL_STATUS,
          'MEANS_OF_ID': this.selectedCustomer.MEANS_OF_ID,
          'ID_NUMBER': this.selectedCustomer.ID_NUMBER, 
          'CUSTOMER_TYPE': 1,
          'PROFILE_PHOTO': '',
          'COUNTRY_CODE': 1,
          'PHONE_TYPE': '',
          'STAFF_NUMBER':this.selectedCustomer.STAFF_NUMBER
        }
      }
    }
  }
  save(value, is_valid) {

  }
  bvn_error = false;
  verifyBVNDetails() {
    this.loading = true;
    this.bvn_error = false;
    this.operationsService.resolve_bvn(this.currentUser.token, this.customer.bvn)
      .subscribe(status => {
        this.loading = false;

        if (status.status == true) {
          this.customer.bvn.bvn_reponse = status.data;
          this.customer.bvn.is_verified = true;
          this.customer.bvn.i_certify = true;
          this.customer.bvn.bvn_name = status.data.data.first_name + ' ' + status.data.data.last_name
        } else {
          this.bvn_error = true;
        }
      });
  }
  verify_error = false;
  verifyBankDetails() {
    this.loading = true;
    this.verify_error = false;
    this.operationsService.confirmBankAccounts(this.currentUser.token, this.customer.account)
      .subscribe(status => {
        this.loading = false;

        if (status.status == "success") {
          this.customer.account.account_name = status.data.account_name;
          this.customer.account.is_verified = true;
          this.customer.account.i_certify = true;
        } else {
          this.customer.account.is_verified = false;

          this.verify_error = true;
        }
      });
  }
  current_view = 'profile';
  saveCustomerFirst = true;
  toogleView(view) {
    this.saveCustomerFirst = false;
    if (this.stat != '0') {
      this.current_view = view;
    } else {
      this.showError("The profile details are required");
    }
  }

  updateBasicInfo(isValid: boolean, f: any) {

    this.loading = true;
    this.customersSrvc.updateBasicInfoNew(f, this.currentUser.token).subscribe(data => {
      this.loading = false;
      if (data.status == '0') {
        this.showError(data.message)
      } else {
        this.showSuccess(data.message)
        this.stat = '1'
        this.actionText = 'Update';
        this.savedcustomer = data.customer
        this.people_id = data.customer.PEOPLE_ID
      }
    });
  }
  updateNok(f: any, isValid: boolean, ) {
    //this.showSuccess("Next of kin added")
    this.loading = true
    this.customersSrvc.updateNokNew(f, this.currentUser.token, this.people_id).subscribe(data => {
      this.loading = false;
      if (data.status == '0') {
        this.showError("Unable to add next of kin.")
      } else {
        this.showSuccess("Next of kin added")

      }
    });
  }
  updateEdu(f: any, isValid: boolean) {
    ///this.showSuccess("Education added")
    this.loading = true
    this.customersSrvc.updateEduNew(f, this.currentUser.token, this.people_id).subscribe(data => {
      this.loading = false;
      if (data.status == '0') {
        this.showError("Unable to add next of kin.")
      } else {
        this.showSuccess("Next of kin added")

      }
    });
  }
  updateAddress(f: any, isValid: boolean) {
    //this.showSuccess("Address added")
    this.loading = true
    this.customersSrvc.updateAddressNew(f, this.currentUser.token, this.people_id).subscribe(data => {
      this.loading = false;
      if (data.status == '0') {
        this.showError("Unable to update address.")
      } else {
        this.showSuccess("Address added")

      }
    });
  }
  updateWork(f: any, isValid: boolean, ) {
    //this.showSuccess("Work added")
    this.loading = true
    //this.customer.address.USER_ID = this.customer.profile.PEOPLE_ID;
    this.customersSrvc.updateWorkNew(f, this.currentUser.token, this.people_id).subscribe(data => {
      this.loading = false;
      if (data.status == '0') {
        this.showError("Unable to update address.")
      } else {
        this.showSuccess("Address added")

      }
    });
  }
  updateBank() {
    this.loading = true
    this.loading = false;
    this.showSuccess("Bank details added")
    this.stat = '2';
  }
  showSuccess(msg) {
    this.toastr.success(msg);
  }
  showError(msg) {
    this.toastr.error(msg);
  }
  formDone() {
    if (this.stat != '2') {
      this.showError("Bank Details Required")
    } else {
      this.customerCreated.emit({ customer: this.savedcustomer, saved_customer: this.savedcustomer, bank: this.customer.account })
    }

  }
}
