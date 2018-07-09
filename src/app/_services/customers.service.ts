import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ConstantsService } from './constants.service';
import { HelperService } from './helper.service';
import { HttpHelperService } from './http-helper.service';
import { Observable } from 'rxjs/Observable';
import { UserService, CustomerService, AuthenticationService, StorageService, InvestmentService, LoansService, OptionsserviceService } from './index';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()

export class CustomersService {

  public api_base: string;
  public currentUser: any;

  constructor(public http: Http,
    public constant: ConstantsService,
    public helper: HelperService,
    public httpHelper: HttpHelperService,
    public customerService: CustomerService,
    public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.api_base = this.constant.read('api_base');
  }


  // Send message
  sendMessage(f, userType, userId): Observable<any> {
    return this.http.post(this.api_base + 'customer/sendMessage', JSON.stringify({ f: f, userType: userType, customer_id: userId, token: this.currentUser.token }))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }


  // Load information about a set of customers based on the category provided
  getCustomers(category, start,magic_filter,durations,sector,occupation): Observable<any> {
    let options = this.httpHelper.setOptions(new Headers());
    //return this.http.get(this.api_base+'customers_/index_/'+category+'/'+this.currentUser.token)
    return this.http.post(this.api_base + 'customer/getCustomersList', JSON.stringify({ term:magic_filter.searchText,sector:sector,occupation:occupation,durations:durations,magic_filter:magic_filter,token: this.currentUser.token, start: start, category: category }))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }
  getCustomersList(category, start,magic_filter,durations,sector,occupation,currentUser): Observable<any> {
    let options = this.httpHelper.setOptions(new Headers());
    //return this.http.get(this.api_base+'customers_/index_/'+category+'/'+this.currentUser.token)
    return this.http.post(this.api_base + 'customer/getCustomersList', JSON.stringify({ currentUser:currentUser,term:magic_filter.searchText,sector:sector,occupation:occupation,durations:durations,magic_filter:magic_filter,token: this.currentUser.token, start: start, category: category }))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }
  
  getCompanies(category, start,magic_filter,durations,sector,occupation,token): Observable<any> {
    let options = this.httpHelper.setOptions(new Headers());
    //return this.http.get(this.api_base+'customers_/index_/'+category+'/'+this.currentUser.token)
    return this.http.post(this.api_base + 'company/list', JSON.stringify({ term:magic_filter.searchText,sector:sector,occupation:occupation,durations:durations,magic_filter:magic_filter,token: this.currentUser.token, start: start, category: category }))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }

  // Load preview information on customers
  getNextPrev(id): Observable<any> {
    let action = ''; 
    let options = this.httpHelper.setOptions(new Headers());
    return this.http.post(this.api_base + 'customer/nextprev', JSON.stringify({ token: this.currentUser.token,id:id }))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }
  getCustomerPreview(category, id): Observable<any> {
    let action = '';
    if (category == 'individual') {
      action = 'peep/individual/' + id + '/';
    } else {
      action = 'peep/corporate/' + id + '/';
    }

    let options = this.httpHelper.setOptions(new Headers());
    return this.http.post(this.api_base + 'customer/' + action, JSON.stringify({ token: this.currentUser.token }))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }

  // Load customer information
  getCustomerProfile(category, id): Observable<any> {
    let action = '';
    if (category == 'individual') {
      action = 'profile/individual/' + id;
    } else {
      action = 'profile/corporate/' + id;
    }

    let options = this.httpHelper.setOptions(new Headers());
    return this.http.post(this.api_base + 'customer/' + action, JSON.stringify({ token: this.currentUser.token }))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }

  /**
  * Loads Various categories of customer information
  * Id is an encrypted string, while I'm not sure what acct represents.
  */
  // getCustomerData(act, id, userType, userId, current): Observable<any>{
  // 	let headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
  // 	let options = this.httpHelper.setOptions(headers);
  //     return this.http.post(this.api_base+'customers_/customerrecord/'+act,
  //     				 	  { id: id, act: act, customer_id : userId,token:this.currentUser.token,current:current }, options)
  //                     .map(this.httpHelper.extractData)
  //                     .catch(this.httpHelper.handleError);
  // }

  getCustomerData(act, id, userType, userId, current): Observable<any> {
    return this.http.post(this.api_base + 'customer/getMessage/', JSON.stringify({ id: id, act: act, customer_id: userId, token: this.currentUser.token, current: current }))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }


  // Load Attachments 
  getAttachments(act, id, userType, userId, current): Observable<any> {
    return this.http.post(this.api_base + 'customer/getAttachments/', JSON.stringify({ id: id, act: act, customer_id: userId, token: this.currentUser.token, current: current }))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }


  // Load customer loan
  getLoans(id, start): Observable<any> {
    let options = this.httpHelper.setOptions(new Headers());
    return this.http.post(this.api_base + 'customer/getLoans/' + id, JSON.stringify({ token: this.currentUser.token, start: start }))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }


  // Load customer loan
  getSocial(id): Observable<any> {
    let options = this.httpHelper.setOptions(new Headers());
    return this.http.post(this.api_base + 'customer/getSocial/' + id, JSON.stringify({ token: this.currentUser.token }))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }

