import 'rxjs/add/operator/map'

import {Injectable} from '@angular/core';
import {Headers,
        Http,
        RequestOptions,
        Response} from '@angular/http';
import {validateConfig} from '@angular/router/src/config';
import {Observable} from 'rxjs';

import {LoggingService} from './logging.service';
import { RoleModel } from '../_models/role.model';

@Injectable()
export class OperationsService {



  constructor(public http: Http, private loggingService: LoggingService) {}

  saveGeneralAnalytics(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('http://app.creditclan.com/dataupload/api/v2/operations/saveGeneralAnalyticsSettings', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }

  saveAnalytics(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('http://app.creditclan.com/dataupload/api/v2/analytics/saveAnalyticsSettings', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }

  autoPostServices(token: any): Observable<any> {
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/autoPostServices', JSON.stringify({ token: token }))
      .map(res => res.json())
      .catch(this.loggingService.handleError);
  }
  refreshData(token: any): Observable<any> {
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/refreshData', JSON.stringify({ token: token }))
      .map(res => res.json())
      .catch(this.loggingService.handleError);
  }
  getEducationDetails(token: any): Observable<any> {
    // get users from api
    return this.http.post('http://app.creditclan.com/dataupload_test/api/v2/operations/getEducationDetails', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }

  getBankDetails(token: any): Observable<any> {
    // get users from api
    return this.http.post('http://app.creditclan.com/dataupload_test/api/v2/operations/getBankDetails', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }

  getJobDetails(token: any): Observable<any> {
    // get users from api
    return this.http.post('http://app.creditclan.com/dataupload_test/api/v2/operations/getJobDetails', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }

  getJobSector(token: any): Observable<any> {
    // get users from api
    return this.http.post('http://app.creditclan.com/dataupload_test/api/v2/operations/getJobSector', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }
  getBanks(token: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getBanks', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }
  bulkpaystatus(token: any, bulkpayrequests: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/bulkpaystatus', JSON.stringify({ bulkpayrequests: bulkpayrequests, token: token }))
      .map((response: Response) => response.json());
  }
  getAccounts(token: any, start: any, search: any, type: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getAccounts', JSON.stringify({ search: search, type: type, start: start, token: token }))
      .map((response: Response) => response.json());
  }
  saveEmployee(token: any, data: any, people_people_id: any, isedit: any,roles:any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveEmployee', JSON.stringify({ roles:roles,data: data, isedit: isedit, people_people_id: people_people_id, token: token }))
      .map((response: Response) => response.json());
  }
  saveEmployeeCompany(token: any, data: any, company_id: any, is_edit:any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/company/saveEmployee', JSON.stringify({ token:token,data: data, company_id: company_id,isedit:is_edit }))
      .map((response: Response) => response.json());
  }
  saveRole(role:RoleModel,token:any,is_edit:any,role_id:any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/employee/saveRole', JSON.stringify({ is_edit:is_edit,role_id:role_id,role: role, token: token }))
      .map((response: Response) => response.json());
  }
  getCompanyEmployees(token: any, start: any, search: any, company_id:any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/company/getEmployees', JSON.stringify({ search: search, start: start, token: token,company_id:company_id }))
      .map((response: Response) => response.json());
  }
  getEmployees_(token: any, start: any, search: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getEmployees', JSON.stringify({ search: search, start: start, token: token }))
      .map((response: Response) => response.json());
  }
  getRoles(token: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/employee/getRoles', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }
  getBanks_(token: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getCompanyBanks', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }
  getNigerianBanks(token: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getNigerianBanks', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }
  saveJournal(token: any, data: any, edit: any) {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveJournal', JSON.stringify({ token: token, data: data, edit: edit }))
      .map((response: Response) => response.json());
  }
  approveJournal(token: any, data: any, edit: any) {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/approveJournal', JSON.stringify({ token: token, data: data, edit: edit }))
      .map((response: Response) => response.json());
  }
  rejectJournal(token: any, data: any, edit: any) {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/rejectJournal', JSON.stringify({ token: token, data: data, edit: edit }))
      .map((response: Response) => response.json());
  }
  confirmBankAccount(token: any, bank: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/confirmBankAccount', JSON.stringify({ token: token, bank: bank }))
      .map((response: Response) => response.json());
  }
  resolve_bvn(token: any, bvn: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/resolve_bvn', JSON.stringify({ token: token, bvn: bvn }))
      .map((response: Response) => response.json());
  }
  confirmBankAccounts(token: any, bank: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/confirmBankAccounts', JSON.stringify({ token: token, bank: bank }))
      .map((response: Response) => response.json());
  }
  doWalletTransfer(token: any, payment_queue: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/doWalletTransfer', JSON.stringify({ token: token, payment_queue: payment_queue }))
      .map((response: Response) => response.json());
  }
  getRecords(token: any, account_id: any, record_type: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getRecords', JSON.stringify({ token: token, account_id: account_id, record_type: record_type }))
      .map((response: Response) => response.json());
  }
  getInvestmentPortfolio(token: any, filter: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getInvestmentPortfolio', JSON.stringify({ token: token, filter: filter }))
      .map((response: Response) => response.json());
  }
  getInvestmentMaturity(token: any, filter: any): Observable<any> {
    // get users from api
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getInvestmentMaturity', this.serializeParams(filter), options)
      .map((response: Response) => response.json());
  }
  getClosedLoanPortfolio(token: any, filter: any): Observable<any> {
    // get users from api
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getClosedLoanPortfolio', JSON.stringify({ token: token, filter: filter }))
      .map((response: Response) => response.json());
  }
  getLoanPortfolio(token: any, filter: any): Observable<any> {
    // get users from api
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getLoanPortfolio', JSON.stringify({ token: token, filter: filter }))
      .map((response: Response) => response.json());
  }
  getTrialBalance(token: any, filter: any): Observable<any> {
    // get users from api
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getTrialBalance', this.serializeParams(filter), options)
      .map((response: Response) => response.json());
  }
  getBalanceSheet(token: any, filter: any): Observable<any> {
    // get users from api
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getBalanceSheet', this.serializeParams(filter), options)
      .map((response: Response) => response.json());
  }
  getProfitLoss(token: any, filter: any): Observable<any> {
    // get users from api
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getProfitLoss', this.serializeParams(filter), options)
      .map((response: Response) => response.json());
  }
  getJournalReports(token: any, filter: any): Observable<any> {
    // get users from api
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getJournalReports', this.serializeParams(filter), options)
      .map((response: Response) => response.json());
  }
  getLoanMaturiy(token: any, filter: any): Observable<any> {
    // get users from api
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getLoanMaturiy', this.serializeParams(filter), options)
      .map((response: Response) => response.json());
  }
  getLoanAgeing(token: any, filter: any): Observable<any> {
    // get users from api
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getLoanAgeing', this.serializeParams(filter), options)
      .map((response: Response) => response.json());
  }
  getAppSettings(token: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getAppSettings', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }
  getLenderSettings(token: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getLenderSettings', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }
  // exportReport(token: any, param: any) {
  //   return this.http.post('https://dataupload.creditclan.com/api/v2/reports/exportReport', JSON.stringify({ token: token, param: param }))
  //     .map((response: Response) => response.json());
  // }
  exportRecords(token: any, account_details: any, date_start:any,date_end:any,contra_charts:any) {
    return this.http.post('https://dataupload.creditclan.com/api/v2/reports/exportRecords', JSON.stringify({ token: token, account_details: account_details, date_start:date_start, date_end:date_end, contra_charts:contra_charts  }))
      .map((response: Response) => response.json());
  }
  saveTCSettings(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveTC', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveITCSettings(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveITC', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveContract(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveContractSettings', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveUssdSettings(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveUssdSettings', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveAutodisburse(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveAutodisburse', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveRollover(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveRollover', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveLoanProduct(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveLoanProduct', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveUssdSettings_(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveUssdSettingss', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveMobileApplication(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveMobileApplication', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveRecordsValidation(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveRecordsValidation', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveSecurity(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveSecurity', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveautorouting(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveautorouting', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveManagementFee(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveManagementFee', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveFines(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveFines', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveBreakSettings(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveBreakSettings', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  savePayments(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/savePayment', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveFee(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveFee', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  deleteLevel(token:any,value:any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/deleteLevel', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveLevel(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveLevel', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveQualifiedBorrowers(token: any, value: any,sectors:any,occupations:any,marital_status:any,states:any,guarantors:any,guarantor_requirements:any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveQualifiedBorrowers', JSON.stringify({ guarantor_requirements:guarantor_requirements,guarantors:guarantors,marital_status:marital_status,states:states,sectors:sectors,occupations:occupations,token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveGuarantorRequirements(token: any, value: any,sectors:any,occupations:any,marital_status:any,states:any,guarantors:any,guarantor_requirements:any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveGuarantorRequirements', JSON.stringify({ guarantor_requirements:guarantor_requirements,guarantors:guarantors,marital_status:marital_status,states:states,sectors:sectors,occupations:occupations,token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveAccounts(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveAccounts', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveAccPeer(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveAccPeer', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveSMSSettings(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveSMSSettings', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveMailSettings(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveMailSettings', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveInvestor(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveInvestor', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveInvestorGeneralSettings(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveInvestorGeneralSettings', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveInvestorRepayment(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveInvestorRepayment', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveReminders(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveReminders', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }

  saveReferral(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveReferralSettings', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }

  saveEligibility(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveEligibility', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  saveMobileRegisteration(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveMobileRegisteration', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  getInvestmentRateHistory(token: any, filter: any): Observable<any> {
    // get users from api
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getInvestmentRateHistory', this.serializeParams(filter), options)
      .map((response: Response) => response.json());
  }
  doInitiateFuning(token: any, payment_queue: any, people_id: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/doInitiateFuning', JSON.stringify({ people_id: people_id, token: token, payment_queue: payment_queue }))
      .map((response: Response) => response.json());
  }
  lookforemployees(token: string, lender_name: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/lookforemployees', JSON.stringify({ token: token, searchText: lender_name }))
      .map((response: Response) => response.json());
  }
  doQueueFunding(token: any, payment_queue: any, people_id: any, ttype: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/doQueueFunding', JSON.stringify({ ttype: ttype, people_id: people_id, token: token, payment_queue: payment_queue }))
      .map((response: Response) => response.json());
  }
  confirmWalletWithdrawal(token: any, payment_queue: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/confirmWalletWithdrawal', JSON.stringify({ token: token, payment_queue: payment_queue }))
      .map((response: Response) => response.json());
  }
  walletFundingComplete(token: any, payment_queue: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/walletFundingComplete', JSON.stringify({ token: token, payment_queue: payment_queue }))
      .map((response: Response) => response.json());
  }
  doWalletFundingConfirm(token: any, payment_queue: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/doWalletFundingConfirm', JSON.stringify({ token: token, payment_queue: payment_queue }))
      .map((response: Response) => response.json());
  }
  doInitiateWithdrawal(token: any, payment_queue: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/doInitiateWithdrawal', JSON.stringify({ token: token, payment_queue: payment_queue }))
      .map((response: Response) => response.json());
  }
  doConfirmWithdrawal(token: any, payment_queue: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/doConfirmWithdrawal', JSON.stringify({ token: token, payment_queue: payment_queue }))
      .map((response: Response) => response.json());
  }
  confirmBorrowerHasBeenPaid(token: any, payment_queue: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/confirmBorrowerHasBeenPaid', JSON.stringify({ token: token, payment_queue: payment_queue }))
      .map((response: Response) => response.json());
  }
  confirmBorrowerHasBeenPaidForBulk(token: any, payment_queue: any, bulkpayrequests:any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/confirmBorrowerHasBeenPaidBlk', JSON.stringify({ token: token, payment_queue: payment_queue,bulkpayrequests:bulkpayrequests }))
      .map((response: Response) => response.json());
  }
  
  confirmOTPForTransferToBorrower(token: any, otp: any, payment_queue: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/confirmOTPForTransferToBorrower', JSON.stringify({ token: token, otp: otp, payment_queue: payment_queue }))
      .map((response: Response) => response.json());
  }
  doCustomerPaymentConfirm(token: any, payment_queue: any, schedule_type: any, record_type: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/doCustomerPaymentConfirm', JSON.stringify({ token: token, payment_queue: payment_queue, schedule_type: schedule_type, record_type: record_type }))
      .map((response: Response) => response.json());
  }
  checkIfEbillsBankAlreadyExists(token: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/checkIfEbillsBankAlreadyExists', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }
  doSendRepaymentLink(token: any, payment_queue: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/sendRepaymentLinkTo', JSON.stringify({ token: token, payment_queue: payment_queue }))
      .map((response: Response) => response.json());
  }
  doPaymentConfirm(token: any, payment_queue: any, schedule_type: any, record_type: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/doPaymentConfirm', JSON.stringify({ token: token, payment_queue: payment_queue, schedule_type: schedule_type, record_type: record_type }))
      .map((response: Response) => response.json());
  }
  doPaymentConfirmForBulk(token: any,payment_queue:any, bulkpayrequests: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/doPaymentConfirmForBulk', JSON.stringify({ token: token, bulkpayrequests: bulkpayrequests,payment_queue:payment_queue}))
      .map((response: Response) => response.json());
  }
  doPaymentConfirmDebitAll(token: any, payment_queue: any, schedule_type: any, record_type: any, debit_all_card:any, disburse:any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/services/doPaymentConfirmDebitAll', JSON.stringify({ disburse:disburse,debit_all_card:debit_all_card,token: token, payment_queue: payment_queue, schedule_type: schedule_type, record_type: record_type }))
      .map((response: Response) => response.json());
  }
  dopaymentConfirmRollbackForm(token: any, payment_queue: any, schedule_type: any, record_type: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/dopaymentConfirmRollback', JSON.stringify({ token: token, payment_queue: payment_queue, schedule_type: schedule_type, record_type: record_type }))
      .map((response: Response) => response.json());
  }
  doTransferToWallet(token: any, payment_queue: any, schedule_type: any, record_type: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/doTransferToWallet', JSON.stringify({ token: token, payment_queue: payment_queue, schedule_type: schedule_type, record_type: record_type }))
      .map((response: Response) => response.json());
  }
  saveCustomerBank(token: any, bank: any, userId:any) {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveCustomerBank', JSON.stringify({ userId: userId, token: token, bank: bank }))
      .map((response: Response) => response.json());
  }
  saveBorrowerAccount(token: any, bank: any, schedule_type: any, record_type: any) {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveBorrowerAccount', JSON.stringify({ schedule_type: schedule_type, record_type: record_type, token: token, bank: bank }))
      .map((response: Response) => response.json());
  }
  saveWalletWithdrawalAccount(token: any, bank: any) {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveWalletWithdrawalAccount', JSON.stringify({ token: token, bank: bank }))
      .map((response: Response) => response.json());
  }
  initiateAutodebit(token:any, autodebit_form:any,request_id:any,connected_card_id:any,disburse:any) {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/initiateAutodebut', JSON.stringify({ disburse:disburse,autodebit_form: autodebit_form, connected_card_id: connected_card_id, token: token, request_id: request_id }))
      .map((response: Response) => response.json());
  }
  setAsConnectedAccountId(token: any, connected_account_id: any, request_id: any, payment_queue_id: any, record_type: any, schedule_type: any) {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/setAsConnectedAccountId', JSON.stringify({ schedule_type: schedule_type, record_type: record_type, payment_queue_id: payment_queue_id, token: token, connected_account_id: connected_account_id, request_id: request_id }))
      .map((response: Response) => response.json());
  }
  deleteConnectedCard(token: any, connected_account_id: any, request_id: any) {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/deleteConnectedCard', JSON.stringify({ token: token, connected_account_id: connected_account_id, request_id: request_id }))
      .map((response: Response) => response.json());
  }
  setAsConnectedCard(token: any, connected_account_id: any, request_id: any) {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/setAsConnectedCard', JSON.stringify({ token: token, connected_account_id: connected_account_id, request_id: request_id }))
      .map((response: Response) => response.json());
  }
  setAsWithdrawalAccount(token: any, connected_account_id: any, wallet_withdrawal_request_id: any) {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/setAsWithdrawalAccount', JSON.stringify({ wallet_withdrawal_request_id: wallet_withdrawal_request_id, token: token, connected_account_id: connected_account_id }))
      .map((response: Response) => response.json());
  }
  accountToAccount(token: any, bank: any, credit: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/accountToAccount', JSON.stringify({ token: token, bank: bank, credit: credit }))
      .map((response: Response) => response.json());
  }
  payBorrowerWithBank(token: any, transaction: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/payBorrowerWithBank', JSON.stringify({ token: token, transaction: transaction }))
      .map((response: Response) => response.json());
  }
  payInvestorWithBank(token: any, transaction: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/payInvestorWithBank', JSON.stringify({ token: token, transaction: transaction }))
      .map((response: Response) => response.json());
  }
  confirmOTPForTransfer(token: any, otp: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/confirmOTPForTransfer', JSON.stringify({ token: token, otp: otp }))
      .map((response: Response) => response.json());
  }
  getWalletData_(token: any, data: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getWalletData', JSON.stringify({ token: token, data: data }))
      .map((response: Response) => response.json());
  }
  
  getAccountStatement(token: any, data: any, start_date:any, end_date:any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getAccountStatement', JSON.stringify({ token: token, data: data, start_date:start_date, end_date:end_date }))
      .map((response: Response) => response.json());
  }
  getLeafAccountBalance(token: any, data: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getLeafAccountBalance', JSON.stringify({ token: token, data: data }))
      .map((response: Response) => response.json());
  }
  getSecurityQuestion(token: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getSecurityQuestion', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }
  getWalletData(token: any, hw = 0, is_company = 1, customer_id = 0): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getWalletData', JSON.stringify({ token: token, hw: hw, is_company: is_company, customer_id: customer_id }))
      .map((response: Response) => response.json());
  }
  getWalletSummary(token: any,how_much_was_given:any=0): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getWalletSummary', JSON.stringify({ token: token, HOW_MUCH_WAS_GIVEN:how_much_was_given}))
      .map((response: Response) => response.json());
  }
  getCustomerWalletData(token: any, hw: any, is_company: any, customer_id: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getWalletData', JSON.stringify({ token: token, hw: hw, is_company: is_company, customer_id: customer_id }))
      .map((response: Response) => response.json());
  }
  getOptions(token: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getOptions', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }
  getOptionsForReport(token: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getOptionsForReport', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }
  saveLenderBank(token: any, bank: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveLenderBank', JSON.stringify({ token: token, bank: bank }))
      .map((response: Response) => response.json());
  }
  deleteBank(token: any, bank: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/deleteBank', JSON.stringify({ token: token, bank: bank }))
      .map((response: Response) => response.json());
  }
  saveLenderAccount(token: any, account: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/saveLenderAccount', JSON.stringify({ token: token, account: account }))
      .map((response: Response) => response.json());
  }
  getRepaymentSchedule(token: any, record_type: any, schedule_type: any, repayment_schedule_id: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getRepaymentSchedule', JSON.stringify({ token: token, record_type: record_type, schedule_type: schedule_type, repayment_schedule_id: repayment_schedule_id }))
      .map((response: Response) => response.json());
  }
  getDisbursements(token: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getDisbursements', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }
  getPLGrouping(token: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/profit_loss_grouping', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }
  getBSGrouping(token: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/balance_sheet_grouping', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }
  loadInvestmentDashboardData(token: any, dashboardFilter: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/loadInvestmentDashboardData', JSON.stringify({ token: token, dashboardFilter: dashboardFilter }))
      .map((response: Response) => response.json());
  }
  loadDashboardData(token: any, dashboardFilter: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/loadDashboardData', JSON.stringify({ token: token, dashboardFilter: dashboardFilter }))
      .map((response: Response) => response.json()); 
  }
  loadDashboard(token: any, dashboardFilter: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/loadDashboard', JSON.stringify({ token: token, dashboardFilter: dashboardFilter }))
      .map((response: Response) => response.json()); 
  }
  getDueRepayments(token: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getDueRepayments', JSON.stringify({ token: token}))
      .map((response: Response) => response.json()); 
  }
  currentStats(token: any, dashboardFilter: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/currentStats', JSON.stringify({ token: token, dashboardFilter: dashboardFilter }))
      .map((response: Response) => response.json()); 
  }
  loanPlatforWallet(token: any, dashboardFilter: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/loanPlatforWallet', JSON.stringify({ token: token }))
      .map((response: Response) => response.json()); 
  }
  getJournals(token: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getJournals', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }
  getSingleJournal(token: any, id: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getSingleJournal', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  searchJournal(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/searchJournal', JSON.stringify({ token: token, search: value }))
      .map((response: Response) => response.json());
  }
  searchJournal_(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/searchJournal_', JSON.stringify({ token: token, search: value }))
      .map((response: Response) => response.json());
  }
  nextGLAccL(token: any, next: any, prev: any, index: any, searchForm: any, searchForm_: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/nextGLAccL', JSON.stringify({ token: token, next: next, prev: prev, index: index, searchForm: searchForm, searchForm_: searchForm_ }))
      .map((response: Response) => response.json());
  }
  prevGLAccL(token: any, next: any, prev: any, index: any, searchForm: any, searchForm_: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/prevGLAccL', JSON.stringify({ token: token, next: next, prev: prev, index: index, searchForm: searchForm, searchForm_: searchForm_ }))
      .map((response: Response) => response.json());
  }
  getCurrentRepaymentCalendar(token: any, repay_type: any, schedule_type: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/loan/getCurrentRepaymentCalendar', JSON.stringify({ token: token, repay_type: repay_type, schedule_type: schedule_type }))
      .map((response: Response) => response.json());
  }
  getCustomerCurrentRepaymentCalendar(token: any, repay_type: any, schedule_type: any, customer_id: any): Observable<any> {
    // get users from api
    return this.http.post('https://dataupload.creditclan.com/api/v2/loan/getCurrentRepaymentCalendar', JSON.stringify({ token: token, repay_type: repay_type, schedule_type: schedule_type, customer_id: customer_id }))
      .map((response: Response) => response.json());
  }
  sendEmailReminder(token: string, request_id: any, loan_statement: any) {
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/sendEmailReminder', JSON.stringify({ loan_statement: loan_statement, token: token, request_id: request_id }))
      .map((response: Response) => response.json());
  }
  sendLoanStatement(token: string, request_id: any, loan_statement: any) {
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/sendLoanStatement', JSON.stringify({ loan_statement: loan_statement, token: token, request_id: request_id }))
      .map((response: Response) => response.json());
  }
  sendSMSReminder(token: string, request_id: any, loan_statement: any) {
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/sendSMSReminder', JSON.stringify({ loan_statement: loan_statement, token: token, request_id: request_id }))
      .map((response: Response) => response.json());
  }
  getRepaymentsForTheDay(token: string, record_type: any, schedule_type: any, datechosen: any, start: any) {
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getRepaymentsForTheDay', JSON.stringify({ start: start, token: token, repay_type: record_type, schedule_type: schedule_type, datechosen: datechosen }))
      .map((response: Response) => response.json());
  }
  makepayment(token: any, repayment_id: any) {
    return this.http.post('https://dataupload.creditclan.com/api/v2/loan/make_bulk_pay', JSON.stringify({ token: token, repayment_id: repayment_id }))
      .map((response: Response) => response.json());
  }
  makeinvpayment(token: any, repayment_id: any) {
    return this.http.post('https://dataupload.creditclan.com/api/v2/loan/make_inv_bulk_pay', JSON.stringify({ token: token, repayment_id: repayment_id }))
      .map((response: Response) => response.json());
  }
  getQueuedRecords(token: any, record_type: any, schedule_type: any, search: any) {
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getQueuedRecords', JSON.stringify({ token: token, record_type: record_type, schedule_type: schedule_type, search: search }))
      .map((response: Response) => response.json());
  }
  getCustomerWallets(token: any, search: any, start: any) {
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getCustomerWallets', JSON.stringify({ token: token, search: search, start: start }))
      .map((response: Response) => response.json());
  }
  getQueueSummary(token: any, record_type: any, schedule_type: any, disburse: any) {
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getQueueSummary', JSON.stringify({ token: token, record_type: record_type, schedule_type: schedule_type, disburse: disburse }))
      .map((response: Response) => response.json());
  }
  cancelQueuedOperation(token: any, formdata: any) {
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/cancelQueuedOperation', JSON.stringify({ token: token, formdata: formdata }))
      .map((response: Response) => response.json());
  }
  getHistoricalQueuedRecords(token: any, record_type: any, schedule_type: any, search: any) {
    return this.http.post('https://dataupload.creditclan.com/api/v2/operations/getHistoricalQueuedRecords', JSON.stringify({ token: token, record_type: record_type, schedule_type: schedule_type, search: search }))
      .map((response: Response) => response.json());
  }
  serializeParams(obj) {
    let str = '';
    for (var key in obj) {
      if (str != '') {
        str += '&';
      }
      str += key + '=' + obj[key];
    }
    return str;
  }
 

  // Reports
  getDueLoans(token: any, param: any) {
    return this.http.post('https://dataupload.creditclan.com/api/v2/reports/get_due_loans', JSON.stringify({ token: token, param: param }))
      .map((response: Response) => response.json());
  }
  getMissedRepayment(token: any, param: any) {
    return this.http.post('https://dataupload.creditclan.com/api/v2/reports/get_missed_repayments', JSON.stringify({ token: token, param: param }))
      .map((response: Response) => response.json());
  }
  getNoRepayment(token: any, param: any) {
    return this.http.post('https://dataupload.creditclan.com/api/v2/reports/get_no_repayment_loans', JSON.stringify({ token: token, param: param }))
      .map((response: Response) => response.json());
  }
  getPastMaturity(token: any, param: any) {
    return this.http.post('https://dataupload.creditclan.com/api/v2/reports/get_past_maturity_loans', JSON.stringify({ token: token, param: param }))
      .map((response: Response) => response.json());
  }
  getGuarantorsList(token: any, param: any) {
    return this.http.post('https://dataupload.creditclan.com/api/v2/reports/get_list_of_gurantors', JSON.stringify({ token: token, param: param }))
      .map((response: Response) => response.json());
  }
  getRepayments(token: any, param: any) {
    return this.http.post('https://dataupload.creditclan.com/api/v2/reports/get_repayments', JSON.stringify({ token: token, param: param }))
      .map((response: Response) => response.json());
  }
  getBorrowersReport(token: any, param: any) {
    return this.http.post('https://dataupload.creditclan.com/api/v2/reports/get_borrowers_report', JSON.stringify({ token: token, param: param }))
      .map((response: Response) => response.json());
  }
  getOfficerReport(token: any, param: any) {
    return this.http.post('https://dataupload.creditclan.com/api/v2/reports/get_loan_officer_report', JSON.stringify({ token: token, param: param }))
      .map((response: Response) => response.json());
  }
  getDisbursementReport(token: any, param: any) {
    return this.http.post('https://dataupload.creditclan.com/api/v2/reports/get_disbursement_report', JSON.stringify({ token: token, param: param }))
      .map((response: Response) => response.json());
  }
  exportReport(token: any, param: any) {
    return this.http.post('https://dataupload.creditclan.com/api/v2/reports/exportReport', JSON.stringify({ token: token, param: param }))
      .map((response: Response) => response.json());
  }
  downloadRepayments(token: any, param: any) {
    return this.http.post('https://dataupload.creditclan.com/api/v2/reports/downloadRepayments', JSON.stringify({ token: token, param: param }))
      .map((response: Response) => response.json());
  }
  
  saveUssd(value:any): Observable<any> {
    return this.http.post('http://app.creditclan.com/dataupload/api/v2/operations/getUssd', JSON.stringify({data: value }))
    .map((response: Response) => response.json());
  }
}
