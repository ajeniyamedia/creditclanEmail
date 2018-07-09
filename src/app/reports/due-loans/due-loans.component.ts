import { Component, OnInit } from '@angular/core'; 
import { UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';

@Component({
  selector: 'app-due-loans',
  templateUrl: './due-loans.component.html',
  styleUrls: ['./due-loans.component.css']
})

export class DueLoansComponent implements OnInit {
    loading=false;
  	public currentUser: any;
    public data: any;
    public rows = [];
    public columns = {};
    public showAdvSearch = false;
    showAdvSearchBody=true;
    public filter_types = [
        {
            'display':'Date Range',
            'value':'date_duration'
        },
        {
            'display':'Customer',
            'value':'customer'
        },
        {
            'display':'Gender',
            'value':'gender'
        },
        {
            'display':'Loan Officer',
            'value':'loan_officer'
        },{
            'display':'Loan Status',
            'value':'loan_status'
        }
    ]
    aggregate:any;
    customers:any;
    filterStatus='date_duration';
    downloadLinkReceived=false;
    downloadLink="";
    objectKeys = Object.keys;
    filter = {
        TPDATE:'',
        TPDATE_:'',
        PEOPLE_ID:'',
        LOAN_OFFICER:'',
        GENDER:'',
        FILTER_TYPE:'',
        LOAN_STATUS:''
    };
    
    constructor( public operationsService: OperationsService, public storageService: StorageService) {
        this.currentUser = this.storageService.read<any>('currentUser');
    }
    
    ngOnInit() {
        this.columns = {
            'Name' : true,
            'Loan#' : true,
            'Principal' : true,
            'Paid' : true,
            'Due' : true,
            'Status' : true,
            'Last Payment' : true
        }
    }
    changeFilter(event){
       this.filterStatus=event.target.value
    }
    // Process Result
    setRows($res){
        // let rows = [];
        // for (var i = 0; i < res.length; i++) {
        //     let row = {};
        //     row['LEGAL_NAME'] = res[i]['people_object']['LEGAL_NAME'];
        //     row['LEGAL_NAME'] = res[i]['people_object']['LEGAL_NAME'];
        //     row['LEGAL_NAME'] = res[i]['people_object']['LEGAL_NAME'];
        //     rows.push(row);
        // }
        // this.rows = rows;
    }

    // Set the Keys of the response object as Column names on the table
    resetColumn(obj) {
        var cols = {};
        for (var key in obj) {
            cols[key] = true;
        }
        this.columns = cols;
    }

    getDueLoans(){
        this.loading = true;
        this.operationsService.getDueLoans(this.currentUser.token, this.filter).subscribe(data => {
            this.loading = false;
            this.rows = data.message;
            if (typeof this.rows !== 'undefined' && this.rows.length > 0) {
                this.resetColumn(data.message[0]);
            }   
            this.aggregate = data.aggregate;
            
            if(!this.showAdvSearch){
                this.customers = data.customers
            }         
            this.showAdvSearch = true;
            
            
        });
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
        this.downloadLinkReceived=false;
        this.downloadLink = '';
        // Send to the server
        this.operationsService.exportReport(this.currentUser.token, {'report': 'due_loans', 'rows': rows, 'field_names': field_names}).subscribe(data => {
            if (data.status) {

                this.downloadLinkReceived = false;
                this.downloadLink = data.message;
                alert("Data Successfully exported. Download would start automatically.");
                window.open(data.message);
                return;
            }else{
                alert("Data could not be exported.");
            }
        });
    }

}
