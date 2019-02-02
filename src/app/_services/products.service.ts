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

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(public http: Http) { }
  saveGuarantorRequirements(token: any, value: any, sectors: any, occupations: any, marital_status: any, states: any, guarantors: any, guarantor_requirements: any,default_docs_guarantors:any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/product/saveGuarantorRequirements', JSON.stringify({ default_docs_guarantors:default_docs_guarantors,guarantor_requirements: guarantor_requirements, guarantors: guarantors, marital_status: marital_status, states: states, sectors: sectors, occupations: occupations, token: token, data: value }))
      .map((response: Response) => response.json());
  }
  getLoanProducts(token: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/product/getLoanProducts', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }
  getProductSettings(product_id: any, token: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/product/product_settings', JSON.stringify({ product_id: product_id, token: token }))
      .map((response: Response) => response.json());
  }
  get_product(product_id: any, token: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/product/get_product', JSON.stringify({ product_id: product_id, token: token }))
      .map((response: Response) => response.json());
  }
  suspendLoanProduct(token: any, loan_product_id: any,action:any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/product/suspend_product', JSON.stringify({ token: token, loan_product_id: loan_product_id,action:action }))
      .map((response: Response) => response.json());
  }
  
  saveLoanProduct(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/product/save_product', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveFee(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/product/save_fee', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveInterest(value: any,token: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/product/save_interest', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveContract(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/product/save_contract', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveMobile(token: any, value: any, required_documents:any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/product/save_mobile', JSON.stringify({ token: token, data: value, required_documents:required_documents }))
      .map((response: Response) => response.json());
  }
  saveTCSettings(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/product/save_tc', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveOLSettings(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/product/save_ol', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  updateLoanProduct(token: any, value: any, product_id:any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/product/update_product', JSON.stringify({ token: token, data: value, product_id:product_id }))
      .map((response: Response) => response.json());
  }
}
