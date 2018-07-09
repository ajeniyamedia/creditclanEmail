import { Component, OnInit, OnDestroy, Output, Input, EventEmitter} from '@angular/core';
import { DataService,StorageService } from '../../_services/index';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../_services/customers.service';
import { ConstantsService } from '../../_services/constants.service';

@Component({
  selector: 'app-referral-statement',
  templateUrl: './referral-statement.component.html',
  styleUrls: ['./referral-statement.component.css']
})
export class ReferralStatementComponent implements OnInit {
  currentUser:any;
  result:any;
  transactions: any;
  total = 0;
  @Input('customer_id') userId: any;
  constructor(public route: ActivatedRoute,
    public DataService: DataService,
    protected constants: ConstantsService,
    protected customersSrvc: CustomersService,
    public storageService:StorageService) { 
      this.currentUser = this.storageService.read<any>('currentUser');
    }

  ngOnInit() {
    this.customersSrvc.getReferralStatement(this.currentUser.token, this.userId)
      .subscribe(data => {
        this.result = data;
        this.DataService.onProfileNav.emit({ 'location': 'referral-statement', 'data': data });
      });
  }

  getTotal(result){
      var total = parseFloat(result) + this.total;
      this.total = total;
      return total;

  }

}
