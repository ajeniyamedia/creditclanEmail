import { Component, OnInit, Output, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoansService, OperationsService, StorageService, DataService } from '../../_services/index';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var swal: any;

@Component({
  selector: 'app-directdebit',
  templateUrl: './directdebit.component.html',
  styleUrls: ['./directdebit.component.css']
})
export class DirectdebitComponent implements OnInit {

  loan: any;
  currentUser: any;
  subb: any;
  parentRouteId: any;
  history: any;
  view = 'master';
  accountfordirectdebit: any;
  records_found = false;

  constructor(public operationsService: OperationsService, public toastr: ToastrService,
    public router: Router, public route: ActivatedRoute, public loansService: LoansService,
    public storageService: StorageService, public dataService: DataService) {
    this.currentUser = this.storageService.read<any>('currentUser');
  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }
  ngOnInit() {

    this.getAllDebitMandates()

  }
  showMandates(){
    this.view = 'master';
  }
  showDirectDebitHistoryOnAccount(event) {
    this.view = 'details';
    this.accountfordirectdebit = event.acc;
    this.loan = event.loan;
    this.debitMandateHistory(event.loan, event.acc);
  }
  getAllDebitMandates() {
    this.subb = this.route.parent.params.subscribe(params => {

      this.parentRouteId = +params["id"];
      this.operationsService.getLoanDirectDebitMandate(this.currentUser.token, this.parentRouteId)
        .subscribe(result => {
          this.loan = result.loan;
        });
    });
  }
  stopDirectDebitMandate() {
    this.dataService.stopDebitMandate.emit({ loan: this.loan });
  }
  debitMandateHistory(loan, acc) {
    this.operationsService.getMandateTransactionHistory(this.currentUser.token, loan, acc)
      .subscribe(data => {
        if (data.statuscode == "00") {
          this.records_found = true;
          this.history = data.data.data.paymentDetails;
        } else {
          this.records_found = false;
          this.showError("No record found");
        }
      });
  }
}
