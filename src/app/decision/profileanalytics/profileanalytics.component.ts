import { Component, OnInit, Input } from '@angular/core';
import { OperationsService } from '../../_services/operations.service';
import { ToastrService } from 'ngx-toastr';
import { IonRangeSliderComponent } from 'ng2-ion-range-slider';

@Component({
  selector: 'app-profileanalytics',
  templateUrl: './profileanalytics.component.html',
  styleUrls: ['./profileanalytics.component.css']
})
export class ProfileanalyticsComponent implements OnInit {

  loading = false;
  analytics_settings = {
    profile: "0",
    address: "0",
    income: "0",
    work: "0",
    guarantor: "0",
    account: "0",
    education: "0",
    call_log: "0",
    linkedln: "0",
    customer_profile: '0',
    social:'0'
  }
  @Input('currentUser') currentUser: any;
  simpleSlider_ = { name: 'Simple Slider', onUpdate: undefined, onFinish: undefined };

  constructor(public operationsService: OperationsService, public toastr: ToastrService) { }

  ngOnInit() {
    this.operationsService.getAppSettings(this.currentUser.token)
      .subscribe(data => {

        this.analytics_settings.profile = data.analytics.profile;
        this.analytics_settings.address = data.analytics.address;
        this.analytics_settings.income = data.analytics.income;
        this.analytics_settings.work = data.analytics.work;
        this.analytics_settings.guarantor = data.analytics.guarantor;
        this.analytics_settings.account = data.analytics.account;
        this.analytics_settings.education = data.analytics.education;
        this.analytics_settings.call_log = data.analytics.call_log;
        this.analytics_settings.linkedln = data.analytics.linkedln;
        this.analytics_settings.social = data.analytics.social;
        this.analytics_settings.customer_profile = data.analytics.customer_profile;

      });
  }

  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }

  updateProfilePercentage(slider, event, type) {

    if (type == 'profile') {
      this.analytics_settings.profile = event.from;

    }

    if (type == 'address') {
      this.analytics_settings.address = event.from;
    }

    if (type == 'income') {
      this.analytics_settings.income = event.from;
    }

    if (type == 'work') {
      this.analytics_settings.work = event.from;
    }

    if (type == 'guarantor') {
      this.analytics_settings.guarantor = event.from;
    }

    if (type == 'account') {
      this.analytics_settings.account = event.from;
    }

    if (type == 'education') {
      this.analytics_settings.education = event.from;
    }

    if (type == 'call_log') {
      this.analytics_settings.call_log = event.from;
    }

    if (type == 'linkedln') {
      this.analytics_settings.linkedln = event.from;
    }

    if (type == 'customer_profile') {
      this.analytics_settings.customer_profile = event.from;
    }
    if (type == 'social') {
      this.analytics_settings.social = event.from;
    }
  }

  saveAnalytics(value, valid) {

    this.loading = true;
    this.operationsService.saveAnalytics(this.currentUser.token, this.analytics_settings)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }

}
