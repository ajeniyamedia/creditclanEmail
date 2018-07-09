import { Component, OnInit, OnDestroy, EventEmitter, Output, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, CustomerService, StorageService, OperationsService } from '../../_services/index';

@Component({
  selector: 'app-empsearch',
  templateUrl: './empsearch.component.html',
  styleUrls: ['./empsearch.component.css']
})
export class EmpsearchComponent implements OnInit {
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
  selected: any;
  slenders = [];
  @Output() lenderChosen = new EventEmitter();
  constructor(private DataService: DataService, public storageService: StorageService,public customerServ:CustomerService, public operationsService:OperationsService) {
    
    this.currentUser = this.storageService.read<any>('currentUser');
     
  }

  ngOnInit() {
  }
  chooseLender(lender) {
    this.selected = lender;
    this.lender_selected = true;
    this.lenderChosen.emit(this.selected); 
  }
  lookforlenders() {
    this.operationsService.lookforemployees(this.currentUser.token, this.lender_name)
      .subscribe(lenders => {
        if (lenders.count == 0) {
          this.slenders = [];
        } else {
          this.slenders = lenders.lenders;
        }

      });
  }
}
