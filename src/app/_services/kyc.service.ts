import { Injectable } from '@angular/core';
import { LoggingService } from "../_services/logging.service";
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class KycService {

  constructor(
    public http: Http,
  ) { }


  getDocumentPickups(token: any, magic_filter: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/kyc/getDocumentPickups', JSON.stringify({ token: token, magic_filter: magic_filter }))
      .map((response: Response) => response.json());
  }
  getKYCs(token: any, magic_filter: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/kyc/getKYCS', JSON.stringify({ token: token, magic_filter: magic_filter }))
      .map((response: Response) => response.json());
  }
  getLoanKYC(token: any, id: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/kyc/getLoanKYCs', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  getCustomerKYC(token: any, id: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/kyc/getCustomerKycs', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
}
