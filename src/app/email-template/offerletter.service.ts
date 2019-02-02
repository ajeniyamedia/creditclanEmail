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
export class OfferletterService {
  url: any;

  constructor( private http: Http) {
    this.url = 'https://emailmodule.creditclan.com/index.php/otpemail/';
   }

   uploadOfferLetterLogo(resource) {
    return this.http.post( this.url + 'updateLogo', resource)
    .map( response  => response.json())
    .catch(this.handleError);
  }

  getVendorInformation(resource) {
    return this.http.post( this.url + 'getVendorInformation', resource)
    .map( response  => response.json())
    .catch(this.handleError);
  }

  addContent(resource) {
    return this.http.post( this.url + 'updateContent', resource)
    .map( response  => response.json())
    .catch(this.handleError );
  }

  getOfferLetterInformation(resource) {
    return this.http.post( this.url + 'getVendorInformation', resource)
    .map( response  => response.json())
    .catch(this.handleError);
  }

  getOfferLetterContent(resource) {
    return this.http.post( this.url + 'getOfferLetterContent', resource)
    .map( response  => response.json())
    .catch(this.handleError);
  }

  addOfferLetterContent(resource) {
    return this.http.post( this.url + 'updateOfferLetterLogo', resource)
    .map( response  => response.json())
    .catch(this.handleError );
  }

  updateFieldSetting(resource) {
    return this.http.post( this.url + 'updateVendorEmailSetting', resource)
    .map( response  => response.json())
    .catch(this.handleError);
  }

  addSetting(resource) {
    return this.http.post( this.url + 'updateOfferLetteSetting', resource)
    .map( response  => response.json())
    .catch(this.handleError);
  }

  addCustomerDetailsSetting(resource) {
    return this.http.post( this.url + 'updateCustomerDetailsSetting', resource)
    .map( response  => response.json())
    .catch(this.handleError);
  }


  getSetting(resource) { 
    return this.http.post( this.url + 'getOfferLetterSetting', resource)
    .map( response  => response.json())
    .catch(this.handleError);
  }

  getCustomerDetails(resource) {
    return this.http.post( this.url + 'getCustomerDetailsSetting', resource)
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
