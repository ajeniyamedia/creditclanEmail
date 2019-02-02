import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Customer } from '../_models/index';
import { AuthenticationService } from './index';

@Injectable()
export class CustomerService {

  constructor(
    public http: Http,
    public authenticationService: AuthenticationService) {
  }
  getCustomers(token: string): Observable<Customer[]> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/customers/getCustomers', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }
  getCustomerByLoan(token: string, id: number): Observable<Customer> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/customer/getCustomerByLoan', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  getCustomerBySavings(token: string, id: number): Observable<Customer> {
    // get users from api
    return this.http.post('https://savings.creditclan.com/api/v2/customer/getCustomer', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  loadCustomerAnalysis(token: string): Observable<Customer> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/customer/loadCustomerAnalysis', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }
  getCustomer(token: string, id: number): Observable<Customer> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/customer/getCustomer', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  searchForCustomers(token: string, account_name: string, type: string): Observable<Customer[]> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/customer/searchForCustomersapi', JSON.stringify({ token: token, account_name: account_name, type: type }))
      .map((response: Response) => response.json());
  }
  getCustomersList(token: string): Observable<Customer[]> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/customer/getCustomersList', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }
  confirmOwner(token:any, ownershipCustomer:any,TRANSFER_ALL_ACCOUNT:any): Observable<Customer> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/customer/confirmOwner', JSON.stringify({ token: token, ownershipCustomer: ownershipCustomer,TRANSFER_ALL_ACCOUNT:TRANSFER_ALL_ACCOUNT }))
      .map((response: Response) => response.json());
  }
  confirmChangeOwner(token:any, ownershipCustomer:any,TRANSFER_ALL_ACCOUNT:any,staff:any,prev_staff:any): Observable<Customer> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/customer/confirmChangeOwner', JSON.stringify({ prev_staff:prev_staff,staff:staff,token: token, ownershipCustomer: ownershipCustomer,TRANSFER_ALL_ACCOUNT:TRANSFER_ALL_ACCOUNT }))
      .map((response: Response) => response.json());
  }
  resendWelcomeEmail(token:any, userId:any): Observable<Customer> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/customer/resendWelcomeEmail', JSON.stringify({ token: token,userId:userId }))
      .map((response: Response) => response.json());
  }
  deleteBorrower(token:any, userId:any): Observable<Customer> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/customer/deleteBorrower', JSON.stringify({ token: token,userId:userId }))
      .map((response: Response) => response.json());
  }
  retryBVNValidation(token:any, cust:any): Observable<Customer> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/customer/retryBVNValidation', JSON.stringify({ token: token,cust:cust }))
      .map((response: Response) => response.json());
  }
  clearBVNRecord(token:any, cust:any): Observable<Customer> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/customer/clearBVNRecord', JSON.stringify({ token: token,cust:cust }))
      .map((response: Response) => response.json());
  }
}
