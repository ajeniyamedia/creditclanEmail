import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { Customer, Investment } from '../_models/index';
import { AuthenticationService } from './index';

@Injectable()
export class InvestmentService {

  constructor(
    public http: Http,
    public authenticationService: AuthenticationService) {
  }
  getInvestments(token: string, customer_id: number): Observable<Investment[]> {
    // get customer investments from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/investment/getInvestments', JSON.stringify({ token: token, customer_id: customer_id }))
      .map((response: Response) => response.json());
  }
}
