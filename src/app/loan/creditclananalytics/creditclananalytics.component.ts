import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-creditclananalytics',
  templateUrl: './creditclananalytics.component.html',
  styleUrls: ['./creditclananalytics.component.css']
})
export class CreditclananalyticsComponent implements OnInit {

  @Input('scores') scores: any;
  @Input('analytics_data') analytics_data: any;
  @Output('hideTopBar') hideTopBar = new EventEmitter();
  @Output('adjustWeights') adjustWeights = new EventEmitter();
  currentView = 'master';
  constructor() { }

  ngOnInit() {

  }
  hideParentTopBar(view) {
    this.hideTopBar.emit({ status: true });
    this.currentView = view;
  } 
  goBactToMatser() {
    this.hideTopBar.emit({ status: false });
    this.currentView = 'master';
  }
  modifyWeights(analytics) {
    this.adjustWeights.emit({ analytics_type: analytics });
  }
}
