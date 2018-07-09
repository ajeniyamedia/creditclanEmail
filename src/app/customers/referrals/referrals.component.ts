import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../_services/customers.service';
import { ConstantsService } from '../../_services/constants.service';
import { DataService,StorageService } from '../../_services/index';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.css']
})
export class ReferralsComponent implements OnInit {

  photos = [];
  sub: any;
  userType;
  userId;
  attach_dir;
  currentUser:any;
  showEmptyState:any;
  result:any;
  openedTab: any;
  constructor(public route: ActivatedRoute,
    public DataService: DataService,
    protected constants: ConstantsService,
    protected customersSrvc: CustomersService,
    public storageService:StorageService) { 
      this.currentUser = this.storageService.read<any>('currentUser');
    }


  ngOnInit() {

    this.attach_dir = this.constants.read('attachments');

    this.sub = this.route.parent.params.subscribe(params => {
      this.userType = params["type"];
      this.userId = params["id"];

      this.customersSrvc.getReferrals(this.currentUser.token, this.userId)
      .subscribe(data => {
        this.result = data;
        this.DataService.onProfileNav.emit({ 'location': 'referrals', 'data': data });
      });

    });


  }

 
  showCustomerPreview(event, id) {

    event.preventDefault();

    // If the tab is open, then close it.
    if (this.openedTab == id) {
      this.openedTab = 0;
      return;
    }
else {
      this.openedTab = id;
      return;
    }
  }

}

