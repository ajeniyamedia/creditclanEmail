import { Component, OnInit, Input, ViewChild, HostListener, ViewEncapsulation } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { DataService, OptionsserviceService, UserService, LoansService, AuthenticationService, StorageService,KycService } from '../../_services/index';
import { IonRangeSliderComponent } from "ng2-ion-range-slider";
import { Inject } from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  summaryOpen=false
  magic_filter = {
    account_officer:'0',
    searchText:'',
    reset:false,
    kyc_type:'',
    status:'',
    period:{
      from:'',
      to:''
    }
  }
  today = new Date()
  ordering: string ='DATE_ADDED';
  reverse=false;
  orderingText="Most Recent"
  public statuses = [
    { value: '0', display: 'Pending' },
    { value: '1', display: 'Completed' }
  ];
  loading=false;
  kycs:any;
  public currentUser: any;
  constructor(private kycService:KycService,public storageService:StorageService,public router:Router) { 
    this.currentUser = this.storageService.read<any>('currentUser');
  }

  ngOnInit() {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.magic_filter.period.from = firstDay.toISOString().split('T')[0]
    this.magic_filter.period.to = lastDay.toISOString().split('T')[0]
    this.magic_filter.status =this.statuses[0].value
    this.getKycs()
  }
  searchForKYc(){
    this.getKycs()
  }
  getKycs(){
    this.loading = true;
    this.kycService.getDocumentPickups(this.currentUser.token, this.magic_filter)
      .subscribe(kycs => {
      this.magic_filter.reset=false;
      if (kycs.status == false) {
        this.router.navigate(['/login']);
      } else {
        this.loading = false;
        this.kycs = kycs; 
      }
    });
  }
  gotoKycs(){
    this.router.navigate(['kyc']);
  }
  orderingBy(type){
    if(type==='1'){
      this.ordering = 'DATE_ADDED';
      this.reverse = false;
      this.orderingText="Most Recent"
    }
    if(type==='2'){
      this.ordering = 'LEGAL_NAME';
      this.reverse = false;
      this.orderingText="Name A - Z"
    }
    if(type==='3'){
      this.ordering = 'LEGAL_NAME';
      this.reverse = true;
      this.orderingText="Name Z - A"
    }
    if(type==='4'){
      this.ordering = 'REQUEST_PRINCIPAL';
      this.reverse = true;
      this.orderingText="Amount High - Low"
    }
    if(type==='5'){
      this.ordering = 'REQUEST_PRINCIPAL';
      this.reverse = false;
      this.orderingText="Amount Low - High"
    }
    if(type==='6'){
      this.ordering = 'REQUEST_TENOR_IN_DAYS';
      this.reverse = true;
      this.orderingText="Duration High - Low"
    }
    if(type==='7'){
      this.ordering = 'REQUEST_TENOR_IN_DAYS';
      this.reverse = false;
      this.orderingText="Duration Low - High"
    }
  }

}
