import { Component, OnInit } from '@angular/core';
import { UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';

import { CustomersService } from '../../_services/customers.service';

@Component({
  selector: 'app-autodebit',
  templateUrl: './autodebit.component.html',
  styleUrls: ['./autodebit.component.css']
})
export class AutodebitComponent implements OnInit {

  public loading = false;
  downloadLinkReceived = false;
  downloadLink = "";
  public currentUser: any;
  public data: any;
  public rows = [];
  public columns = {};
  objectKeys = Object.keys;
  filter = {
    TPDATE: '',
    TPDATE_: ''
  };

  constructor(public operationsService: OperationsService, public storageService: StorageService,
    protected customersSrvc: CustomersService) {
    this.currentUser = this.storageService.read<any>('currentUser');
  }

  ngOnInit() {
    this.columns = {
      'Customer': true,
      'Amount': true,
      'Repayment Date': true,
      'Last Autodebit': true,
      'Response': true,
      'Count': true
    }
    this.getLoans();
  }
  // set the keys of the response object as column names on the table
  resetColumn(obj) {
    var cols = {};
    for (var key in obj) {
      cols[key] = true;
    }
    this.columns = cols;
  }

  exportReport() {
    if (typeof this.rows == 'undefined' || this.rows.length < 1) {
      alert("There are no data to export.");
      return;
    }

    // Export only fields that are checked to be open
    let rows = [];
    let field_names = [];
    for (var i = 0; i < this.rows.length; i++) {
      let cols = {};
      for (let column of this.objectKeys(this.columns)) {
        if (this.columns[column]) {
          cols[column] = this.rows[i][column];
          field_names.push(column);
        }
      }
      rows.push(cols);
    }
    this.loading = true
    // Send to the server
    this.operationsService.exportReport(this.currentUser.token, { 'report': 'due_loans', 'rows': rows, 'field_names': field_names }).subscribe(data => {
      this.loading = false;
      if (data.status) {
        alert("Data Successfully exported. Download would start automatically.");
        window.open(data.message);
        return;
      } else {
        alert("Data could not be exported.");
      }
    });
  }

  getLoans() {
    this.loading = true
    this.operationsService.getAutodebitReport(this.currentUser.token, this.filter).subscribe(data => {
      this.loading = false;
      this.rows = data.message;
      if (typeof this.rows !== 'undefined' && this.rows.length > 0) {
        this.resetColumn(data.message[0]);
      }

    });
  }

}
