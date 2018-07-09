import { Component, OnInit } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';

@Component({
    selector: 'app-collectionsreport',
    templateUrl: './collectionsreport.component.html',
    styleUrls: ['./collectionsreport.component.css']
})
export class CollectionsreportComponent implements OnInit {

    public currentUser: any;
    public data: any;
    public rows = [];
    public columns = {};
    objectKeys = Object.keys;

    constructor(public fb: FormBuilder, public operationsService: OperationsService, public storageService: StorageService) {
        this.currentUser = this.storageService.read<any>('currentUser');
        // this.operationsService.getDueLoans(this.currentUser.token).subscribe(data => {
        //     console.log(data);
        // });
    }

    ngOnInit() {

        this.rows = [{"females": 557000, "country": "United States", "age": 85, "males": 336000, "year": 2010, "total": 893000},
                    {"females": 504000, "country": "United States", "age": 86, "males": 290000, "year": 2010, "total": 794000}, 
                    {"females": 451000, "country": "United States", "age": 87, "males": 246000, "year": 2010, "total": 697000}, 
                    {"females": 398000, "country": "United States", "age": 88, "males": 208000, "year": 2010, "total": 606000}, 
                    {"females": 347000, "country": "United States", "age": 89, "males": 173000, "year": 2010, "total": 521000}, 
                    {"females": 297000, "country": "United States", "age": 90, "males": 140000, "year": 2010, "total": 437000}, 
                    {"females": 247000, "country": "United States", "age": 91, "males": 108000, "year": 2010, "total": 355000}, 
                    {"females": 202000, "country": "United States", "age": 92, "males": 81100, "year": 2010, "total": 283000}, 
                    {"females": 164000, "country": "United States", "age": 93, "males": 61000, "year": 2010, "total": 225000}, 
                    {"females": 131000, "country": "United States", "age": 94, "males": 46300, "year": 2010, "total": 178000}, 
                    {"females": 101000, "country": "United States", "age": 95, "males": 33400, "year": 2010, "total": 134000}, 
                    {"females": 72700, "country": "United States", "age": 96, "males": 22700, "year": 2010, "total": 95400}, 
                    {"females": 50300, "country": "United States", "age": 97, "males": 14500, "year": 2010, "total": 64800}, 
                    {"females": 35000, "country": "United States", "age": 98, "males": 8730, "year": 2010, "total": 43700}, 
                    {"females": 25200, "country": "United States", "age": 99, "males": 4920, "year": 2010, "total": 30100}, 
                    {"females": 51200, "country": "United States", "age": 100, "males": 9570, "year": 2010, "total": 60800}];


      this.columns = {
                        "females" :  true,
                        "country" : true,
                        "age" : true,
                        "males" : true,
                        "year" : true,
                        "total" : true
                      }
    }

}
