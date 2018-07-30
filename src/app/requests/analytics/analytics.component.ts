import { Component, OnInit, Output } from '@angular/core';
import { DataService } from '../../_services/data.service';
import { LoansService } from '../../_services/loans.service';
import { StorageService } from '../../_services/storage.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  viewing_offer = '0';
  currentUser: any;
  numberOfRequests = 0;
  viewingResults = false;
  magic_filter: any;
  sectors: any;
  approval_levels;
  public statuses = [
    { value: '1', display: 'Requests' },
    { value: '2', display: 'Portfolio' },
    { value: '5', display: 'Rejected' },
    { value: '6', display: 'Contract Created' },
    { value: '-3', display: 'Ineligible' },
    { value: '-6', display: 'Terminated' },
    { value: '-4', display: 'Disbursements' },
    { value: '-1', display: 'Repaid' },
    { value: '-2', display: 'All' },
    { value: '6', display: 'Contract' }
  ];
  public durations = [
    { display: '0 - 1', checked: false, min: 0, max: 30 },
    { display: '0 - 3', checked: false, min: 31, max: 90 },
    { display: '4 - 6', checked: false, min: 91, max: 180 },
    { display: '7 - 12', checked: false, min: 181, max: 365 },
    { display: '1+ Years', checked: false, min: 366, max: 3650 }
  ];
  public request_date = [
    { display: 'Today', checked: false, min: 0, max: 1 },
    { display: '2 - 7 days', checked: false, min: 2, max: 7 },
    { display: '2 - 4 weeks', checked: false, min: 8, max: 30 },
    { display: '1+ months', checked: false, min: 31, max: 100000 }
  ];
  loans:any;
  public applyMethod = { '1': 'USSD', '2': 'Mobile', '3': 'Back Office','4':'Back Office' };
  constructor(public loansService: LoansService, public storageService: StorageService, public dataService: DataService) {
    this.dataService.viewAnalyticsResults.subscribe(res => {
      this.magic_filter = res.magic_filter;
      this.viewAnalyseResults();
    });
    this.currentUser = this.storageService.read<any>('currentUser');
  }

  ngOnInit() {

  }
  onvOffer(REQUEST_ID){
    this.viewing_offer = REQUEST_ID;
  }
  initiateBulkAnalytics() {
    this.dataService.initiateBulAnalytics.emit();

  }
  viewAnalyseResults() {
    this.viewingResults = true;
    this.loansService.runFilterLoans(this.currentUser.token, this.magic_filter, this.sectors, this.approval_levels, this.statuses, this.durations, this.request_date)
      
      .subscribe(customers => {
        this.magic_filter.reset = false; 
        this.loans = customers;
      });
  }
  getTotalFunded(PERCENTAGE_FUNDED,REQUEST_PRINCIPAL){
    return parseFloat(PERCENTAGE_FUNDED)/100*parseFloat(REQUEST_PRINCIPAL);
  }
  getTotalRemaining(REQUEST_PRINCIPAL,TOTAL_FUNDED){
    return parseFloat(REQUEST_PRINCIPAL)-parseFloat(TOTAL_FUNDED);
  }
  percent_funded(val){
    return val+'%';
  }
  viewTheLoan(request_id){
    this.dataService.viewTheLoan.emit(request_id);
  }

}
