import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService, LoansService, OperationsService,DataService } from '../../_services/index';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  loading = false;
  notifications: any;
  currentUser: any;
  subb: any;
  parentRouteId: any;

  constructor(public operationsService: OperationsService, public toastr: ToastrService,
    public router: Router, public route: ActivatedRoute,
    public loansService: LoansService, public storageService: StorageService,
    public dataService:DataService) {
    this.parentRouteId = route.snapshot.parent.params['id'];
  }

  ngOnInit() {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.loansService.getCustomerPayments(this.currentUser.token, this.parentRouteId)
      .subscribe(result => {
        this.notifications = result.data;
      });
  }
  acceptPayment(notify) {
    this.dataService.acceptBorrowerPayment.emit({notify:notify});
  }
  rejectPayment(notify) {
    this.dataService.rejectBorrowerPayment.emit({notify:notify});
  }
}
