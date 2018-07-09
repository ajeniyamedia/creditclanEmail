import { Component, OnInit } from '@angular/core'; 
import { UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';

@Component({
  selector: 'app-past-maturity',
  templateUrl: './past-maturity.component.html',
  styleUrls: ['./past-maturity.component.css']
})
export class PastMaturityComponent implements OnInit {
    loading=false;
    public showAdvSearch = false;
    showAdvSearchBody=true;
  	public currentUser: any;
    public data: any;
    public rows = [];
    public columns = {};
    public filter_types = [
        
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
        },
        {
            'display':'Overdue By',
            'value':'missed_days'
        }
    ]
    public missed_types = [
        
        {
            'display':'0 - 15',
            'value':'1',
            'lower_range':'0',
             'higher_range':'15'
        },
        {
            'display':'16 - 45',
            'value':'2',
            'lower_range':'16',
             'higher_range':'45'
        },
        {
            'display':'46 - 90',
            'value':'3',
            'lower_range':'46',
             'higher_range':'90'
        },
        {
            'display':'91 - 180',
            'value':'4',
            'lower_range':'91',
             'higher_range':'180'
        }, 
    ]
    objectKeys = Object.keys;
    filter = {
        TPDATE:'',
        TPDATE_:'',
        PEOPLE_ID:'',
        LOAN_OFFICER:'',
        GENDER:'',
        FILTER_TYPE:'',
        LOAN_STATUS:'',
        missed:{}
    };
    aggregate:any;
    customers:any;
    filterStatus='missed_days';
    constructor( public operationsService: OperationsService, public storageService: StorageService ){
        this.currentUser = this.storageService.read<any>('currentUser');
    }
    downloadLinkReceived=false;
    downloadLink="";
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
 


    getLoans(){
        this.loading = true;
        this.operationsService.getPastMaturity(this.currentUser.token, this.filter).subscribe(data => {
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
