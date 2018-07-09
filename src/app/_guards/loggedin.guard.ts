import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
@Injectable()
export class LoggedinGuard implements CanActivate {
  constructor(public router: Router) { }

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/credit/creditdashboard']);
    }
    return false;
  }
}

