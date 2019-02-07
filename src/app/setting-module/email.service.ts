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

  getWebsiteContent(company_id: any): Observable<any> {
    return this.http.
    post('https://emailmodule.creditclan.com/index.php/websiteSetting/getWebsiteInformation',
    {company_id: company_id}).map((response: Response) => response.json());
  }

  postLogo(uploadData): Observable<any> {
    return this.http.post('https://emailmodule.creditclan.com/index.php/websiteSetting/updateLogo', 
    uploadData)
      .map((response: Response) =>  response.json());
  }


  postBgImage(uploadBgImage): Observable<any> {
    console.log(uploadBgImage);
    return this.http
    .post('https://emailmodule.creditclan.com/index.php/websiteSetting/updateBgImg',
    uploadBgImage ).map((response: Response) => response.json());
  }

  postCallToAction(token: any, company_id: any, data: any): Observable<any> {
    return this.http.
    post('https://emailmodule.creditclan.com/index.php/websiteSetting/addCallToAction',
    {token: token, company_id: company_id, call_to_action: data })
      .map((response: Response) => response.json());
  }

  postCodeSection(token: any, company_id: any, data: any): Observable<any> {
    return this.http
    .post('https://emailmodule.creditclan.com/index.php/websiteSetting/updateCodeSection', {
        token: token,
        company_id: company_id,
        website_company_slogan: data.corporateCode,
        website_company_code: data.slogan
      }).map((response: Response) => response.json());
  }

  postContactSection(uploadFooter): Observable<any> {
    console.log(uploadFooter);
    return this.http
    .post('https://emailmodule.creditclan.com/index.php/websiteSetting/updateFooterSection',
    uploadFooter ).map((response: Response) => response.json());
  }


}
