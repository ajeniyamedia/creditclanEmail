import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-creditcheckdetails',
  templateUrl: './creditcheckdetails.component.html',
  styleUrls: ['./creditcheckdetails.component.css']
})
export class CreditcheckdetailsComponent implements OnInit {

  @Input('creditcheckrecord') creditcheckrecord: any;
  @Output('showList') showList = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


  goBackToList() {
    this.showList.emit();
  }

}
