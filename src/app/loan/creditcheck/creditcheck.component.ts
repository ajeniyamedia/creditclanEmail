import { Component, OnInit, Output, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoansService, OperationsService, StorageService, DataService } from '../../_services/index';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var swal: any;

@Component({
  selector: 'app-creditcheck',
  templateUrl: './creditcheck.component.html',
  styleUrls: ['./creditcheck.component.css']
})
export class CreditcheckComponent implements OnInit {
  ready = false;
  loan: any;
  currentUser: any;
  subb: any;
  parentRouteId: any;
  history: any;
  view = 'master';
  creditcheckrecord: any;
  constructor(public dataService: DataService, public operationsService: OperationsService, public toastr: ToastrService,
    public router: Router, public route: ActivatedRoute, public loansService: LoansService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.dataService.reloadCreditCheck.subscribe(res => {
      this.getData();
    })
  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }
  ngOnInit() {

    this.getData();

  }
  getData() {
    this.subb = this.route.parent.params.subscribe(params => {

      this.parentRouteId = +params["id"];
      this.operationsService.getLoanCreditCheck(this.currentUser.token, this.parentRouteId)
        .subscribe(result => {
          this.loan = result.loan;
          this.ready = true;
        });
    });
  }
  refreshCreditCheck() {
    this.dataService.onOpenLoanChildModal.emit({ 'location': 'run_credit_check', loan: this.loan });
  }
  viewCreditCheckDetails(loan) {
    this.view = 'detail';
    this.creditcheckrecord = loan;
  }
  showList() {
    this.view = 'master';
  }
}
