import {
  Component,
  OnInit, ViewContainerRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../_services/customers.service';
import { OptionsserviceService } from '../../_services/optionsservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../_services/index';
@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['../customer-update/customer-update.component.css']
})

export class CustomerCreateComponent implements OnInit {
  actionText = "Save";
  loading = false;
  userType;
  status = 'Cancel';
  stat = '0';
  saveCustomerFirst = false;
  user = {
    LEGAL_NAME: '',
    EMAIL: '', // default to Female
    PHONE: null,
    COUNTRY_CODE: '+234', // default to dark theme
    BIRTH_DATE: '',
    BIRTH_MONTH: '',
    BIRTH_YEAR: '',
    MARITAL_STATUS: '',
    PEOPLE_ID: '',
    ATTACHMENT1_ID: '',
    CUSTOMER_TYPE: '1',
    IS_EDIT: '0',
    DATE_OF_BIRTH: '',
    PROFILE_PHOTO: '',
    PHONE_TYPE: '1',
    SEND_WELCOME_EMAIL: false,
    REFEREE_ID: ''
  }
  public company = {
    PEOPLE_CUSTOMERS_ID: '',
    LEGAL_NAME: '',
    BUSINESS_REG_NUMBER: '',
    EMAIL: '',
    WEBSITE: '',
    NATURE_OF_BUSINESS: '',
    TAX_ID_NUMBER: '',

  }
  public countries: any;
  public selectedCountryCode = '+234';
  // Select Options
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
  days = new Array(31)
  years: any;
  gender = [
    { value: 0, display: 'Male' },
    { value: 1, display: 'Female' }
  ];
  marital_status = [
    { value: 0, display: '' },
    { value: 1, display: 'Single' },
    { value: 2, display: 'Married' },
    { value: 3, display: 'Widowed' }
  ];

  // Driving Licence Expiry Date Selection
  startDate = 2016;
  maxDuration = new Array(16);

  // Models
  model = {
    basicInfo: { open: true, data: {}, prev: {} },
    address: { open: false, data: { USER_ID: '', CUSTOMER_TYPE: '1', 'ADDRESS_TYPE': '1', ATTACHMENT_ID: '', ADDRESS_ID: '' }, prev: {}, },
    work: { open: false, data: {}, prev: {} },
    id: { open: false, data: {}, prev: {} },
    nok: { open: false, data: { USER_ID: '', 'CUSTOMER_TYPE': '1' }, prev: {} },
    director: { open: false, data: {}, prev: {} },
    phone: { open: false, data: {}, prev: {} },
    dump: {
      countries: {}
    },
    individualExtra: {}
  }
  userId: any;
  keysGetter = Object.keys;
  companyPhone = {
    PEOPLE_ID: '',
    PEOPLE_PHONE_ID: '',
    COUNTRY_CODE: '+234',
    PHONE: ''
  }
  companyAddress = {
    PEOPLE_ID: '',
    ADDRESS_ID: '',
    COUNTRY_ID: '',
    WORK_ADDRESS: '',
    CONTACT_PERSON: '',
    FAX_NUMBER: '',
    STATE_ID: ''
  }
  public currentUser: any;
  constructor(public toastr: ToastrService, vcr: ViewContainerRef, protected customersSrvc: CustomersService,
    public route: ActivatedRoute, public optionsService: OptionsserviceService,
    private router: Router, public storageService: StorageService) {

    this.optionsService.getYears().subscribe(years => this.years = years); 
    this.currentUser = this.storageService.read<any>('currentUser');
  }

  ngOnInit() {
    this.optionsService.getCountries().subscribe(countries => { 
      this.countries = countries
      this.model.dump.countries = countries;
    });
    this.route.params.subscribe(params => {
      this.userType = params['type'];
      if (this.userType == 'individual') {
      }
    });
    this.user.SEND_WELCOME_EMAIL = false;
  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }

  changeCurrency(c) {
    this.selectedCountryCode = c.callingCode[0];
    this.user.COUNTRY_CODE = this.selectedCountryCode;
  }
  toogleView(section) {
    this.saveCustomerFirst = false;
    if (this.stat != '0') {
      this.model[section]['open'] = !this.model[section]['open'];
    } else {
      this.showError("The basic details are required");
      //this.saveCustomerFirst = true;
    }
  }
  saveCompanyBasic() {
    this.loading = true;
    this.customersSrvc.saveCompanyBasic(this.company).subscribe(data => {
      this.loading = false;
      if (data.status == '0') {
        this.showError("Unable to create customer.")
      } else {
        this.showSuccess("Basic details added")
        this.company.PEOPLE_CUSTOMERS_ID = data.customer.PEOPLE_CUSTOMERS_ID
        this.companyPhone.PEOPLE_ID = data.customer.PEOPLE_CUSTOMERS_ID
        this.companyAddress.PEOPLE_ID = data.customer.PEOPLE_CUSTOMERS_ID
        this.stat = '1'
        this.actionText = 'Update';
      }
    });
  }
  updateCompanyPhone() {
    this.loading = true;
    this.customersSrvc.updateCompanyPhone(this.companyPhone).subscribe(data => {
      this.loading = false;
      if (data.status == '0') {
        this.showError("Unable to update phone.")
      } else {
        this.showSuccess("Phone updated")
        this.companyPhone.PEOPLE_PHONE_ID = data.phone.PEOPLE_PHONE_ID;
      }
    });
  }
  updateCompanyAddress() {
    this.loading = true;
    this.customersSrvc.updateCompanyAddress(this.companyAddress).subscribe(data => {
      this.loading = false;
      if (data.status == '0') {
        this.showError("Unable to update phone.")
      } else {
        this.showSuccess("Phone updated")
        this.companyAddress.ADDRESS_ID = data.companyAddress.ADDRESS_ID;
      }

    });
  }
  // Update Basic Info
  updateBasicInfo(isValid: boolean, f: any) {
    this.loading = true;
    this.customersSrvc.updateBasicInfo(this.user).subscribe(data => {
      this.loading = false;
      if (data.status == '0') {
        this.showError("Unable to create customer.")
      } else {
        this.showSuccess("Basic details added")
        this.user.PEOPLE_ID = data.customer.PEOPLE_CUSTOMERS_ID
        this.stat = '1'
        this.actionText = 'Update';
      }
    });
  }

  /*======== Individual Functions ==========*/
  updateAddress() {
    this.loading = true
    this.model.address.data.USER_ID = this.user.PEOPLE_ID;
    this.customersSrvc.updateAddress(this.model.address.data).subscribe(data => {
      this.loading = false;
      if (data.status == '0') {
        this.showError("Unable to update address.")
      } else {
        this.showSuccess("Address added")

      }
    });
  }

  updateNok() {
    this.loading = true
    this.model.nok.data.USER_ID = this.user.PEOPLE_ID;
    this.customersSrvc.updateNok(this.model.nok.data).subscribe(data => {
      this.loading = false;
      if (data.status == '0') {
        this.showError("Unable to add next of kin.")
      } else {
        this.showSuccess("Next of kin added")

      }
    });
  }
}
