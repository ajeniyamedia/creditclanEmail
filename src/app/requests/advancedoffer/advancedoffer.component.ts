import { Component, OnInit, Input } from '@angular/core';
import { LoansService } from '../../_services/loans.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-advancedoffer',
  templateUrl: './advancedoffer.component.html',
  styleUrls: ['./advancedoffer.component.css']
})
export class AdvancedofferComponent implements OnInit {
  @Input('request_id') request_id: any;
  @Input('currentUser') currentUser: any;
  @Input('loan_request') loan_request: any;

  public loan_currency = "NGN";
  public loan_duration = "Months";
  public interest_duration = "Per Month";
  public countries: any;
  public loan_durations = [{ "LOAN_INTEREST_DURATION_ID": '1', "LOAN_DURATION": "Days", "INTEREST_DURATION": "Per Day", "ADJECTIVAL": "Daily", "ABBREV": "d" },
  { "LOAN_INTEREST_DURATION_ID": '2', "LOAN_DURATION": "Months", "INTEREST_DURATION": "Per Month", "ADJECTIVAL": "Monthly", "ABBREV": "Mo" },
  { "LOAN_INTEREST_DURATION_ID": '3', "LOAN_DURATION": "Years", "INTEREST_DURATION": "Per Year", "ADJECTIVAL": "Yearly", "ABBREV": "Yr" },
  { "LOAN_INTEREST_DURATION_ID": '4', "LOAN_DURATION": "Weeks", "INTEREST_DURATION": "Per Week", "ADJECTIVAL": "Weekly", "ABBREV": "Wk" }];

  loading = false;
  constructor(public toastr: ToastrService,private loansService:LoansService) { }

  ngOnInit() {
  }
  changeCurrency(c) {
    this.loan_currency = c.currency[0]; 
    
  }

  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }
  changeDuration(d, T) {
    if (T === 1) {
      this.loan_duration = this.loan_durations[d]["LOAN_DURATION"];
      this.loan_request.REQUEST_PERIOD_ID = this.loan_durations[d]["LOAN_INTEREST_DURATION_ID"]; 
    }
    if (T === 2) {

      this.interest_duration = this.loan_durations[d]["INTEREST_DURATION"];
      this.loan_request.REQUEST_RATE_PERIOD_ID = this.loan_durations[d]["LOAN_INTEREST_DURATION_ID"];


    }

  }
  previewLoan() {
    this.loading = true;
    this.loansService.createLoan(this.currentUser.token, this.loan_request).subscribe(loan_request => {
      this.loading = false;
      this.showSuccess("Contract Created")


    });
  }
}
