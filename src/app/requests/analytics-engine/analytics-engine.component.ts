import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoansService } from '../../_services/loans.service';
import { StorageService, AnalyticsService, DataService } from '../../_services/index';

@Component({
  selector: 'app-analytics-engine',
  templateUrl: './analytics-engine.component.html',
  styleUrls: ['./analytics-engine.component.css']
})
export class AnalyticsEngineComponent implements OnInit {

  @Input('currentUser') currentUser: any;
  @Input('numberOfRequests') numberOfRequests = 0;
  @Input('magic_filter') magic_filter = 0;
  @Input('total') total = 0;
  @Output() startAnalytics = new EventEmitter();

  result: any;
  running_analytics = false;
  analytics_done = false;
  settings = {
    RUN_FOR_ALL:false
  }
  constructor(public loansService: LoansService, public storageService: StorageService, 
    public analyticsService: AnalyticsService, public dataService:DataService) { }

  ngOnInit() {
  }
  viewAnalyticsResults() {
    this.dataService.viewAnalyticsResults.emit({magic_filter:this.magic_filter});
  }
  runAnalytics() {

    this.running_analytics = true;
    this.analytics_done = false;
    this.analyticsService.startAnalysis(this.currentUser.token, this.magic_filter,this.settings, this.total)
      .subscribe(data => {
        if (data.status == true) {
          // good to go
          this.result = data.data;
          this.analytics_done = true;
        }
      });
  }
  // get the count of all pending requests

}
