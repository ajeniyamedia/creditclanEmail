import { Component, OnInit } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms'; 
import { UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';

@Component({
  selector: 'app-generalledger',
  templateUrl: './generalledger.component.html',
  styleUrls: ['./generalledger.component.css']
})
export class GeneralledgerComponent implements OnInit {

  public currentUser: any;
  public loading = false;
  public filter = { DDATE: '', DDATE_: '' }
  public data: any;

  constructor(public fb: FormBuilder, public operationsService: OperationsService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');

  }


  ngOnInit() {
  }

}
