import 'rxjs/add/operator/map'

import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { validateConfig } from '@angular/router/src/config';
import { Observable } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root' 
})
export class SavingsService {

  constructor(public http: Http, private loggingService: LoggingService) { }

  getAppSettings(token: any, where_from: any = '0'): Observable<any> {
    // get users from api
    return this.http.post('https://savings.creditclan.com/api/v2/operations/getAppSettings', JSON.stringify({ token: token, where_from: where_from }))
      .map((response: Response) => response.json());
  }
  saveGeneralInvestmentSettings(token: any, data:any): Observable<any> {
    // get users from api
    return this.http.post('https://savings.creditclan.com/api/v2/operations/saveGeneralInvestmentSettings', JSON.stringify({ token: token, data: data }))
      .map((response: Response) => response.json());
  }
  savePrematurityBreaking(token: any, data:any): Observable<any> {
    // get users from api
    return this.http.post('https://savings.creditclan.com/api/v2/operations/savePrematurityBreaking', JSON.stringify({ token: token, data: data }))
      .map((response: Response) => response.json());
  }
  deleteLevel(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://savings.creditclan.com/api/v2/operations/deleteLevel', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveLevel(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://savings.creditclan.com/api/v2/operations/saveLevel', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveMobileApplication(token: any, value: any, required_documents:any): Observable<any> {
    // get users from api
    return this.http.post('https://savings.creditclan.com/api/v2/operations/saveMobileApplication', JSON.stringify({ token: token, data: value,required_documents: required_documents }))
      .map((response: Response) => response.json());
  }
  getInvProducts(token: any): Observable<any> {
    // get users from api
    return this.http.post('https://savings.creditclan.com/api/v2/products/getInvProducts', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }
  suspendInvProduct(token: any, loan_product_id: any,action:any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/product/suspend_product', JSON.stringify({ token: token, loan_product_id: loan_product_id,action:action }))
      .map((response: Response) => response.json());
  }
  
  saveInvProduct(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/product/save_product', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  filterLoans(token: any, magic_filter: any, sectors: any, approval_levels: any, statuses: any, durations: any, request_date: any): Observable<any> {
    // get users from api
    return this.http.post('https://savings.creditclan.com/api/v2/savings/filterSavings', JSON.stringify({ token: token, magic_filter: magic_filter, sectors: sectors, approval_levels: approval_levels, statuses: statuses, durations: durations, request_date: request_date }))
      .map((response: Response) => response.json());
  }
  filterFixed(token: any, magic_filter: any, sectors: any, approval_levels: any, statuses: any, durations: any, request_date: any): Observable<any> {
    // get users from api
    return this.http.post('https://savings.creditclan.com/api/v2/savings/filterPending', JSON.stringify({ token: token, magic_filter: magic_filter, sectors: sectors, approval_levels: approval_levels, statuses: statuses, durations: durations, request_date: request_date }))
      .map((response: Response) => response.json());
  }
  getSavings(token: any, savings_id: any): Observable<any> {
    console.log(savings_id)
    return this.http.post('https://savings.creditclan.com/api/v2/savings/getSavings', JSON.stringify({ token: token, savings_id: savings_id }))
      .map((response: Response) => response.json());
  }
  getSavingsWithSchedule(token: any, savings_id: any): Observable<any> {
    console.log(savings_id)
    return this.http.post('https://savings.creditclan.com/api/v2/savings/getSavingsSchedule', JSON.stringify({ token: token, savings_id: savings_id }))
      .map((response: Response) => response.json());
  }
  saveContract(token: any, savings_id: any, data:any): Observable<any> {
    return this.http.post('https://savings.creditclan.com/api/v2/savings/saveContract', JSON.stringify({ token: token, savings_id: savings_id, request:data }))
      .map((response: Response) => response.json());
  }
  postSavings(token: any, savings_id: any, data:any): Observable<any> { 
    return this.http.post('https://savings.creditclan.com/api/v2/savings/postSavings', JSON.stringify({ token: token, savings_id: savings_id, request:data }))
      .map((response: Response) => response.json());
  }
  getRequestTimeline(token: string, id: number): Observable<any> {
    // get users from api
    return this.http.post('https://savings.creditclan.com/api/v2/timeline/getRequestTimeline', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  saveNotes(token: string, id: number, note: any): Observable<any> {
    // get users from api
    return this.http.post('https://savings.creditclan.com/api/v2/timeline/save_note', JSON.stringify({ token: token, id: id, note: note }))
      .map((response: Response) => response.json());
  }
  getStatement(token: string, id: number, statement_type: any, type_of_entry: any): Observable<any> {
    // get users from api
    return this.http.post('https://savings.creditclan.com/api/v2/savings/getStatement', JSON.stringify({ type_of_entry: type_of_entry, token: token, id: id, statement_type: statement_type }))
      .map((response: Response) => response.json());
  }
}

