import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { validateConfig } from '@angular/router/src/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(public http: Http) {
  }

  getWebsiteContent(token: any, savings_id: any): Observable<any> {
    return this.http.post('https://savings.creditclan.com/api/v2/',
      JSON.stringify({ token: token, savings_id: savings_id }))
      .map((response: Response) => response.json());
  }

  postLogo(token: any, savings_id: any, data:any): Observable<any> {
    return this.http.post('https://savings.creditclan.com/api/v2/',
      JSON.stringify({ token: token, savings_id: savings_id, request:data }))
      .map((response: Response) => response.json());
  }

  postBgImage(token: any, savings_id: any, data:any): Observable<any> {
    return this.http.post('https://savings.creditclan.com/api/v2/',
      JSON.stringify({ token: token, savings_id: savings_id, request:data }))
      .map((response: Response) => response.json());
  }

  postCallToAction(token: any, savings_id: any, data:any): Observable<any> {
    return this.http.post('https://savings.creditclan.com/api/v2/',
      JSON.stringify({ token: token, savings_id: savings_id, request:data }))
      .map((response: Response) => response.json());
  }

  postCodeSection(token: any, savings_id: any, data:any): Observable<any> {
    return this.http.post('https://savings.creditclan.com/api/v2/',
      JSON.stringify({ token: token, savings_id: savings_id, request:data }))
      .map((response: Response) => response.json());
  }

  postContactSection(token: any, savings_id: any, data:any): Observable<any> {
    return this.http.post('https://savings.creditclan.com/api/v2/',
      JSON.stringify({ token: token, savings_id: savings_id, request:data }))
      .map((response: Response) => response.json());
  }


}
