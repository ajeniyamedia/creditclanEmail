import { Component, OnInit } from '@angular/core';
import { ApprovalsService,StorageService } from '../_services/index';

@Component({
  selector: 'app-myapprovals',
  templateUrl: './myapprovals.component.html',
  styleUrls: ['./myapprovals.component.css']
})
export class MyapprovalsComponent implements OnInit {
  public loading = true;
  private approvals:any;
  public currentUser: any;
  constructor(public appService:ApprovalsService,public storageService: StorageService) { 
    this.currentUser = this.storageService.read<any>('currentUser');
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.appService.getApprovals(this.currentUser.token).subscribe(approvals => {
      this.approvals=approvals;
    });
  }

}
