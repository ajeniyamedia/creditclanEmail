import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class HttpHelperService {

  constructor(public router: Router) { }

  // Include Common Options in request header
  public setOptions(headers: Headers) {
    headers.append('X-Platform', 'p2p');
    headers.append('Access-Control-Allow-Credentials', 'true');
    return new RequestOptions({ headers: headers, withCredentials: true });
  }

  /**
  * This handles the response from the server. 
  * Also checks to ensure that the user still has an active session on the server.
  */
  public extractData(res) {
    let loginExpired = res.headers.get('X-Exit');
    if (loginExpired != null) {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/']);
      return {};
    } else {
      return res.json();
      // let body = res.json();
      // return body.data || { };
    }
  }

  // This handles any errors that may be encountered in the processing
  public handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
