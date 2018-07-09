import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportsdashboard',
  templateUrl: './reportsdashboard.component.html',
  styleUrls: ['./reportsdashboard.component.css']
})
export class ReportsdashboardComponent implements OnInit {

	overlayOpen = false;
	openedReport = 0;

	constructor() {}

	ngOnInit() {}

	closeOverlay() {
	    this.overlayOpen = false;
	}

	// Fire event on click
	openReport(report_id) {
    	this.openedReport = report_id;
    	this.overlayOpen = true;
	}

}
