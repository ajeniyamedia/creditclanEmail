import { Component, OnInit } from '@angular/core';
import { OptionsserviceService, LoansService, StorageService } from '../../_services/index';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loanrejections',
  templateUrl: './loanrejections.component.html',
  styleUrls: ['./loanrejections.component.css']
})
export class LoanrejectionsComponent implements OnInit {

  rejections: any;
  public parentRouteId: number;
  public sub: any;
  public currentUser: any;
  constructor(public route: ActivatedRoute, public storageService: StorageService,
    public optionsService: OptionsserviceService,
    public loansService: LoansService) {

  }

  ngOnInit() {

    this.currentUser = this.storageService.read<any>('currentUser');
    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      this.loansService.getLoanRejections(this.currentUser.token, this.parentRouteId)
        .subscribe(data => {
          if (data.status == true) {
            this.rejections = data.data.loan_rejections
          }
        });
    });

  }

}
