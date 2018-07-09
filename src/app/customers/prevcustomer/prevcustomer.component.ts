import { Component, OnInit, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../_services/index';
@Component({
  selector: 'app-prevcustomer',
  templateUrl: './prevcustomer.component.html',
  styleUrls: ['./prevcustomer.component.css']
})
export class PrevcustomerComponent implements OnInit {

  @Input('customer') customer:any;

  constructor(public router: Router, private dataService:DataService) { }

  ngOnInit() {
  }

  open_customer(PEOPLE_CUSTOMERS_ID){
    this.router.navigate(['/customer/individual/'+PEOPLE_CUSTOMERS_ID]); 
    this.dataService.reloadCustomer.emit(PEOPLE_CUSTOMERS_ID)
  }

}
