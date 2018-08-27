import { Component, OnInit, Input } from '@angular/core';
import { OperationsService } from '../../_services/operations.service';
import { StorageService } from '../../_services/storage.service';
import { RemitaService } from '../../_services/remita.service';
import { ToastrService } from 'ngx-toastr';
import { IonRangeSliderComponent } from 'ng2-ion-range-slider';

@Component({
  selector: 'app-remitaanalytics',
  templateUrl: './remitaanalytics.component.html',
  styleUrls: ['./remitaanalytics.component.css']
})
export class RemitaanalyticsComponent implements OnInit {

  loading = false;
  currentUser: any;
  simpleSlider_ = { name: 'Simple Slider', onUpdate: undefined, onFinish: undefined };
  remitaconnection = {
    'MERCHANT_ID': '',
    'API_KEY': '',
    'API_TOKEN': '',
    'SERVICE_ID':'',
    'SERVICE_NAME':'',
    'ENCRYPTION_KEY':'',
    'ENCRYPTION_VECTOR':''
  }
  remita_analytics = {
    excluded_companies: '0',
    company_exists: '0',
    allowed_companies: '0',
    allowed_banks: '0',
    bank_account_match: '0',
    customer_name_match: '0',
    unifrom_salary: '0',
    allow_pay_date: '0',
    last_pay_date: '0',
    salary_increase: '0',
    salary_decrease: '0',
    variation_in_salary: '0',
    variation_in_pay_date: '0',
  }
  constructor(public operationsService: OperationsService, public toastr: ToastrService,
    public storageService: StorageService, public remitaService: RemitaService) {
    this.currentUser = this.storageService.read<any>('currentUser');
  }

  ngOnInit() {

    this.remitaService.getRemitaSettings(this.currentUser.token)
      .subscribe(data => {
        this.remitaconnection.MERCHANT_ID = data.data.MERCHANT_ID;
        this.remitaconnection.API_KEY = data.data.API_KEY;
        this.remitaconnection.API_TOKEN = data.data.API_TOKEN;
        this.remitaconnection.SERVICE_ID = data.data.SERVICE_ID;
        this.remitaconnection.SERVICE_NAME = data.data.SERVICE_NAME;
        this.remitaconnection.ENCRYPTION_KEY = data.data.ENCRYPTION_KEY;
        this.remitaconnection.ENCRYPTION_VECTOR = data.data.ENCRYPTION_VECTOR;
        this.remita_analytics = {
          excluded_companies: data.analytics.excluded_companies,
          company_exists: data.analytics.company_exists,
          allowed_companies: data.analytics.allowed_companies,
          allowed_banks: data.analytics.allowed_banks,
          bank_account_match: data.analytics.bank_account_match,
          customer_name_match: data.analytics.customer_name_match,
          unifrom_salary: data.analytics.unifrom_salary,
          allow_pay_date: data.analytics.allow_pay_date,
          last_pay_date: data.analytics.last_pay_date,
          salary_increase: data.analytics.salary_increase,
          salary_decrease: data.analytics.salary_decrease,
           variation_in_salary: '0',
           variation_in_pay_date: '0',
        };
      });

  }

  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }

  updateProfilePercentage(slider, event, type) {

    if (type == 'excluded_companies') {
      this.remita_analytics.excluded_companies = event.from;

    }

    if (type == 'company_exists') {
      this.remita_analytics.company_exists = event.from;
    }

    if (type == 'allowed_companies') {
      this.remita_analytics.allowed_companies = event.from;
    }

    if (type == 'allowed_banks') {
      this.remita_analytics.allowed_banks = event.from;
    }

    if (type == 'bank_account_match') {
      this.remita_analytics.bank_account_match = event.from;
    }

    if (type == 'customer_name_match') {
      this.remita_analytics.customer_name_match = event.from;
    }

    if (type == 'unifrom_salary') {
      this.remita_analytics.unifrom_salary = event.from;
    }

    if (type == 'allow_pay_date') {
      this.remita_analytics.allow_pay_date = event.from;
    }

    if (type == 'last_pay_date') {
      this.remita_analytics.last_pay_date = event.from;
    }

    if (type == 'last_pay_date') {
      this.remita_analytics.last_pay_date = event.from;
    }

    if (type == 'salary_increase') {
      this.remita_analytics.salary_increase = event.from;
    }

    if (type == 'salary_decrease') {
      this.remita_analytics.salary_decrease = event.from;
    }
  }
  saveAnalytics(value, valid) { 
    this.loading = true;
    this.remitaService.saveRemitalAnalytics(this.currentUser.token, this.remita_analytics)
      .subscribe(data => {
        this.loading = false;
        if (data.status === true) {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }

  saveRemitaConnectionSettings(value, valid) {
    this.loading = true;
    this.remitaService.saveRemitaConnectionSettings(this.currentUser.token, value)
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
