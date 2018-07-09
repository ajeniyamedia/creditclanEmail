import { Component, OnInit, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../_services/index';
@Component({
  selector: 'app-nextcustomer',
  templateUrl: './nextcustomer.component.html',
  styleUrls: ['./nextcustomer.component.css']
})
export class NextcustomerComponent implements OnInit {

  @Input('customer') customer:any;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  open_customer(PEOPLE_CUSTOMERS_ID){
    this.router.navigate(['/customer/individual/'+PEOPLE_CUSTOMERS_ID]); 
  }

}
