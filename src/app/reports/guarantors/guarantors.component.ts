import { Component, OnInit } from '@angular/core'; 
import { UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';

@Component({
  selector: 'app-guarantors',
  templateUrl: './guarantors.component.html',
  styleUrls: ['./guarantors.component.css']
})
export class GuarantorsComponent implements OnInit {

  	public currentUser: any;
    public data: any;
    public rows = [];
    public columns = {};
    objectKeys = Object.keys;

    filter = {};

    constructor( public operationsService: OperationsService, public storageService: StorageService) {
        this.currentUser = this.storageService.read<any>('currentUser');
        this.operationsService.getGuarantorsList(this.currentUser.token, this.filter).subscribe(data => {
            this.rows = data.message;
            this.resetColumn(data.message[0]);
        });
    }

    ngOnInit() {
        this.columns = {
            'Name' : true,
            'Email' : true,
            'Phone' : true,
            'Nationality' : true,
            'Gender' : true,
            'DOB' : true,
            'Marital Status' : true,
            'Passport' : true,
            'Date Added' : true
        }
    }

    // set the keys of the response object as column names on the table
    resetColumn(obj) {
        var cols = {};
        for(var key in obj) {
            cols[key] = true;
        }
        this.columns = cols;
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
