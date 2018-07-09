import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../_services/customers.service';
import { DataService } from '../../_services/index';

@Component({
  selector: 'app-customer-social',
  templateUrl: './customer-social.component.html',
  styleUrls: ['./customer-social.component.css']
})

export class CustomerSocialComponent implements OnInit {

  resp = { fb: {
    img:'',
    id:'',
    date:''
  }, twitter: {
    date:'',
    id:'',
    img:''
  }, linkedin: {
    date:'',
    id:'',
    img:''
  } };
  sub; // Instance of the route subscription
  userType;
  userId;

  constructor(public route: ActivatedRoute,
    public DataService: DataService,
    protected customersSrvc: CustomersService) { }

  // Load linked social accounts for this user
  ngOnInit() {
    this.sub = this.route.parent.params.subscribe(params => {
      this.userType = params["type"];
      this.userId = params["id"];
      this.customersSrvc.getSocial(this.userId).subscribe(data => {
        this.resp = data;

        // Publish section
        this.DataService.onProfileNav.emit({ 'location': 'social_links', 'data': data });
      });
    });
  }

}
