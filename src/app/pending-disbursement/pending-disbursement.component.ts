import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-pending-disbursement',
  templateUrl: './pending-disbursement.component.html',
  styleUrls: ['./pending-disbursement.component.css']
})
export class PendingDisbursementComponent implements OnInit {

  @Input('disbursements') disbursements: any;
  public count;
  public current = 0;
  public currentKey = 0;
  constructor() { }

  ngOnInit() {
    this.count = this.disbursements.count;
    this.current = this.disbursements.result[0].PAYMENT_QUEUE_ID;

    Observable.interval(3000).subscribe(x => {
      this.whatsNext();
      this.changeCurrent(this.disbursements.result[this.currentKey].PAYMENT_QUEUE_ID);

    });
  }
  changeCurrent(id) {
    this.current = id;
  }
  whatsNext() {
    if (this.currentKey == Object.keys(this.disbursements).length - 1) {

      this.currentKey = 0;
    } else {
      this.currentKey = this.currentKey + 1;
    }
  }
}
