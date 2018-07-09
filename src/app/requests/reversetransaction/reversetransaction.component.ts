import { Component, OnInit, Input, Output } from '@angular/core';
import { UserService, DataService,OperationsService, CustomerService, AuthenticationService, StorageService } from '../../_services/index';
import { LoansService } from '../../_services';
@Component({
  selector: 'app-reversetransaction',
  templateUrl: './reversetransaction.component.html',
  styleUrls: ['./reversetransaction.component.css']
})
export class ReversetransactionComponent implements OnInit {
  @Input('loan') loan:any;
  public is_done="0";
  public loading=false;
  currentUser:any
  constructor(private loansService:LoansService,private storageService:StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
   }

  ngOnInit() {
  }
  reverseContract(loan){
    this.loading = true;
    this.loansService.reverseContract(this.currentUser.token, this.loan.REQUEST_ID)
    .subscribe(data => {
      this.loading=false;
      this.is_done='1';
    });
  }
}
