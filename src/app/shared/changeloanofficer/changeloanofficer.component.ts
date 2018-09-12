import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService, UserService, OperationsService, AuthenticationService, StorageService, LoansService,  } from '../../_services/index';
import { FormArray, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OptionsserviceService } from '../../_services/optionsservice.service';
@Component({
  selector: 'app-changeloanofficer',
  templateUrl: './changeloanofficer.component.html',
  styleUrls: ['./changeloanofficer.component.css']
})
export class ChangeloanofficerComponent implements OnInit {
  @Input('loan') loan: any;
  @Input('currentUser') currentUser: any;
  loading = false;
  change_officer_form = {
    SECURITY_QUESTION_ANSWER: '',
    REQUEST_ID: '',
    LOAN_OFFICER: '',
    SEND_EMAIL_NOTIFICATION: false
  };
  officers: any;
  constructor(public toastr: ToastrService, public loansService: LoansService,
    public fb: FormBuilder, public operationsService: OperationsService, 
    public storageService: StorageService, public optionsService: OptionsserviceService) {

  }

  ngOnInit() {
    this.getLoanOfficers();
    this.change_officer_form.REQUEST_ID = this.loan.REQUEST_ID;
    this.change_officer_form.LOAN_OFFICER = this.loan.LOAN_OFFICER;
  }
  getLoanOfficers() {

    this.optionsService.getLoanOfficers(this.currentUser.token)
      .subscribe(data => {
        this.officers = data;
        console.log(data)
      });

  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }
  changeTheLoanOfficer(value, valid) {

    this.loading = true;
    this.operationsService.changeTheLoanOfficer(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === true) {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
}