  // Get Loan Guarantors
  getCustomerGuarantors(id): Observable<any> {
    let options = this.httpHelper.setOptions(new Headers());
    return this.http.post(this.api_base + 'loan/getLoanGuarantors/', JSON.stringify({ token: this.currentUser.token, people_id: id, id: '' }))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }

  // Load customer bank accounts
  getBanks(id): Observable<any> {
    let options = this.httpHelper.setOptions(new Headers());
    return this.http.post(this.api_base + 'customer/getBankAccount/' + id, JSON.stringify({ token: this.currentUser.token }))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }


  // Load customer financials
  getFinancials(category, id): Observable<any> {
    let options = this.httpHelper.setOptions(new Headers());
    return this.http.post(this.api_base + 'customer/financials/' + category + '/' + id + '/', JSON.stringify({ token: this.currentUser.token }))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }


  // Load customer financials
  getPhotos(category, id): Observable<any> {
    return this.http.post(this.api_base + 'customer/photos/' + category + '/' + id + '/', JSON.stringify({ token: this.currentUser.token }))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }
  saveAllCountries(country: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/options/saveAllCountries', {country:country})
      .map((response: Response) => response.json());
  }
  // Load customer referrals
  getReferrals(token, id): Observable<any> {
    return this.http.post(this.api_base + 'customer/getCustomerReferral/', JSON.stringify({ token: token, id:id }))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }

  // Load customer referrals statement
  getReferralStatement(token, id): Observable<any> {
    return this.http.post(this.api_base + 'customer/getCustomerReferralStatement/', JSON.stringify({ token: token, id:id }))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }



  // Load customer Investments
  getInvestments(id, start): Observable<any> {
    let options = this.httpHelper.setOptions(new Headers());
    return this.http.post(this.api_base + 'customer/getInvestments/' + id, JSON.stringify({ token: this.currentUser.token, start: start }))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }

  getCustomerSettings(id, token): Observable<any> {
    let options = this.httpHelper.setOptions(new Headers());
    return this.http.post(this.api_base + 'customer/getCustomerSettings/', JSON.stringify({ token: token, id: id }))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }
  saveUSSD(token,value): Observable<any> {
    let options = this.httpHelper.setOptions(new Headers());
    return this.http.post(this.api_base + 'customer/saveUSSD/', JSON.stringify({ token: token, value: value }))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }
  suspendCustomer(token,value,user_id): Observable<any> {
    let options = this.httpHelper.setOptions(new Headers());
    return this.http.post(this.api_base + 'customer/suspendCustomer/', JSON.stringify({ token: token, value: value,user_id:user_id }))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }
  saveUserRatings(token,value,userid): Observable<any> {
    let options = this.httpHelper.setOptions(new Headers());
    return this.http.post(this.api_base + 'customer/saveUserRatings/', JSON.stringify({ token: token, value: value, userid:userid }))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }
  /**
  * Load customer information for update
  */
  getCustomerUpdateData(category, id) {
    let action = '';
    if (category == 'individual') {
      action = 'update_indi/' + id;
    } else {
      action = 'update/' + id;
    }
    let options = this.httpHelper.setOptions(new Headers());
    return this.http.post(this.api_base + 'customer/' + action, JSON.stringify({ token: this.currentUser.token }))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }


