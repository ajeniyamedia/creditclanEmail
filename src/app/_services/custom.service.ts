import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {
  Headers,
  Http,
  RequestOptions,
  Response
} from '@angular/http';
import { validateConfig } from '@angular/router/src/config';
import { Observable } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  private postsUrl = 'http://137.117.105.90/dataupload_test/api/v2/';

  constructor(public http: Http, private loggingService: LoggingService) { }

  getAllCustomers(token: any, start:any, searchTerm:any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/custom/allCustomers', JSON.stringify({ token: token, start:start, searchTerm:searchTerm }))
      .map((response: Response) => response.json());
  }
}
