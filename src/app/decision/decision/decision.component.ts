import { Component, OnInit } from '@angular/core';
import { OperationsService, StorageService, LoansService, DecisionService } from '../../_services/index';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-decision',
  templateUrl: './decision.component.html',
  styleUrls: ['./decision.component.css']
})
export class DecisionComponent implements OnInit {
  decision = {
    'DECISION_TYPE': '1'
  };
  currentUser: any;
  loading = false;
  constructor(public toastr: ToastrService, public storageService: StorageService,
    public operationsService: OperationsService,
    public decisionService: DecisionService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    
  }

  ngOnInit() {
    this.decision.DECISION_TYPE = this.storageService.read<any>('decision_type');
    
  }
  saveDecisionSettings() {
    this.loading = true;
    this.decisionService.saveDecisionSettings(this.currentUser.token, this.decision).subscribe(data => {
      this.loading = false;
      if (data.status == true) {
        this.showSuccess(data.message)
        localStorage.setItem('decision_type', this.decision.DECISION_TYPE);
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
