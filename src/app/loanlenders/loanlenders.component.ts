import { Component, OnInit, OnDestroy, Output, Input,ViewContainerRef } from '@angular/core';
import { DataService, OptionsserviceService, LoansService, StorageService } from '../_services/index';
import { Loan } from '../_interfaces/loan.interface';
import { Loan_ } from '../_models/loan_';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loanlenders',
  templateUrl: './loanlenders.component.html',
  styleUrls: ['./loanlenders.component.css']
})
export class LoanlendersComponent implements OnInit {

  @Input('parentRouteId') parentRouteId: number;
  @Input('sub') sub: any;
  @Input('sub_summary') sub_summary: any;
  @Input('from_loan_contract') from_loan_contract = false;
  public loading = false;
  public lenders: any[];
  public lenders_summary: any;
  public currentUser: any;
  public masterClosed = 0;
  public slaveOpen = 0;
  public loan: any;
  public count;
  public searchingLenders = false;
  public model = { lender_name: '', request_id: 0, token: '' };
  public addLenders = false;
  searching = false;
  public loan_currency = "NGN";
  public loan_duration = "Months";
  public interest_duration = "Per Month";
  public countries: any[];
  public loan_durations = [{ "LOAN_INTEREST_DURATION_ID": 1, "LOAN_DURATION": "Days", "INTEREST_DURATION": "Per Day", "ADJECTIVAL": "Daily", "ABBREV": "d" },
  { "LOAN_INTEREST_DURATION_ID": 2, "LOAN_DURATION": "Months", "INTEREST_DURATION": "Per Month", "ADJECTIVAL": "Monthly", "ABBREV": "Mo" },
  { "LOAN_INTEREST_DURATION_ID": 3, "LOAN_DURATION": "Years", "INTEREST_DURATION": "Per Year", "ADJECTIVAL": "Yearly", "ABBREV": "Yr" },
  { "LOAN_INTEREST_DURATION_ID": 4, "LOAN_DURATION": "Weeks", "INTEREST_DURATION": "Per Week", "ADJECTIVAL": "Weekly", "ABBREV": "Wk" }]
  ;
  adding = false;
  lender_selected = false;
  selected: any;
  slenders = [];
  public platformOffer = { REQUEST_ID: 0, BORROWER_ID: 0, BID_PRINCIPAL: 0, BID_RATE: 0, 
    BID_TENOR: 0, BID_PERIOD_ID: 2, BID_RATE_PERIOD_ID: 2, BID_CURRENCY_ID: 2 };
  constructor( private toastr: ToastrService,private DataService: DataService, public route: ActivatedRoute, 
    public storageService: StorageService , 
    public optionsService: OptionsserviceService, public loansService: LoansService) {
      
    this.DataService.onConfirmAcceptOffer.subscribe(res => {
      let lender_id = res['lender_id'];
      this.acceptOffer(lender_id);
    })

    // On confirmation of rejection of offer
    this.DataService.onConfirmRejectOffer.subscribe(res => {
      let lender_id = res['lender_id'];
      this.rejectOffer(lender_id);
    })

    // On confirmation of placing request for lender
    this.DataService.onConfirmLenderHasMadeOffers.subscribe(res => {
      let form_data = res['form_data'];
      this.submitOffer(form_data);
    })


  }

