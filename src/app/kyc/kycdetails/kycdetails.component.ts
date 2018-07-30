import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-kycdetails',
  templateUrl: './kycdetails.component.html',
  styleUrls: ['./kycdetails.component.css']
})
export class KycdetailsComponent implements OnInit {
  @Input('kycrecord') kycrecord:any;
  constructor() { }

  ngOnInit() {
  }

}
