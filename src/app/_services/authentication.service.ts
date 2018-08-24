import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, of } from 'rxjs';
import { LenderModel } from '../_models/lender.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public token: string;
  public account_id: string;
  public role: string;
  public lender_id: string;
  public legal_name: string;
  public platform_settings: any;

  constructor(private http: Http) {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  public getUserRoles(): any {
    return localStorage.getItem('roles');
  }

  public canViewModule(roles: any): boolean {
    let isAllowed = false;
    const user = this.getUserRoles().split(',');
    const allowedGroups = roles.split(',');

    if (user !== null && user !== undefined) {
      try {
        if (user !== undefined && user !== null && user.length > 0) {
          try {
            user.forEach((e: any) => {
              if (allowedGroups.indexOf(e) > -1) {
                isAllowed = true;
              }
            });
          } catch (e) {
            if (allowedGroups.indexOf(user) > -1) {
              isAllowed = true;
            }
          }
        }
      } catch (e) {
        isAllowed = false;
      }
    }
    return isAllowed;
  }

  changePassword(newpassword: string, confirmpassword: string, token: string) {

    return this.http.post('https://dataupload.creditclan.com/api/v2/loan/changePassword',
      JSON.stringify({ newpassword: newpassword, confirmpassword: confirmpassword, token: token }));
  }
  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }
  forgot(email: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/loan/forgot', JSON.stringify({ email: email }))
      .map((response: Response) => response.json());
  }
  login(email: string, password: string): Observable<boolean> {
    return this.http.post('https://dataupload.creditclan.com/api/v2/loan/token', JSON.stringify({ email: email, password: password, grant_type: "password" }))
      .map((response: Response) => {
        localStorage.removeItem('currentUser');
        // login successful if there's a jwt token in the response
        const token = response.json() && response.json().token;
        const account_id = response.json() && response.json().account_id;
        const role = response.json() && response.json().role;
        const legal_name = response.json() && response.json().legal_name;
        const photo = response.json() && response.json().photo;
        const icon = response.json() && response.json().icon;
        const enable_peer_to_peer = response.json() && response.json().enable_peer;
        const enable_accounting = response.json() && response.json().enable_accounting;
        const roles = response.json() && response.json().roles;
        const platform = response.json() && response.json().platform;
        const user_id = response.json() && response.json().account_id;
        const is_company_staff = response.json() && response.json().is_company_staff;
        const company_id = response.json() && response.json().company_id;
        const test_mode = response.json() && response.json().test_mode;
        const decision_type = response.json() && response.json().decision_type;
        const has_remita = response.json() && response.json().has_remita;
        if (token) {
          // set token property
          this.token = token;
          this.account_id = account_id;
          this.role = role;
          this.legal_name = legal_name;
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ is_company_staff: is_company_staff, company_id: company_id, photo: photo, email: email, token: token, role: role, account_id: account_id, legal_name: legal_name, icon: icon, platform: platform }));
          localStorage.setItem('token', token);
          localStorage.setItem('id_token', token);
          localStorage.setItem('enable_peer_to_peer', enable_peer_to_peer);
          localStorage.setItem('enable_accounting', enable_accounting);
          localStorage.setItem('roles', roles);
          localStorage.setItem('platform', platform);
          localStorage.setItem('user_id', user_id);
          localStorage.setItem('is_company_staff', is_company_staff);
          localStorage.setItem('company_id', company_id);
          localStorage.setItem('test_mode', test_mode);
          
          localStorage.setItem('has_remita', has_remita);
          localStorage.setItem('decision_type', decision_type);
          const type_of_view = localStorage.getItem('type_of_view');
          if (!type_of_view) {
            localStorage.setItem('type_of_view', '1');
          }
          const expiresAt = JSON.stringify((60 * 60 * 1000) + Date.now());
          localStorage.setItem('expires_at', expiresAt);
          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }
  serializeParams(obj) {
    let str = '';
    for (var key in obj) {
      if (str != '') {
        str += '&';
      }
      str += key + '=' + obj[key];
    }
    return str;
  }
  signup_(lender: LenderModel): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    return this.http.post('https://dataupload.creditclan.com/api/v2/onboard', this.serializeParams(lender), options)
      .map((response: Response) => {
        localStorage.removeItem('currentUser');
        // login successful if there's a jwt token in the response
        let status = response.json() && response.json().status;
        if (status === false) {
          return response.json();
        } else {
          let token = response.json() && response.json().token;
          let account_id = response.json() && response.json().account_id;
          let role = response.json() && response.json().role;
          let photo = response.json() && response.json().photo;
          let enable_peer_to_peer = response.json() && response.json().enable_peer;
          let enable_accounting = response.json() && response.json().enable_accounting;
          let icon = response.json() && response.json().icon;
          if (token) {
            // set token property
            this.token = token;
            this.account_id = account_id;
            this.role = role;
            this.legal_name = lender.LEGAL_NAME;
            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify({ icon: icon, photo: photo, email: lender.EMAIL, token: token, role: role, account_id: account_id, legal_name: lender.LEGAL_NAME }));
            localStorage.setItem('token', token);
            localStorage.setItem('id_token', token);
            localStorage.setItem('enable_peer_to_peer', enable_peer_to_peer);
            localStorage.setItem('enable_accounting', enable_accounting);
            let type_of_view = localStorage.getItem('type_of_view');
            if (!type_of_view) {
              localStorage.setItem('type_of_view', '1');
            }
            const expiresAt = JSON.stringify((60 * 60 * 1000) + Date.now());
            localStorage.setItem('expires_at', expiresAt);
            // return true to indicate successful login
            return response.json();
          } else {
            // return false to indicate failed login
            return response.json();
          }
        }

      });
  }
  signup(lender: any): Observable<any> {

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({ headers: headers });
    return this.http.post('https://dataupload.creditclan.com/api/v2/onboard', this.serializeParams(lender), options)
      .map((response: Response) => {
        localStorage.removeItem('currentUser');
        // login successful if there's a jwt token in the response
        let status = response.json() && response.json().status;
        if (status === false) {
          return response.json();
        } else {
          let token = response.json() && response.json().token;
          let account_id = response.json() && response.json().account_id;
          let role = response.json() && response.json().role;
          let photo = response.json() && response.json().photo;
          let enable_peer_to_peer = response.json() && response.json().enable_peer;
          let enable_accounting = response.json() && response.json().enable_accounting;
          let icon = response.json() && response.json().icon;
          if (token) {
            // set token property
            this.token = token;
            this.account_id = account_id;
            this.role = role;
            this.legal_name = lender.LEGAL_NAME;
            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify({ icon: icon, photo: photo, email: lender.EMAIL, token: token, role: role, account_id: account_id, legal_name: lender.LEGAL_NAME }));
            localStorage.setItem('token', token);
            localStorage.setItem('id_token', token);
            localStorage.setItem('enable_peer_to_peer', enable_peer_to_peer);
            localStorage.setItem('enable_accounting', enable_accounting);
            let type_of_view = localStorage.getItem('type_of_view');
            if (!type_of_view) {
              localStorage.setItem('type_of_view', '1');
            }
            const expiresAt = JSON.stringify((60 * 60 * 1000) + Date.now());
            localStorage.setItem('expires_at', expiresAt);
            // return true to indicate successful login
            return response.json();
          } else {
            // return false to indicate failed login
            return response.json();
          }
        }

      });

  }
}
