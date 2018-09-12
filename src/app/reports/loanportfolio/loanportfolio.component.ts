import { Component, OnInit } from '@angular/core';
import { UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';

import { CustomersService } from '../../_services/customers.service';

@Component({
    selector: 'app-loanportfolio',
    templateUrl: './loanportfolio.component.html',
    styleUrls: ['./loanportfolio.component.css']
})
export class LoanportfolioComponent implements OnInit {
    public loading = false;
    public showAdvSearch = false;
    showAdvSearchBody = true;
    public filter_types = [
        {
            'display': 'Date Range',
            'value': 'date_duration'
        },
        {
            'display': 'Customer',
            'value': 'customer'
        },
        // {
        //     'display':'Gender',
        //     'value':'gender'
        // },
        // {
        //     'display':'Loan Officer',
        //     'value':'loan_officer'
        // },
        // {
        //     'display':'Marital Status',
        //     'value':'m_status'
        // },
        // {
        //     'display':'Occupation',
        //     'value':'occupation'
        // },
        // {
        //     'display':'Work Sector',
        //     'value':'work_sector'
        // },
        // {
        //     'display':'Guarantor Provided',
        //     'value':'guarantor'
        // }  ,
        // {
        //     'display':'Loan Status',
        //     'value':'loan_status'
        // }  
        // ,
        {
            'display': 'Company',
            'value': 'company'
        }
    ]
    aggregate = {
        total_count_loans_in_portfolio: '0',
        summary: {
            'total_loans_in_portfolio': '0',
            'total_repayment': '0',
            'total_paid': '0',
            'total_balance': '0'
        },
        total_repayment: '0',
        total_paid: '0',
        total_remaining: '0'
    };
    customers: any;
    occupations: any;
    sectors: any;
    companies: any;
    filterStatus = 'date_duration';
    downloadLinkReceived = false;
    downloadLink = "";
    public currentUser: any;
    public data: any;
    public rows = [];
    public columns = {};
    objectKeys = Object.keys;

    filter = {
        TPDATE: '',
        TPDATE_: '',
        PEOPLE_ID: '',
        LOAN_OFFICER: '',
        GENDER: '',
        FILTER_TYPE: '',
        LOAN_STATUS: '',
        OCCUPATION_ID: '',
        WORK_SECTOR: '',
        MARITAL_STATUS: '',
        GUARANTOR_PROVIDED: '',
        COMPANY: '',
        CUSTOMER: ''
    };
    constructor(public operationsService: OperationsService, public storageService: StorageService,
        protected customersSrvc: CustomersService) {
        this.currentUser = this.storageService.read<any>('currentUser');
    }
    getListOfCustomersInLoans() {
        this.operationsService.getListOfCustomersInLoans(this.currentUser.token).subscribe(data => {
            this.customers = data.people_customer;
        });
    }
    ngOnInit() {
        this.columns = {
            'Customer': true,
            'Email': true,
            'Phone': true,
            'Industry': true,
            'Staff Number': true,
            'Account Number':true,
            'Payment':true,
            'Principal': true,
            'Amount Disbursed':true,
            'Interest Rate': true,
            'Duration': true,
            'Date': true,
            'Installments': true,
            'Total Repayment': true,
            'Monthly Installment': true,
            'Repayment Starts': true,
            'Repayment End': true,
            'Paid': true,
            'Balance': true,
            'Amount Overdue':true,
            'Amount Not Yet Due':true,
            'Next Payment Date':true,
            'Last Due Date':true,
            
        }
        this.getCompanies();
        this.getListOfCustomersInLoans();
    }
    getCompanies() {
        this.customersSrvc.getCompanies(0, 0, {}, {}, {}, {}, this.currentUser.token).subscribe(data => {
            this.companies = data.all_cus.a;
        });
    }
    changeFilter(event) {
        this.filterStatus = event.target.value
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
        this.operationsService.getLoanPortfolio(this.currentUser.token, this.filter).subscribe(data => {
            this.loading = false;
            this.rows = data.message;
            if (typeof this.rows !== 'undefined' && this.rows.length > 0) {
                this.resetColumn(data.message[0]);
            }
            this.aggregate = data.aggregate;

        });
    }

}
