import 'rxjs/add/operator/map'

import { Injectable } from '@angular/core';
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
export class RemitaService {

  constructor(public http: Http, private loggingService: LoggingService) { }

  getRemitaSettings(token: any): Observable<any> {
    // get users from api
    return this.http.post('https://remita.creditclan.com/settings/connection', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }
  saveRemitaConnectionSettings(token: any, value:any): Observable<any> {
    // get users from api
    return this.http.post('https://remita.creditclan.com/settings/save_connection', JSON.stringify({ token: token, data:value }))
      .map((response: Response) => response.json());
  }
}
