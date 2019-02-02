import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { OfferModel } from '../_models/offer.model';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'


@Injectable()
export class MarketService {

  constructor(
    public http: Http,
  ) { }
  
  makeOfferToAdvertisedLoan(token: string, offer: OfferModel): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/market/makeOfferToAdvertisedLoan', JSON.stringify({ token: token, offer: offer }))
      .map((response: Response) => response.json());
  }
}
