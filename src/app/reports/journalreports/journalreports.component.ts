import { Component, OnInit } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';

@Component({
  selector: 'app-journalreports',
  templateUrl: './journalreports.component.html',
  styleUrls: ['./journalreports.component.css']
})
export class JournalreportsComponent implements OnInit {

  public currentUser: any;
  public loading = false;
  public filter = { token: '', NEXT: '-1', prev: '', next: '', DDATE: '', DDATE_: '' }
  public data: any;

  constructor(public fb: FormBuilder, public operationsService: OperationsService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.filter.token = this.currentUser.token;
  }


  ngOnInit() {
    this.getJournalReports()
  }
  getJournalReports() {
    this.operationsService.getJournalReports(this.currentUser.token, this.filter).subscribe(data => {

      this.data = data
      this.filter.NEXT = data.next;

    });
  }
}
