import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AppConfig } from '../app.config';
import { AuthenticationService } from '../_services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  error = '';

  constructor(public router: Router,
    public authenticationService: AuthenticationService,
    private toastr: ToastrService) {

  }
  showSuccess(msg) {
    this.toastr.success(msg);
  }
  showError(msg) {
    this.toastr.error(msg);
  }
  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }
  login() {
    this.loading = true;
    this.authenticationService.login(this.model.email, this.model.password)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['/credit/creditdashboard']);
        } else {
          this.showError('Unable to login');
          this.loading = false;
        } 
      });
  }
}