  /**
  * Load other sections of information for individual update
  * Custoemr information are gotten in two sections. First, the basic informaiton followed by the other needed information
  */
  getIndividualExtraData(id) {
    // let headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
    //    let options = this.httpHelper.setOptions(headers);
    //    return this.http.post(this.api_base+'customer/update_pri/'+this.currentUser.token,
    //    				 	  this.helper.serialize({PEOPLE_ID: id, is_edit: 1, token:this.currentUser.token}), options)
    //                    .map(this.httpHelper.extractData)
    //                    .catch(this.httpHelper.handleError);

    let options = this.httpHelper.setOptions(new Headers());
    return this.http.post(this.api_base + 'customer/update_pri/', JSON.stringify({ PEOPLE_ID: id, is_edit: 1, token: this.currentUser.token }))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);

  }

  getCustomerPeoples(company_id:any,start:any){
    let data = {
      token:this.currentUser.token,
      company_id:company_id,
      start:start
    }
    return this.http.post(this.api_base + 'customer/getCompanyPeople/', JSON.stringify(data))
    .map(this.httpHelper.extractData)
    .catch(this.httpHelper.handleError);
  }
  /**
  * Update Customer Basic Information
  */
  updateBasicInfo(data) {
    data['token'] = this.currentUser.token;
    return this.http.post(this.api_base + 'customer/update_profile_basic/', JSON.stringify(data))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }
  
  updateBasicInfoNew(data,currentUser) { 
    return this.http.post(this.api_base + 'customer/update_profile_basic/', JSON.stringify({data:data,token:currentUser}))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }
  updateNokNew(data,currentUser,people_id) { 
    return this.http.post(this.api_base + 'customer/update_profile_noka/', JSON.stringify({data:data,token:currentUser,people_id:people_id}))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }
  updateEduNew(data,currentUser,people_id) { 
    return this.http.post(this.api_base + 'customer/update_profile_edu_new/', JSON.stringify({data:data,token:currentUser,people_id:people_id}))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }
  updateAddressNew(data,currentUser,people_id) { 
    return this.http.post(this.api_base + 'customer/update_profile_address_new/', JSON.stringify({data:data,token:currentUser,people_id:people_id}))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }
  getCompanyInterest(data:any){
    data['token'] = this.currentUser.token;
    return this.http.post(this.api_base + 'company/get_company_interest/', JSON.stringify(data))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }
  saveCompanyInterest(company_interest:any){
    company_interest['token'] = this.currentUser.token;
    return this.http.post(this.api_base + 'company/save_company_interest/', JSON.stringify(company_interest))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }
  updateCompanyPhone(company_phone:any) {
    company_phone['token'] = this.currentUser.token;
    return this.http.post(this.api_base + 'company/update_phone/', JSON.stringify(company_phone))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }
  updateCompanyAddress(company_address:any) {
    company_address['token'] = this.currentUser.token;
    return this.http.post(this.api_base + 'company/update_address/', JSON.stringify(company_address))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }
  saveCompanyBasic(data) {
    data['token'] = this.currentUser.token;
    return this.http.post(this.api_base + 'company/create/', JSON.stringify(data))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }
  /**
  * Update Address Informatino
  */
  updateAddress(data) {
    data['token'] = this.currentUser.token;
    return this.http.post(this.api_base + 'customer/update_profile_address/', JSON.stringify(data))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }

  /**
  * Update Work Informatino
  */
  updateWork(data) {
    data['token'] = this.currentUser.token;
    return this.http.post(this.api_base + 'customer/update_profile_work/', JSON.stringify(data))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }
  updateWorkNew(data,currentUser,people_id) {
    return this.http.post(this.api_base + 'customer/update_profile_work_new/', JSON.stringify({data:data,token:currentUser,people_id:people_id}))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }

  // Update Expense Information
  updateExpense(data) {
    data['token'] = this.currentUser.token;
    return this.http.post(this.api_base + 'customer/update_profile_expense/', JSON.stringify(data))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }


  /**
  * Update ID card Information
  */
  updateId(data) {
    data['token'] = this.currentUser.token;
    return this.http.post(this.api_base + 'customer/update_profile_id/', JSON.stringify(data))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }

  /**
  * Update Next of Kin
  */
  updateNok(data) {
    data['token'] = this.currentUser.token;
    return this.http.post(this.api_base + 'customer/update_profile_nok/', JSON.stringify(data))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }


  /**
  * Update Education Information
  */
  updateEducation(id, data) {
    data['token'] = this.currentUser.token;
    data['id'] = id;
    return this.http.post(this.api_base + 'customer/update_education/', JSON.stringify(data))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }


  _uploadFile(url: string, params: Array<string>, formData) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      var loc = this.api_base + url;
      xhr.open("POST", loc, true);
      xhr.send(formData);
    });
  }


  // Upload Statement and payslip
  uploadStatement(data) {
    data['token'] = this.currentUser.token;
    return this.http.post(this.api_base + 'customer/updateFinancials/', JSON.stringify(data))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }


  // Add Bank Account
  addBank(data) {
    data['token'] = this.currentUser.token;
    return this.http.post(this.api_base + 'customer/update_profile_nok/', JSON.stringify(data))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }



  /**
  * Update Phone Number
  */
  updatePhone(data) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = this.httpHelper.setOptions(headers);
    return this.http.post(this.api_base + 'customers_/add_phone_number/',
      this.helper.serialize(data), options)
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }

  /*
  * Registers a Director on the server for addition to the director list of a corporate customer profile
  */
  registerDirector(data) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = this.httpHelper.setOptions(headers);
    return this.http.post(this.api_base + 'customers_/addDirEntry/',
      this.helper.serialize(data), options)
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);

  }

  /**
  * Adds an already registerd director
  */
  addDirector(userId) {
    let data = { PEOPLE_ID: userId };
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = this.httpHelper.setOptions(headers);
    return this.http.post(this.api_base + 'customers_/updateDirectors/',
      this.helper.serialize(data), options)
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }

  /**
  * Delete a director from the list of directors registered to a company
  */
  deleteDirector(directorId) {
    let data = { KEY: directorId };
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = this.httpHelper.setOptions(headers);
    return this.http.post(this.api_base + 'customers_/removeDirEnty/',
      this.helper.serialize(data), options)
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }

  /**
  * Search Customer
  */
  searchCustomers(data) {
    let options = this.httpHelper.setOptions(new Headers());
    data['token'] = this.currentUser.token;
    return this.http.post(this.api_base + 'customer/getCustomersList', JSON.stringify(data))
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);

  }

  /**
  * Navigate Search List
  */
  navigateCustomers(direction, data) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = this.httpHelper.setOptions(headers);
    return this.http.post(this.api_base + 'customers_/navigate/' + direction,
      this.helper.serialize(data), options)
      .map(this.httpHelper.extractData)
      .catch(this.httpHelper.handleError);
  }


}