  fundLenderOffer(lender_id) {
    this.DataService.onOpenLoanChildModal.emit({ 'location': 'fund_loan', data: { lender_id: lender_id } });
  }

  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }
  chooseLender(lender) {
    this.selected = lender;
    this.lender_selected = true;
    this.platformOffer.BORROWER_ID = lender.PEOPLE_ID;
    this.platformOffer.BID_RATE = lender.DEFAULT_INTEREST_RATE;
    this.platformOffer.BID_RATE_PERIOD_ID = lender.DEFAULT_INTEREST_PERIOD_ID=='0'?'2':lender.DEFAULT_INTEREST_PERIOD_ID;
    this.interest_duration = lender.INTEREST_DURATION==null?"Per Month":lender.INTEREST_DURATION;
  }
  lookforlenders() {
    this.lender_selected=false;
    this.loansService.lookforlenders(this.currentUser.token, this.model.lender_name,this.loan)
      .subscribe(lenders => {
        if (lenders.count == 0) {
          this.slenders = [];
        } else {
          this.slenders = lenders.lenders;
        }

      });
  }
  search_for_lenders() {
    this.loansService.getLoanLenders(this.currentUser.token, this.model.request_id, this.model.lender_name)
      .subscribe(lenders => {
        this.lenders = lenders.lenders;
        this.lenders_summary = lenders.summary;
        this.masterClosed = 0;
        this.loan = lenders.loan;
        this.count = lenders.count;
        this.model.request_id = this.parentRouteId;
        this.model.token = this.currentUser.token;
        this.searching = false;
      });
  }
  openSlave(slave) {

    this.masterClosed = slave;
    this.slaveOpen = slave;
  }
  openMaster(master) {
    this.masterClosed = 0;
    this.slaveOpen = 0;
  }
  ngOnInit() {
    this.getLenders();
  }
  changeCurrency(c) {
    this.loan_currency = c.currency[0];
    this.platformOffer.BID_CURRENCY_ID = c.callingCode[0];
  }
  getLenders() {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.optionsService.getCountries().subscribe(countries => this.countries = countries);
    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      this.loansService.getLoanLenders(this.currentUser.token, this.parentRouteId, '')
        .subscribe(lenders => {
          this.lenders = lenders.lenders;
          this.lenders_summary = lenders.summary;
          this.masterClosed = 0;
          this.loan = lenders.loan;
          this.count = lenders.count;
          this.model.request_id = this.parentRouteId;
          this.model.token = this.currentUser.token;
          this.platformOffer.BID_PERIOD_ID = this.loan.REQUEST_PERIOD_ID;
          this.platformOffer.BID_RATE_PERIOD_ID = this.loan.REQUEST_RATE_PERIOD_ID;
          this.platformOffer.BID_RATE = this.loan.REQUEST_RATE;
          this.platformOffer.BID_TENOR = this.loan.REQUEST_TENOR;
          this.platformOffer.REQUEST_ID = this.parentRouteId;


        });
    });
  }

  // Returns the balance of the loan to be funded.
  getRemainder() {
    return this.loan['REQUEST_PRINCIPAL'] - this.lenders_summary['BIDFUNDED'];
  }


  changeDuration(d, T) {
    if (T === 1) {
      this.loan_duration = d.LOAN_DURATION;
      this.platformOffer.BID_PERIOD_ID = d.LOAN_INTEREST_DURATION_ID;
    }
    if (T === 2) {
      this.interest_duration = d.INTEREST_DURATION;
      this.platformOffer.BID_RATE_PERIOD_ID = d.LOAN_INTEREST_DURATION_ID;
    }

  }
  back(){
    this.addLenders=false;
    this.searchingLenders=false;
  }
  confirmSubmitOffer(form_data) {
    let extra = {
      img: this.selected.FILE_NAME,
      interest_duration: this.interest_duration,
      name: this.selected.LEGAL_NAME,
    }
    console.log(extra)
    this.DataService.onOpenLoanChildModal.emit({ 'location': 'confirm_make_offer', data: { form_data: form_data, extra: extra } });
  }
  submitOffer(f) {
    this.adding = true 
    this.loansService.makeNewOffer(this.currentUser.token, this.platformOffer, this.platformOffer.REQUEST_ID)
      .subscribe(loan => {
        this.platformOffer = { REQUEST_ID: 0, BORROWER_ID: 0, BID_PRINCIPAL: 0, BID_RATE: 0, 
          BID_TENOR: 0, BID_PERIOD_ID: 2, BID_RATE_PERIOD_ID: 2, BID_CURRENCY_ID: 2 }; 
        this.adding = false;
        this.lender_selected = false;
        this.slenders = [];
        this.addLenders = false;
        this.getLenders();
        if(loan.status===false){
          // swal({
          //   title: "Make Offer",
          //   text: loan.message,
          //   type: "error"
          // });
          this.showError(loan.message)
        }else{

        }
      });
  }

  confirmAcceptOffer(indx, lender_id) {
    let lender = {
      name: this.lenders[indx]['LEGAL_NAME'],
      image: this.lenders[indx]['FILE_NAME'],
      BID_PRINCIPAL: this.lenders[indx]['BID_PRINCIPAL'],
      BID_RATE: this.lenders[indx]['BID_RATE'],
    }
    let borrower = { 
      image: this.loan.FILE_NAME, 
      name: this.loan.LEGAL_NAME
    }
    this.DataService.onOpenLoanChildModal.emit({ 'location': 'confirm_accept_offer', data: { lender_id: lender_id, lender: lender,borrower:borrower } });
  }


  acceptOffer(RLID) {
    this.loading = true;
    this.currentUser = this.storageService.read<any>('currentUser');
    this.loansService.acceptOffer(this.currentUser.token, RLID)
      .subscribe(lenders => {
        this.loading = false;
        this.lenders = lenders.lenders;
        this.lenders_summary = lenders.summary;
        this.masterClosed = 0;
        this.slaveOpen = 0;
        if(lenders.status == false){
          this.showError(lenders.message)
        }
      },err=>{
        this.loading = false;
      });
  }

  confirmRejectOffer(indx, lender_id) {
    let lender = {
      name: this.lenders[indx]['LEGAL_NAME'],
      image: this.lenders[indx]['FILE_NAME'],
      BID_PRINCIPAL: this.lenders[indx]['BID_PRINCIPAL'],
      BID_RATE: this.lenders[indx]['BID_RATE'],
    }
    this.DataService.onOpenLoanChildModal.emit({ 'location': 'confirm_reject_offer', data: { lender_id: lender_id, lender: lender } });
  }

  rejectOffer(RLID) {
    this.loading = true;
    this.currentUser = this.storageService.read<any>('currentUser');
    this.loansService.rejectOffer(this.currentUser.token, RLID)
      .subscribe(lenders => {
        this.loading = false;
        this.lenders = lenders.lenders;
        this.lenders_summary = lenders.summary;
        this.masterClosed = 0;
        this.slaveOpen = 0;
      });
  }
}
