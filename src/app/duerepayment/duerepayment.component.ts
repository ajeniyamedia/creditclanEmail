import { Component, OnInit, Input } from '@angular/core'; 
import { OperationsService } from '../_services/operations.service';
@Component({
  selector: 'app-duerepayment',
  templateUrl: './duerepayment.component.html',
  styleUrls: ['./duerepayment.component.css']
})
export class DuerepaymentComponent implements OnInit {
  @Input('currentUser') currentUser:any;
  @Input('repayments') repayments: any;
  public showingSummary = false;
  constructor(public operationsService:OperationsService) { }
  showsum() {
    this.showingSummary = false;
  }
  ngOnInit() {
    this.getDueRepayments();
  }

  getDueRepayments(){
    this.operationsService.getDueRepayments(this.currentUser.token)
      .subscribe(data => {
       this.repayments = data.REPAYMENTS;

      });
  }

}
