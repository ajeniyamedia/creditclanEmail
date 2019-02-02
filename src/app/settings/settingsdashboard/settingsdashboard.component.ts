import { Component, OnInit } from '@angular/core';
import { OperationsService, StorageService,LoansService } from '../../_services/index';
@Component({
  selector: 'app-settingsdashboard',
  templateUrl: './settingsdashboard.component.html',
  styleUrls: ['./settingsdashboard.component.css']
})
export class SettingsdashboardComponent implements OnInit {
  enable_peer='0';
  constructor(public storageService: StorageService) { 
    this.enable_peer = this.storageService.read<any>('enable_peer_to_peer');
  }

  ngOnInit() {
  }

}
