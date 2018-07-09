import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-originationfee',
  templateUrl: './originationfee.component.html',
  styleUrls: ['./originationfee.component.css']
})
export class OriginationfeeComponent implements OnInit {

  @Input('product') product: any;
  @Output() saveForm = new EventEmitter();
  @Input('fee_settings') fee_settings: any;
  @Input('loading') loading: any;
  @Input('companyaccounts') companyaccounts:any;


  constructor() { }

  ngOnInit() {
  }


  saveFee(value, valid){
    this.saveForm.emit({ value: value, valid: valid });
  }

}
