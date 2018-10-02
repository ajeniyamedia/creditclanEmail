import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { DataService, UserService, CustomerService, AuthenticationService, StorageService } from '../../_services/index';
@Component({
  selector: 'app-reportsdashboard',
  templateUrl: './reportsdashboard.component.html',
  styleUrls: ['./reportsdashboard.component.css']
})
export class ReportsdashboardComponent implements OnInit {

	overlayOpen = false;
	openedReport = 0;

	constructor( public router: Router,public authService: AuthenticationService) {
		if (!authService.canViewModule('1,3,5')) {
			this.router.navigate(['../unauthorized']);
		  }
	}

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
