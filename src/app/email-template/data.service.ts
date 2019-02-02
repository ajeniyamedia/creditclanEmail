import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';
import { AppError } from './common/app-error';
import { NotFoundError } from './common/not-found-error';
import { BadInput } from './common/bad-input';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  link = 'https://emailmodule.creditclan.com/index.php/Mailservices/';

  constructor(private url: string, private http: Http) { }

  uploadLogo(resource) {
    console.log(resource);
    return this.http.post( this.link + 'updateLogo', resource)
    .map( response  => response.json())
    .catch(this.handleError);
  }

  getVendorInformation(resource) {
    return this.http.post( this.link + 'getVendorInformation', resource)
    .map( response  => response.json())
    .catch(this.handleError);
  }

  getOfferLetterInformation(resource) {
    return this.http.post( this.link + 'getVendorInformation', resource)
    .map( response  => response.json())
    .catch(this.handleError);
  }

  getContent(resource) {
    return this.http.post( this.link + 'getContent', resource)
    .map( response  => response.json())
    .catch(this.handleError);
  }

  getOfferContent(resource) {
    return this.http.post( this.link + 'getContent', resource)
    .map( response  => response.json())
    .catch(this.handleError);
  }

  getOfferLetterContent(resource) {
    return this.http.post( this.link + 'getOfferLetterContent', resource)
    .map( response  => response.json())
    .catch(this.handleError);
  }

  addContent(resource) {
    console.log(resource);
    return this.http.post( this.link + 'updateContent', resource)
    .map( response  => response.json())
    .catch(this.handleError );
  }

  updateFieldSetting(resource) {
    return this.http.post( this.link + 'updateVendorEmailSetting', resource)
    .map( response  => response.json())
    .catch(this.handleError);
  }


  getFieldSetting(resource) {
    return this.http.post( this.link + 'getVendorEmailSetting', resource)
    .map( response  => response.json())
    .catch(this.handleError);
  }


  addSetting(resource) {
    return this.http.post( this.link + 'updateLoanContractSetting', resource)
    .map( response  => response.json())
    .catch(this.handleError);
  }


  getSetting(resource) { 
    return this.http.post( this.link + 'getSetting', resource)
    .map( response  => response.json())
    .catch(this.handleError);
  }


  private handleError(error: Response) {
    if (error.status === 400) {
      return Observable.throw(new BadInput(error.json()));
    }

    if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    }

      return Observable.throw(new AppError(error));
  }
}
