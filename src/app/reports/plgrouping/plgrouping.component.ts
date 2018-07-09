import { Component, OnInit } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms'; 
import { UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';

@Component({
  selector: 'app-plgrouping',
  templateUrl: './plgrouping.component.html',
  styleUrls: ['./plgrouping.component.css']
})
export class PlgroupingComponent implements OnInit {
  public GROUP_TITLE:''
  public GROUP_CATEGORY:''
  public currentUser: any;
  public loading = false;
  public filter = { PLDDATE: '', PLDDATE_: '', SHOW_ZERO_BALANCE: false }
  public data: any;
  public group = { GROUP_TITLE: '', GROUP_CATEGORY: '', LENDER_ACCOUNT_ID: [] }
  constructor(public fb: FormBuilder, public operationsService: OperationsService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');

  }


  ngOnInit() {
    this.getPLGrouping()
  }
  getPLGrouping() {
    this.operationsService.getPLGrouping(this.currentUser.token)
      .subscribe(data => {
        this.data = data
      });
  }
}
