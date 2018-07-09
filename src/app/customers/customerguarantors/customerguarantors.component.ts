import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../_services/customers.service';
import { ConstantsService } from '../../_services/constants.service';
import { DataService } from '../../_services/index';

@Component({
  selector: 'app-customerguarantors',
  templateUrl: './customerguarantors.component.html',
  styleUrls: ['./customerguarantors.component.css']
})
export class CustomerguarantorsComponent implements OnInit {
  guarantors = []; // Customer Information
  sub; // Instance of the route subscription
  userType; // Type of user
  userId; // User Id
  cust: any; // Customer Information 
  gua_count = '0';
  constructor(public route: ActivatedRoute,
    protected customersSrvc: CustomersService,
    public DataService: DataService,
    protected constants: ConstantsService) { }

  ngOnInit() {
    this.sub = this.route.parent.params.subscribe(params => {
      this.userType = params["type"];
      this.userId = params["id"];
      this.customersSrvc.getCustomerGuarantors(this.userId).subscribe(data => {
        this.guarantors = data.data;
        this.gua_count = data.gua_count;
        // Publish nav
        this.DataService.onProfileNav.emit({ 'location': 'guarantors', 'data': data.data.length });
      });
    });
  }


}
