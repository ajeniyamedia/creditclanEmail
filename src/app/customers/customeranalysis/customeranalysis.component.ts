import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomerService, StorageService } from '../../_services/index';

@Component({
  selector: 'app-customeranalysis',
  templateUrl: './customeranalysis.component.html',
  styleUrls: ['./customeranalysis.component.css']
})
export class CustomeranalysisComponent implements OnInit {
  customers:any;
  public currentUser: any;
  constructor(protected customersSrvc: CustomerService,private storageService:StorageService) { 
    this.currentUser = this.storageService.read<any>('currentUser');
  }

  ngOnInit() {
    this.loadCustomerAnalysis();
  }
  loadCustomerAnalysis(){
    this.customersSrvc.loadCustomerAnalysis(this.currentUser.token).subscribe(data => {
     this.customers = data;
    });
  }
}
