import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../_services/customers.service';
import { ConstantsService } from '../../_services/constants.service';
import { DataService } from '../../_services/index';

@Component({
  selector: 'app-customerverifications',
  templateUrl: './customerverifications.component.html',
  styleUrls: ['./customerverifications.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerverificationsComponent implements OnInit {

  records = []; // Customer Information
  sub; // Instance of the route subscription
  userType; // Type of user
  userId; // User Id
  cust: any; // Customer Information
  locked = false;
  current = 0;
  showingFinancials = false;
  financialsOpen = "";
  account: any;


  // New Model
  mainSection = true;
  subSection = '';



  openFinance(type) {

    this.financialsOpen = type;
    this.showingFinancials = true;

  }

  constructor(public route: ActivatedRoute,
    public DataService: DataService,
    protected customersSrvc: CustomersService,
    protected constants: ConstantsService) { }

  ngOnInit() {
    this.sub = this.route.parent.params.subscribe(params => {
      this.userType = params["type"];
      this.userId = params["id"];
      this.customersSrvc.getCustomerProfile(this.userType, this.userId).subscribe(data => {
        this.cust = data.cust;

        // Publish section
        this.DataService.onProfileNav.emit({ 'location': 'verification', 'data': data });
      });
    });
  }


  open(section) {
    this.mainSection = false;
    this.subSection = section;
  }
  close() {
    this.mainSection = true;
    this.subSection = '';
  }

}
