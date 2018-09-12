import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class OptionsserviceService {

  constructor(public http: Http) { }

  getCountries(): Observable<any> {
    // get users from api
    return this.http.get('assets/country.json')
      .map((response: Response) => response.json());
  }
  getLoanDurationns(): Observable<any> {
    // get users from api
    return this.http.get('assets/duration.json')
      .map((response: Response) => response.json());
  }
  getProductDocuments(id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/options/getProductDocuments', JSON.stringify({ id: id }))
      .map((response: Response) => response.json());
  }
  
  getDefaultBank(token: string): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/options/getDefaultBank', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }
  getSecurityQuestions(token: string): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/options/getSecurityQuestions', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  } 
  getOccupation(type: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/options/getOccupation', JSON.stringify({ type: type }))
      .map((response: Response) => response.json());
  }
  getCompanies(token:any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/company/all', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }
  getApprovalLevels(token: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/options/getApprovalLevels', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }
  getFeesLists(id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/options/getList', JSON.stringify({ id: id }))
      .map((response: Response) => response.json());
  }
  getLoanOfficers(token: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/options/getLoanOfficers', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }
  getYears(): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/options/getYears', JSON.stringify({ }))
      .map((response: Response) => response.json());
  }
  getDocTypes(): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/options/getDocTypes', JSON.stringify({ }))
      .map((response: Response) => response.json());
  }
}
