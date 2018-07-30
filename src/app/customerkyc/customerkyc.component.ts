import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../_services/customers.service';
import { DataService, KycService, StorageService } from '../_services/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customerkyc',
  templateUrl: './customerkyc.component.html',
  styleUrls: ['./customerkyc.component.css']
})
export class CustomerkycComponent implements OnInit {

  @Input('userType') userType; // Type of user
  @Input('userId') userId; // User Id
  public loading = false;
  public kycdetails: any; 
  public currentUser: any;
  view  = 'master';
  kycrecord:any;
  sub:any;

  constructor(private dataService: DataService, public route: ActivatedRoute,
    public storageService: StorageService,
    public kycService:KycService) { }

    ngOnInit() {
      this.loadKYCDetails();
    }
    viewKYCDetails(loan){
      this.view = 'detail';
      this.kycrecord = loan;
    }
    loadKYCDetails() {
      this.currentUser = this.storageService.read<any>('currentUser');
      this.sub = this.route.parent.params.subscribe(params => {
        this.userType = params["type"];
        this.userId = params["id"];
        this.kycService.getCustomerKYC(this.currentUser.token, this.userId)
          .subscribe(data => {
            if(data.status == true){
              this.kycdetails = data.data;
            }else{
  
            }
          });
      });
    }

}
