import { Component, OnInit, OnDestroy, EventEmitter, Output, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, CustomerService, StorageService, OperationsService } from '../_services/index';
 

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.css']
})
export class CrmComponent implements OnInit {
  action = '0'
  ownershipCustomer:any;
  owningStaff:any;
  currentUser:any;
  TRANSFER_ALL_ACCOUNT=false
  loading = false;
  is_done='0';
  lender_name="";
  adding = false;
  lender_selected = false;
  chosen_lender=false
  selected: any;
  slenders = []; 
  constructor(private DataService: DataService, public storageService: StorageService,public customerServ:CustomerService, public operationsService:OperationsService) {
    this.DataService.onTakeOwnership.subscribe(res => {
       
      this.action = '1';
      this.ownershipCustomer = res; 
    })
    this.DataService.onchangeOwnership.subscribe(res => {
      
     this.action = '2';
     this.ownershipCustomer = res; 
   })
    this.currentUser = this.storageService.read<any>('currentUser');
     
  }

  ngOnInit() {
  }
  
  closeChildModal(){
    this.action="0";
  }
  confirmOwner(currentUser,customer){
    this.loading = true;
    this.customerServ.confirmOwner(this.currentUser.token, this.ownershipCustomer,this.TRANSFER_ALL_ACCOUNT)
    .subscribe(lenders => {
      this.loading = false; 
      this.is_done='1'
      this.DataService.reloadCustomers.emit();
    });
  }
  confirmChangeOwner(currentUser,customer){
    this.loading = true;
    this.customerServ.confirmChangeOwner(this.currentUser.token, this.ownershipCustomer,this.TRANSFER_ALL_ACCOUNT,this.selected,this.ownershipCustomer.ACCOUNT_OFFICER)
    .subscribe(lenders => {
      this.loading = false;
      //this.action='0'
      this.is_done='1'
      this.DataService.reloadCustomers.emit();
    });
  }
  chooseLender(event) {
    this.selected = event;
    this.chosen_lender=true
  }
}
