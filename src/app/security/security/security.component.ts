import { Component, OnInit } from '@angular/core';
import { DataService } from '../../_services/index';
import { OptionsserviceService, LoansService, StorageService, OperationsService, AuthenticationService } from '../../_services/index';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  loading = false;
  questions: any;
  currentUser: any;
  model = {
    security_question: '',
    confirmpassword: ''
  }
  error = '';
  constructor(public toastr: ToastrService,
    private optionsService: OptionsserviceService,
    private storageService: StorageService,
    private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    this.getQuestions();
  }
  getQuestions() {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.optionsService.getSecurityQuestions(this.currentUser.token).subscribe(data => this.questions = data.questions);
  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }
  changeSecurityQuestion() {

    this.loading = true;
    this.authenticationService.changeSecurityQuestion(this.model, this.currentUser.token)
      .subscribe(result => {
        this.loading = false;
        if (result.status) {
          this.showSuccess(result.message)
        } else {
          this.showError(result.message)
        }
      });
  }
}
