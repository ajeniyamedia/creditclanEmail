import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Headers,
  Http,
  RequestOptions,
  Response} from '@angular/http';
import {validateConfig} from '@angular/router/src/config';
import {Observable} from 'rxjs';
import {LoggingService} from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class DecisionService {

  constructor(public http: Http, private loggingService: LoggingService) {}

  addBand(token: any, value: any, band_id:any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/decision/addBand', JSON.stringify({ token: token, band: value, band_id:band_id }))
      .map((response: Response) => response.json());
  }
  deleteBand(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/decision/deleteBand', JSON.stringify({ token: token, band: value }))
      .map((response: Response) => response.json());
  } 
}
