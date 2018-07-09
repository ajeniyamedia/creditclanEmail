import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CustomerService, StorageService, DataService } from '../_services/index';

@Component({
  selector: 'app-borrowerid',
  templateUrl: './borrowerid.component.html',
  styleUrls: ['./borrowerid.component.css']
})
export class BorroweridComponent implements OnInit {

  @Input('parentRouteId') loanId: any;
  @Input('type') type = "1";
  @Input('investment') investment: any;
  public borrower: any;
  public currentUser: any;

  constructor(public customerService: CustomerService,
    public storageService: StorageService,
    private DataService: DataService) { 
      this.DataService.borrowerChange.subscribe(res => {
        this.loanId = res;
        console.log(1)
        this.getLoan();
      })
    }

  ngOnInit() {
    this.getLoan();
  }

  getLoan(){
    this.currentUser = this.storageService.read<any>('currentUser');
    if (this.type == '2') {
    } else {
      this.customerService.getCustomerByLoan(this.currentUser.token, this.loanId)
        .subscribe(customer => {

          this.borrower = customer;
        });
    }
  }

  enlargeProfileImg() {
    this.DataService.onOpenLoanChildModal.emit({ 'location': 'profile_picture', data: { img: this.borrower['FILE_NAME'] } });
  }


}
