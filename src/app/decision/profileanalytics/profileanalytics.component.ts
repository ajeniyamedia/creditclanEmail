import { Component, OnInit, Input } from '@angular/core';
import { OperationsService} from '../../_services/operations.service';
import { ToastrService } from 'ngx-toastr';
import { IonRangeSliderComponent } from 'ng2-ion-range-slider';

@Component({
  selector: 'app-profileanalytics',
  templateUrl: './profileanalytics.component.html',
  styleUrls: ['./profileanalytics.component.css']
})
export class ProfileanalyticsComponent implements OnInit {

  loading = false;
  @Input('analytics_settings') analytics_settings: any;
  @Input('currentUser') currentUser:any;
  simpleSlider_ = { name: 'Simple Slider', onUpdate: undefined, onFinish: undefined };

  constructor(public operationsService: OperationsService, public toastr: ToastrService) { }

  ngOnInit() {
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
