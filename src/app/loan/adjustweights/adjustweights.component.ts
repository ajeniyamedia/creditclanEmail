import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { LoansService } from '../../_services/loans.service';
import { StorageService } from '../../_services/storage.service';
import { IonRangeSliderComponent } from "ng2-ion-range-slider";
import { Router, ActivatedRoute } from '@angular/router';
import { AnalyticsService } from '../../_services';


@Component({
  selector: 'app-adjustweights',
  templateUrl: './adjustweights.component.html',
  styleUrls: ['./adjustweights.component.css']
})
export class AdjustweightsComponent implements OnInit {

  currentUser: any;
  analytics_settings = {
    general: "0",
    social: "0",
  }
  loading = false;
  running_analytics = false;
  analytics_done= false;
  @Input('loan') loan: any;
  result :any;

  simpleSlider_ = { name: 'Simple Slider', onUpdate: undefined, onFinish: undefined };

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public storageService: StorageService,
    public loansService: LoansService,
    public analyticsService: AnalyticsService
  ) {
    this.currentUser = this.storageService.read<any>('currentUser');
  }

  ngOnInit() {
    this.loansService.analysisAmount(this.currentUser.token)
      .subscribe(data => {
        this.analytics_settings.general = data.GENERAL_AMOUNT;
        this.analytics_settings.social = data.SOCIAL_AMOUNT;
      });

  }
  updateProfilePercentage(slider, event, type) {

    if (type == 'general') {
      this.analytics_settings.general = event.from;

    }

    if (type == 'social') {
      this.analytics_settings.social = event.from;
    }


  }
  runAnalytics(value, valid) {
    this.loading = true;
    this.running_analytics = true;
    this.analytics_done = false;
    this.analyticsService.runAnalysisForAdjustedSettings(this.currentUser.token, this.loan.REQUEST_ID, this.analytics_settings)
      .subscribe(data => {
        this.loading = false;
        this.running_analytics = true;
        this.analytics_done = true;
        this.result = data.data;
      });
  }
}
