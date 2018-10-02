import { Component, OnInit, OnDestroy, Input, } from '@angular/core';
import { OptionsserviceService, LoansService, StorageService } from '../../_services/index';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-smslogs',
  templateUrl: './smslogs.component.html',
  styleUrls: ['./smslogs.component.css']
})
export class SmslogsComponent implements OnInit {

  @Input('master') masterName: string;
  public loading = false;
  public calllogs: any;
  public currentUser: any;
  public parentRouteId: number;
  public sub: any;
  searchingLenders = false;
  constructor(public route: ActivatedRoute, public storageService: StorageService, 
    public optionsService: OptionsserviceService, public loansService: LoansService) { }

  ngOnInit() {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.loading = true;
    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      this.loansService.getUserSMSLogs(this.currentUser.token, this.parentRouteId)
        .subscribe(loan => {
          this.calllogs = loan.output;
        });
    });

  }

}
