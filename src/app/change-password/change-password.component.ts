import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../_services/index';
import { AuthenticationService } from '../_services/index';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ChangePasswordComponent implements OnInit {

  model: any = {};
  loading = false;
  error = '';
  public currentUser: any;

  constructor(public router: Router,
    public authenticationService: AuthenticationService,
    public storageService: StorageService) {

    this.currentUser = this.storageService.read<any>('currentUser');
  }

  ngOnInit() {
  }

  changePassword() {

    this.loading = true;
    this.authenticationService.changePassword(this.model.newpassword, this.model.confirmpassword, this.currentUser.token)
      .subscribe(result => {
        this.router.navigate(['login']);
      });
  }
}
