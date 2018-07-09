import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tokenNotExpired } from 'angular2-jwt/angular2-jwt';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public router: Router, private authService:AuthenticationService) { }

  canActivate() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    if( Date.now() > expiresAt){
      // not logged in so redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
    if (localStorage.getItem('currentUser') && tokenNotExpired()) {
      // logged in so return true
      return true;
    }
    const isAllowed: boolean = this.authService.canViewModule(1);
    if (!isAllowed) {
      this.router.navigate(['unauthorized']);
    }else{
      return true;
    }
    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
