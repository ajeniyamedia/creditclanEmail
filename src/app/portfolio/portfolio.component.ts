import { Component, OnInit, Input, ViewChild, HostListener, ViewEncapsulation } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { DataService, OptionsserviceService, UserService, LoansService, AuthenticationService, StorageService } from '../_services/index';
import { User } from '../_models/index';
import { IonRangeSliderComponent } from 'ng2-ion-range-slider';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  @ViewChild('advancedSliderElement') advancedSliderElement: IonRangeSliderComponent;
  simpleSlider = { name: 'Simple Slider', onUpdate: undefined, onFinish: undefined };
  simpleSlider_ = { name: 'Simple Slider', onUpdate: undefined, onFinish: undefined };
  advancedSlider = { name: 'Advanced Slider', onUpdate: undefined, onFinish: undefined };
  public loading = true;
  public searchView = false;
  public currentUser: any;
  showSearch = false;
  public statuses = [
    { value: '2', display: 'Portfolio' },
    { value: '3', display: 'Historical' }
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
  summaryOpen = false;
  min = 0;
  max = 100;
  min_ = 0;
  max_ = 1000000;
  overlayType = '0';
  viewing_loan = false;
  loan_viewed = '0';
  public slaveOpen = '0';
  public masterClosed = '0';
  sectors: any;
  approval_levels;
  magic_filter = { start: 0, funding: '100', token: '', min: 0, max: 10000000, loan_status: this.statuses[0].value, searchText: '', ratings_one: false, ratings_two: false, ratings_three: false, ratings_four: false, ratings_five: false, funding_amount_one: 1, funding_amount_two: 1, funding_amount_three: false, funding_status_disbursement: false, funding_status_contract_created: false, funding_status_applied: false, funding_status_funded: false, funding_status: false, amount: false, approval_level: false, rating: false, sector: false, date: false };
  loans: any;
  miniSearch = false;
  dontshownext = '0';
  view_state = '0';
  constructor( @Inject(DOCUMENT) private document: Document, private DataService: DataService, private router: Router, public optionsService: OptionsserviceService, public fb: FormBuilder, public loansService: LoansService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.DataService.onpreviewLoan.subscribe(res => {
      this.open_loan(res)
    })

  }

  ngOnInit() {
    this.getLoans_();
    this.optionsService.getOccupation(2).subscribe(sectors => this.sectors = sectors);
    this.optionsService.getApprovalLevels(this.currentUser.token).subscribe(levels => this.approval_levels = levels);
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if ((window.innerHeight + window.scrollY) >= 700) {
      // you're at the bottom of the page
      this.summaryOpen = true;
    } else {
      this.summaryOpen = false;
    }

  }
  searchForLoans() {
    this.loansService.searchForLoans(this.currentUser.token, this.magic_filter)
      .subscribe(customers => {
        this.loans = customers;
      });
  }
  checkLevel(sector, event, index) {
    this.durations[index]['checked'] = event;

  }
  displayCondition(i) {
    if (i <= 2) {
      return true;
    } else {
      return false;
    }
  }
  checkLevel_(sector, event, index) {
    this.approval_levels[index]['checked'] = event;

  }
  checkSector(sector, event, index) {
    this.sectors[index]['checked'] = event;

  }
  loadMoreRecords(start) {
    this.magic_filter.start = start
    this.getLoans()
  }
  openSlave(REQUEST_ID) {
    this.masterClosed = REQUEST_ID;
    this.slaveOpen = REQUEST_ID;
  }
  checkDate(sector, event, index) {
    this.request_date[index]['checked'] = event;

  }
  view_contract(REQUEST_ID) {
    // this.viewing_loan=true;
    // this.overlayType='2';
    // this.loan_viewed = REQUEST_ID;
    //this.DataService.onpreviewLoan.emit(REQUEST_ID);
    this.dontshownext = '1';
    this.viewing_loan = true;
    this.loan_viewed = REQUEST_ID;

  }
  view_schedule(REQUEST_ID) {
    this.viewing_loan = true;
    this.overlayType = '3';
    this.loan_viewed = REQUEST_ID;
  }
  make_payment(REQUEST_ID) {
    this.viewing_loan = true;
    this.overlayType = '1';
    this.loan_viewed = REQUEST_ID;
  }
  view_summary(REQUEST_ID) {
    this.viewing_loan = true;
    this.overlayType = '4';
    this.loan_viewed = REQUEST_ID;
  }
  getLoans() {
    //this.searchView=false;
    //this.loading=true;
    this.magic_filter.token = this.currentUser.token;
    this.loansService.filterLoans(this.currentUser.token, this.magic_filter, this.sectors, this.approval_levels, this.statuses, this.durations, this.request_date)
      // this.loansService.getLoans(this.magic_filter)
      .subscribe(customers => {
        this.loading = false;
        this.loans = customers;
      });
  }
  getLoans_() {
    //this.searchView=false;
    //this.loading=true;
    this.magic_filter.token = this.currentUser.token;
    this.loansService.filterLoans(this.currentUser.token, this.magic_filter, [], [], [], [], [])
      // this.loansService.getLoans(this.magic_filter)
      .subscribe(customers => {
        this.loading = false;
        this.loans = customers;
      });
  }
  open_loan(request_id) {

    this.viewing_loan = true;
    this.loan_viewed = request_id;
  }
  closeOverlay() {
    this.viewing_loan = false
  }
  closeOverlay_(event) {
    console.log(event)
  }
  closeSearch() {
    this.showSearch = false;
  }
  about_contract(request_id) {
    this.router.navigate(['../statement/' + request_id + '/schedule']);
  }
  update(slider, event) {
    console.log('Slider updated: ' + slider.name);
    slider.onUpdate = event;
    this.magic_filter.min = event.from;
    this.magic_filter.max = event.to;
  }
  update_(slider, event) {
    this.magic_filter.funding = event.from;
  }
  update__(slider, event) {
    this.magic_filter.min = this.min_;
    this.magic_filter.max = event.from;
  }
  finish(slider, event) {
    console.log('Slider finished: ' + slider.name);
    slider.onFinish = event;
    this.magic_filter.min = event.from;
    this.magic_filter.max = event.to;
  }

  setAdvancedSliderTo(from, to) {
    this.advancedSliderElement.update({ from: from, to: to });
  }

}
