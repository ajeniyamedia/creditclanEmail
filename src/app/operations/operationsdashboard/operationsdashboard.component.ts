import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { AnonymousSubscription } from "rxjs/Subscription";
import { ChatService } from "../../_services/chat.service";
import { Router } from '@angular/router';
import { OptionsserviceService, UserService, LoansService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';
@Component({
  selector: 'app-operationsdashboard',
  templateUrl: './operationsdashboard.component.html',
  styleUrls: ['./operationsdashboard.component.css']
})
export class OperationsdashboardComponent implements OnInit {
  public canViewModule = true;
  public currentUser: any;
  private timerSubscription: AnonymousSubscription;
  private postsSubscription: AnonymousSubscription;
  public dashboarddata: any;
  public preloading: any;
  showingAvgLRate = false;
  constructor(public authService:AuthenticationService,public storageService: StorageService, public router: Router, public operationsService: OperationsService) {
    if(!authService.canViewModule('1,3,5')){
      this.router.navigate(['../unauthorized']);
    }
    this.currentUser = this.storageService.read<any>('currentUser');
    
  }

  ngOnInit() {
    
    this.refreshData();
  }
  private refreshData(): void {
    this.postsSubscription = this.operationsService.refreshData(this.currentUser.token).subscribe(data => {
      this.dashboarddata = data
    });
  }
  public ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  private subscribeToData(): void {
    this.timerSubscription = Observable.timer(1800000).first().subscribe(() => this.refreshData());
  }
  public go_to_wallet() {
    this.router.navigate(['../operations/wallet']);
  }
  public go_to_c_wallet() {
    this.router.navigate(['../operations/customer_wallet']);
  }
  public go_to_banks() {
    this.router.navigate(['../operations/banks']);
  }
  public go_to_emps() {
    this.router.navigate(['../operations/employees']);
  }
  public go_to_queue() {
    this.router.navigate(['../operations/queue']);
  }
}
