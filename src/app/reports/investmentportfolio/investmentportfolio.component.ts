import { Component, OnInit } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';

@Component({
  selector: 'app-investmentportfolio',
  templateUrl: './investmentportfolio.component.html',
  styleUrls: ['./investmentportfolio.component.css']
})
export class InvestmentportfolioComponent implements OnInit {
  public currentUser: any;
  public loading = false;
  public filter = { NEXT: '0', index: '1', prev: '0', next: '20', TPINV_OFF: '', IS_ACTIVE: '1', TPDATE: '', TPDATE_: '', TPINV_CAT: '', TPINV_PRO: '', TP_ENTITY: '', TPINV_SUBCAT: '', TP_BORROWER_ID_INV: '' }
  public data: any;
  public acc_off: any;
  public investment_products: any;
  public people_customers: any;
  public showFilter = false;
  objectKeys = Object.keys;
  public rows = []; 
    missedDays = new Array(365);
  public columns = {
                      "Investor" : true,
                      "Amount" : true,
                      "Tenor" : true,
                      "Rate" : true,
                      "Date" : true,
                      "Maturity" : true,
                      "TTM" : true,
                      "Interest Due" : true,
                      "WHT" : true,
                      "Maturity Value" : true,
                      "Accrued Interest Payable" : true,
                      "Concentration" : true,
                    }

  constructor(public fb: FormBuilder, public operationsService: OperationsService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.operationsService.getOptionsForReport(this.currentUser.token).subscribe(data => {
      this.acc_off = data.accoff;
      this.investment_products = data.investment_products;
      this.people_customers = data.peoples;
    });
  }

  ngOnInit() {
    this.getInvestmentPortfolio();
  }

  getInvestmentPortfolio() {
    this.operationsService.getInvestmentPortfolio(this.currentUser.token, this.filter).subscribe(data => {
      // this.acc_off = data.accoff;
      // this.investment_products = data.investment_products;
      // this.people_customers=data.peoples;
      this.data = data
      this.filter.index = data.index;
      this.filter.prev = data.prev;
      this.filter.NEXT = data.next;
      console.log(data.expenses.b.COUNTAB)
    });
  }

  public selected(value: any): void {
    console.log('Selected value is: ', value);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  public refreshValue(value: any): void {
    this.filter.TP_BORROWER_ID_INV = value;
  }
  
    exportReport(){
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

        // Send to the server
        this.operationsService.exportReport(this.currentUser.token, {'report': 'due_loans', 'rows': rows, 'field_names': field_names}).subscribe(data => {
            if (data.status) {
                alert("Data Successfully exported. Download would start automatically.");
                window.open(data.message);
                return;
            }else{
                alert("Data could not be exported.");
            }
        });
    }
}
