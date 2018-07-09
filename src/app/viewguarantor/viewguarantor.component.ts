import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { OptionsserviceService, LoansService, StorageService } from '../_services/index'; 
import { Loan } from '../_interfaces/loan.interface';
import { Loan_ } from '../_models/loan_';

@Component({
  selector: 'app-viewguarantor',
  templateUrl: './viewguarantor.component.html',
  styleUrls: ['./viewguarantor.component.css']
})
export class ViewguarantorComponent implements OnInit {

  @Input('guarantor_request_id') guarantor_request_id: any;
  @Output() uploaded: EventEmitter<string> = new EventEmitter();
  public questions: any;
  public requester: any;
  public people_id: any;
  constructor(public storageService: StorageService, 
    public optionsService: OptionsserviceService, public loansService: LoansService) {
  }
  public currentUser: any;
  ngOnInit() {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.loansService.viewLoanGuarantor(this.currentUser.token, this.guarantor_request_id)
      .subscribe(guarantors => {
        this.questions = guarantors.data.questions;
        this.requester = guarantors.data.REQUESTER;
        this.people_id = guarantors.data.gurequest.PEOPLE_ID;
      });
  }
  uploadComplete() {
    this.uploaded.emit(this.people_id);
  }
}
