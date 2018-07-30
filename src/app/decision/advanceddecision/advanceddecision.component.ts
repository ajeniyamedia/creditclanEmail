import { Component, OnInit } from '@angular/core';
import { OperationsService, StorageService, LoansService, DecisionService } from '../../_services/index';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-advanceddecision',
  templateUrl: './advanceddecision.component.html',
  styleUrls: ['./advanceddecision.component.css']
})
export class AdvanceddecisionComponent implements OnInit {

  currentUser: any;
  analytics_settings: any;
  decision_groups = {
    USE_REMITA: true,
    STILL_USE_REMITA: true,
    USE_CREDITCLAN: true,
    STILL_USE_CREDITCLAN: true,
    USE_CREDITCHECK: true,
    STILL_USE_CREDITCHECK: true,
    CREDITCLAN_REFRESH_DAYS: true,
    CREDITCHECK_REFRESH_DAYS: true,
    REMITA_REFRESH_DAYS: true
  };
  loading = false;
  constructor(public toastr: ToastrService, public storageService: StorageService,
    public operationsService: OperationsService,
    public decisionService: DecisionService) {
    this.currentUser = this.storageService.read<any>('currentUser');
  }

  ngOnInit() {
    this.getDecisionGroups(this.currentUser);
  }
  getDecisionGroups(currentUser) {
    this.decisionService.getDecisionGroups(this.currentUser.token).subscribe(data => {
      this.decision_groups = {
        USE_REMITA: data.data.decision_groups.USE_REMITA,
        STILL_USE_REMITA: data.data.decision_groups.STILL_USE_REMITA,
        USE_CREDITCLAN: data.data.decision_groups.USE_CREDITCLAN,
        STILL_USE_CREDITCLAN: data.data.decision_groups.STILL_USE_CREDITCLAN,
        USE_CREDITCHECK: data.data.decision_groups.USE_CREDITCHECK,
        STILL_USE_CREDITCHECK: data.data.decision_groups.STILL_USE_CREDITCHECK,
    CREDITCLAN_REFRESH_DAYS: data.data.decision_groups.CREDITCLAN_REFRESH_DAYS,
    CREDITCHECK_REFRESH_DAYS: data.data.decision_groups.CREDITCHECK_REFRESH_DAYS,
    REMITA_REFRESH_DAYS: data.data.decision_groups.REMITA_REFRESH_DAYS
      };
    });
  }
  saveDecisionGroups(value, valid) {
    this.loading = true;
    this.decisionService.saveDecisionGroups(this.currentUser.token, value).subscribe(data => {
      this.loading = false;
      if (data.status == true) {
        this.showSuccess(data.message)
      }
    });
  }

  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }
}
