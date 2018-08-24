import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AppConfig } from '../app.config';
import { AuthenticationService } from '../_services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

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
  }
  forgot() {
    this.loading = true;
    this.authenticationService.forgot(this.model.email)
      .subscribe(result => {
        this.loading = false;
        this.showSuccess(result.message); 
      });
  }

}
