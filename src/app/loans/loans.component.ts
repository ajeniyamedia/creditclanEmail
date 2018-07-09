import { Component, OnInit, Input } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { OptionsserviceService, UserService, LoansService, AuthenticationService, StorageService } from '../_services/index';
import { User } from '../_models/index';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {
  public sectors: any;
  public approval_levels: any;
  public currentUser: any;
  public loading = true;
  @Input('loans') loans: any;
  public filters = { "token": "" }
  public showFilter = false;
  public showSort = false;
  public showSummary = false;
  public showSearch = false;
  public slaveOpen = "0";
  public masterClosed = "0";
  viewing_loan = false;
  loan_viewed = 0;
  @Input('limited') limited = false;
  @Input('loans_summary') loans_summary: any;
  model: any = { "searchText": "" };
  showStyle = true;
  current_step = 'filter';
  current_filter = 'funding_status';
  user = {
    skills: [
      { name: 'Below 250,000', selected: false, id: '0_250000' },
      { name: '250,000 - 700,000', selected: false, id: '250000_750000' },
      { name: '750,000 - 2,000,000', selected: false, id: '250000_750000' },
      { name: 'Above 2,000,000', selected: false, id: '250000_750000' },
    ],
    statuses: [
      { name: 'Applied', selected: false, id: 'Applied' },
      { name: 'Funded', selected: false, id: 'Funded' },
      { name: 'Repayment', selected: false, id: 'Repayment' },
      { name: 'Overdue', selected: false, id: 'Overdue' },
      { name: 'Paid', selected: false, id: 'Paid' },
    ]
  }
  form;
  magic_filter = { searchText: '', ratings_one: false, ratings_two: false, 
  ratings_three: false, ratings_four: false, ratings_five: false, funding_amount_one: 1, 
  funding_amount_two: 1, funding_amount_three: false, funding_status_contract_created: false, 
  funding_status_applied: false, funding_status_funded: false, funding_status: false, amount: false, 
  approval_level: false, rating: false, sector: false, date: false };
  
  constructor(public optionsService: OptionsserviceService, public fb: FormBuilder, public loansService: LoansService, 
    public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.form = this.fb.group({
      skills: this.buildSkills(),
      statuses: this.buildStatuses(),
      token: ''
    });
  }
  showFil(fil) {
    this.current_filter = fil;
  }
  get skills(): FormArray {
    return this.form.get('skills') as FormArray;
  };
  get statuses(): FormArray {
    return this.form.get('statuses') as FormArray;
  };
  buildSkills() {
    const arr = this.user.skills.map(s => {
      return this.fb.control(s.selected);
    })
    return this.fb.array(arr);
  }
  changeStep(step) {
    this.current_step = step
  }
  buildStatuses() {
    const arr = this.user.statuses.map(s => {
      return this.fb.control(s.selected);
    })
    return this.fb.array(arr);
  }
  openSlave(REQUEST_ID) {
    this.masterClosed = REQUEST_ID;
    this.slaveOpen = REQUEST_ID;
  }
  getStyle() {
    if (this.showStyle) {
      return "-215px";
    } else {
      return "0px";
    }
  }
  checkSector(sector, event, index) {
    this.sectors[index]["checked"] = event;

  }
  checkLevel(sector, event, index) {
    this.approval_levels[index]["checked"] = event;

  }
  filterLoans() {
    this.loading = true; 
    this.loansService.filterLoans(this.currentUser.token, this.magic_filter, this.sectors, this.approval_levels, '', '', '')
      .subscribe(customers => { 
        this.loans = customers;
        this.loading = false;
      });
  }
  searchForLoans() {
    this.loading = true; 
    this.loansService.searchForLoans(this.currentUser.token, this.magic_filter.searchText)
      .subscribe(customers => { 
        this.loans = customers;
        this.loading = false;
      });
  }
  filter(value) {
    this.loading = true;
    value.token = this.currentUser.token;
    this.loansService.getLoans(value)
      .subscribe(customers => { 
        this.loans = customers;
        this.loading = false;
      });
  }
  
  ngOnInit() {
    if (this.limited) {
      this.loading = false; 
    } else {
      this.getLoans();
      this.optionsService.getOccupation(2).subscribe(sectors => this.sectors = sectors);
      this.optionsService.getApprovalLevels(this.currentUser.token).subscribe(levels => this.approval_levels = levels);
    }
  }

  getLoans() {
    this.filters.token = this.currentUser.token;
    this.loansService.getLoans(this.filters)
      .subscribe(customers => { 
        this.loans = customers;
        this.loading = false;
      });
  }
  open_loan(request_id) {
    this.viewing_loan = true;
    this.loan_viewed = request_id;
  }
  closeOverlay() {
    this.viewing_loan = false
  }
  closeSearch() {
    this.showSearch = false;
  }
}
