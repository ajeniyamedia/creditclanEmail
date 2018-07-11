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
  remita_analytics: any;
  loading = false;
  currentUser: any;
  simpleSlider_ = { name: 'Simple Slider', onUpdate: undefined, onFinish: undefined };
  remitaconnection = {
    "MERCHANT_ID": "",
    "API_KEY": "",
    "API_TOKEN": "",
  }
  constructor(public operationsService: OperationsService, public toastr: ToastrService, 
    public storageService: StorageService, public remitaService:RemitaService) {
    this.currentUser = this.storageService.read<any>('currentUser');
  }

  ngOnInit() {

    this.remitaService.getRemitaSettings(this.currentUser.token)
      .subscribe(data => {
        this.remitaconnection.MERCHANT_ID = data.data.MERCHANT_ID;
        this.remitaconnection.API_KEY = data.data.API_KEY;
        this.remitaconnection.API_TOKEN = data.data.API_TOKEN;

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
      this.remita_analytics.profile = event.from;

    }

    if (type == 'address') {
      this.remita_analytics.address = event.from;
    }

    if (type == 'income') {
      this.remita_analytics.income = event.from;
    }

    if (type == 'work') {
      this.remita_analytics.work = event.from;
    }

    if (type == 'guarantor') {
      this.remita_analytics.guarantor = event.from;
    }

    if (type == 'account') {
      this.remita_analytics.account = event.from;
    }

    if (type == 'education') {
      this.remita_analytics.education = event.from;
    }

    if (type == 'call_log') {
      this.remita_analytics.call_log = event.from;
    }

    if (type == 'linkedln') {
      this.remita_analytics.linkedln = event.from;
    }

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
