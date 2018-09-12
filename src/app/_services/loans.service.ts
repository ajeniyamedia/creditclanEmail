import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { Loan } from '../_models/index';
import { Loan_ } from '../_models/index';
import { AuthenticationService } from './index';

@Injectable()
export class LoansService {

  constructor(
    public http: Http,
  ) { }
  displayanalysis(token: any, statement: any) {
    return this.http.post('http://app.creditclan.com/dataupload/api/v2/analytics/getCustomerAnalytics', JSON.stringify({ token: token, formdata: statement }))
      .map((response: Response) => response.json());
  }
  getCustomerAnalyticsRecords(token: any, statement: any) {
    return this.http.post('http://app.creditclan.com/dataupload/api/v2/analytics/getCustomerAnalyticsRecords', JSON.stringify({ token: token, formdata: statement }))
      .map((response: Response) => response.json());
  }

  displayanalysisrequest(token: any, data: any) {
    return this.http.post('http://app.creditclan.com/dataupload/api/v2/analytics/getCustomerAnalyticsRequest', JSON.stringify({ token: token, formdata: data }))
      .map((response: Response) => response.json());
  }
  getLoanCards(token: string, id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getLoanCards', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  getRequestTimeline(token: string, id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getRequestTimeline', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  analysisAmount(token: any) {
    return this.http.post('http://app.creditclan.com/dataupload/api/v2/analytics/getAnalyticsAmount', JSON.stringify({ token: token }))
      .map((response: Response) => response.json());
  }
  getBanksListForCustomer(token: any, loan_request: any) {
    return this.http.post('http://app.creditclan.com/dataupload_test/api/v2/loan/getBanksListForCustomer', JSON.stringify({ token: token, request: loan_request }))
      .map((response: Response) => response.json());
  }
  saveSocialRequest(token: any, value: any, loan_request: any) {
    return this.http.post('http://app.creditclan.com/dataupload_test/api/v2/analytics/saveSocialRequest', JSON.stringify({ token: token, data: value, request_id: loan_request }))
      .map((response: Response) => response.json());
  }
  saveAnlysisRequest(token: any, value: any, loan_request: any) {
    return this.http.post('http://app.creditclan.com/dataupload/api/v2/analytics/saveAnalyticsRequest', JSON.stringify({ token: token, data: value, request: loan_request }))
      .map((response: Response) => response.json());
  }

  getSocialAnalysis(people_id: any) {
    return this.http.get('http://social.creditclan.com/rest/customer?id=' + people_id)
      .map((response: Response) => response.json());
  }

  saveFqscore(token: any, value: any, loan_request: any) {
    return this.http.post('http://app.creditclan.com/dataupload/api/v2/analytics/saveFqScore', JSON.stringify({ token: token, fqscore: value, request: loan_request }))
      .map((response: Response) => response.json());
  }
  saveAllCountries(callingCodes: any) {
    return this.http.post('http://app.creditclan.com/dataupload/api/v2/analytics/saveAllCountries', JSON.stringify({ callingCodes: callingCodes }))
      .map((response: Response) => response.json());
  }
  queueStraightForDisbursement(token: any, request: any, selectedCustomer: any, loan_product: any, request_bank: any) {
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/queueStraightForDisbursement', JSON.stringify({ request_bank: request_bank, loan_product: loan_product, token: token, request: request, selectedCustomer: selectedCustomer }))
      .map((response: Response) => response.json());
  }
  initializeNewLoan(token: any, company_id: any, staff_id: any) {
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/initializeNewLoan', JSON.stringify({ token: token, company_id: company_id, staff_id: staff_id }))
      .map((response: Response) => response.json());
  }
  exportDisburseList(token: any, bulkpayrequests: any) {
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/exportDisburseList', JSON.stringify({ token: token, bulkpayrequests: bulkpayrequests }))
      .map((response: Response) => response.json());
  }
  confirmPayment(token: any, payment: any) {
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/confirm_payment', JSON.stringify({ token: token, formdata: payment }))
      .map((response: Response) => response.json());
  }
  makepayment(token: any, payment: any) {
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/bulk_pay', JSON.stringify({ token: token, formdata: payment }))
      .map((response: Response) => response.json());
  }
  rollbackpayment(token: any, payment: any, transaction: any) {
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/operations/rollback', JSON.stringify({ token: token, formdata: payment, transaction: transaction }))
      .map((response: Response) => response.json());
  }
  previewLoan(token: any, loan_request: any, selectedCustomer: any, loan_product: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/previewLoan', JSON.stringify({ token: token, loan_request: loan_request, selectedCustomer: selectedCustomer, loan_product: loan_product }))
      .map((response: Response) => response.json());
  }
  createLoan(token: any, loan_request: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/create_loan', JSON.stringify({ token: token, loan_request: loan_request, analytics: true }))
      .map((response: Response) => response.json());
  }
  filterLoans(token: any, magic_filter: any, sectors: any, approval_levels: any, statuses: any, durations: any, request_date: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/filterLoans', JSON.stringify({ token: token, magic_filter: magic_filter, sectors: sectors, approval_levels: approval_levels, statuses: statuses, durations: durations, request_date: request_date }))
      .map((response: Response) => response.json());
  }
  runFilterLoans(token: any, magic_filter: any, sectors: any, approval_levels: any, statuses: any, durations: any, request_date: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/filterLoans', JSON.stringify({ analytics: true, token: token, magic_filter: magic_filter, sectors: sectors, approval_levels: approval_levels, statuses: statuses, durations: durations, request_date: request_date }))
      .map((response: Response) => response.json());
  }
  filterActiveLoans(token: any, magic_filter: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/filterLoans', JSON.stringify({ token: token, magic_filter: magic_filter }))
      .map((response: Response) => response.json());
  }
  modify_repay_date(loan: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/modify_repay_date', JSON.stringify(loan))
      .map((response: Response) => response.json());
  }
  getLoans(filters: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getLoans', JSON.stringify(filters))
      .map((response: Response) => response.json());
  }
  getActiveLoans(filters: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getActiveLoans', JSON.stringify(filters))
      .map((response: Response) => response.json());
  }
  getLoansSummary(filters: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getLoansSummary', JSON.stringify(filters))
      .map((response: Response) => response.json());
  }
  sendToLoanMarket(token: string, id: number, notify_all_lenders: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/sendToLoanMarket', JSON.stringify({ token: token, request_id: id, notify_all_lenders: notify_all_lenders }))
      .map((response: Response) => response.json());
  }
  getInvestments(token: string, data: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getInvestments', JSON.stringify({ token: token, magic_filter: data }))
      .map((response: Response) => response.json());
  }
  getRepaymentDetails(token: string, id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getLoanStatement', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  updatePlatformOffer(token: string, offer: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/updatePlatformOffer', JSON.stringify({ token: token, offer: offer }))
      .map((response: Response) => response.json());
  }
  rejectThisRequest(token: string, reject: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/rejectThisRequest', JSON.stringify({ token: token, reject: reject }))
      .map((response: Response) => response.json());
  }
  cancelContract(token: string, id: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/cancelContract', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  approveThisRequest(token: string, reject: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/approveThisRequest', JSON.stringify({ token: token, reject: reject }))
      .map((response: Response) => response.json());
  }
  checkWalletTStatus(token: string, id: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/loan_disbursed', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  queueForDisbursement(token: string, id: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/queueForDisbursement', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  removeFromLoanMarket(token: string, id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/removeFromLoanMarket', JSON.stringify({ token: token, request_id: id }))
      .map((response: Response) => response.json());
  }
  getLoan(token: string, id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getLoan', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  saveOLSettings(token: any, value: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/saveOL', JSON.stringify({ token: token, data: value }))
      .map((response: Response) => response.json());
  }
  sendContract(token: any, value: any, offer: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/sendContract', JSON.stringify({ token: token, data: value, offer: offer }))
      .map((response: Response) => response.json());
  }
  getLoanOffer(token: string, id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getLoanOffer', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  getLoanRejections(token: string, id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getLoanRejections', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  getAddresses(token: string, id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/customer/getAddresses', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  updateRequestLocation(token: any, id: number, address: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/updateRequestLocation', JSON.stringify({ token: token, id: id, address: address }))
      .map((response: Response) => response.json());
  }
  getLoanCollateral(token: string, id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getLoanCollateral', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  getInvestment(token: string, id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getInvestment', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  getInvestmentBorrower(token: string, id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getInvestmentBorrower', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  breakLoan(token: string, id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/breakLoan', JSON.stringify({ token: token, request_id: id }))
      .map((response: Response) => response.json());
  }
  sendBreakLoan(token: string, id: number, break_loan: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/sendBreakLoan', JSON.stringify({ token: token, request_id: id, break_loan: break_loan }))
      .map((response: Response) => response.json());
  }
  adjustTheCurrentBalance(token: string, id: number, breaking_date: any, close_action: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/adjustTheCurrentBalance', JSON.stringify({ token: token, request_id: id, BREAKING_DATE: breaking_date, CLOSE_ACTION: close_action }))
      .map((response: Response) => response.json());
  }
  getStatement(token: string, id: number, statement_type: any, type_of_entry: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getStatement', JSON.stringify({ type_of_entry: type_of_entry, token: token, id: id, statement_type: statement_type }))
      .map((response: Response) => response.json());
  }
  getInvStatement(token: string, id: number, statement_type: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getInvStatement', JSON.stringify({ token: token, id: id, statement_type: statement_type }))
      .map((response: Response) => response.json());
  }
  getLoanForPreview(token: string, id: number, dontshownext: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getLoan', JSON.stringify({ dontshownext: dontshownext, token: token, id: id, enext: 1 }))
      .map((response: Response) => response.json());
  }
  getLoanForPreview__(token: string, id: number, dontshownext: any, is_approval: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getLoan', JSON.stringify({ is_approval: is_approval, dontshownext: dontshownext, token: token, id: id, enext: 1 }))
      .map((response: Response) => response.json());
  }
  getLoanForPreview_(token: string, id: number, dontshownext: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getLoan', JSON.stringify({ dontshownext: dontshownext, token: token, id: id }))
      .map((response: Response) => response.json());
  }
  lookforlenders(token: string, lender_name: any, loan: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/searchForNewLenders', JSON.stringify({ loan: loan, token: token, searchText: lender_name }))
      .map((response: Response) => response.json());
  }
  makeNewOffer(token: string, platform_offer: any, request_id: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/makeNewOffer', JSON.stringify({ token: token, offer: platform_offer, id: request_id }))
      .map((response: Response) => response.json());
  }
  getLoanAnalysis(token: string, id: number, lender_name: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getLoanAnalysis', JSON.stringify({ token: token, id: id, searchText: lender_name }))
      .map((response: Response) => response.json());
  }
  updateAnalysis(token: string, id: number, analysis: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/updateAnalysis', JSON.stringify({ token: token, id: id, analysis: analysis }))
      .map((response: Response) => response.json());
  }
  saveLoanCheques(token: string, id: number, cheques: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/saveLoanCheques', JSON.stringify({ token: token, id: id, cheques: cheques }))
      .map((response: Response) => response.json());
  }
  saveCollaterals(token: string, id: number, cheques: any, loan: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/saveCollaterals', JSON.stringify({ token: token, id: id, cheques: cheques, loan: loan }))
      .map((response: Response) => response.json());
  }
  getLoanLenders(token: string, id: number, lender_name: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getLoanLenders', JSON.stringify({ token: token, id: id, searchText: lender_name }))
      .map((response: Response) => response.json());
  }
  getLoanCardsAndAccounts(token: string, id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getLoanCardsAndAccounts', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  getLoanAttachments(token: string, id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getLoanAttachments', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  getUserLogs(token: string, id: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getUserLogs', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  getLoanGuarantors(token: string, id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getLoanGuarantors', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  getLoanSchedule(token: string, id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getLoanSchedule', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  getLoanEIRSchedule(token: string, id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getLoanEIRSchedule', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  viewLoanGuarantor(token: string, id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/viewLoanGuarantor', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  getLoanGuarantorProfile(token: string, id: number, category: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getLoanGuarantorProfile', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
    // let action = '';
    // if (category == 'individual') {
    //   action = 'update_indi/' + id;
    // } else {
    //   action = 'update_indi/' + id;
    // }

    // return this.http.post('http://137.117.105.90/dataupload_test/api/v2/customer/' + action, JSON.stringify({ token: token }))
    //   .map((response: Response) => response.json());
  }
  getLoanApprovals(token: string, id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getLoanApprovals', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  getApprovalQueue(token: string, id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getApprovalQueue', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  getLoanComments(token: string, id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getLoanComments', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  reverseContract(token: string, id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/operations/reverseContract', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  acceptOffer(token: string, id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/acceptOffer', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  rejectOffer(token: string, id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/rejectOffer', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  sendGuarantorInvites(token: string, id: number, items: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/sendGuarantorInvites', JSON.stringify({ token: token, id: id, items: items }))
      .map((response: Response) => response.json());
  }
  getLoan_(token: string, id: string): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getLoanN', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  uploadFile(file: any, description: any, parentRouteId: any) {

  }
  save_contract(token: string, formdata: any, allfeesqueue: any, allchargesqueue: any, fees: any, charges: any, paidfeesandcharges: any, loan_request: any, SEND_CONTRACT_DOCS: any): Observable<Loan_> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/save_contract', JSON.stringify({ SEND_CONTRACT_DOCS: SEND_CONTRACT_DOCS, loan_request: loan_request, token: token, formdata: formdata, allfeesqueue: allfeesqueue, allchargesqueue: allchargesqueue, fees: fees, charges: charges, PAID_FEES_AND_CHARGES: paidfeesandcharges }))
      .map((response: Response) => response.json());
  }
  finishRollover(token: string, request_id: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/finishRollover', JSON.stringify({ request_id: request_id, token: token }))
      .map((response: Response) => response.json());
  }
  moveToRequests(token: string, request_id: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/moveToRequests', JSON.stringify({ request_id: request_id, token: token }))
      .map((response: Response) => response.json());
  }
  finishTopUp(token: string, request_id: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/finishTopup', JSON.stringify({ request_id: request_id, token: token }))
      .map((response: Response) => response.json());
  }
  getLoanFeesAndCharges(token: string, loanid: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getLoanFeesAndCharges', JSON.stringify({ token: token, id: loanid }))
      .map((response: Response) => response.json());
  }
  searchForLoans(token: string, searchText: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/searchForLoans', JSON.stringify({ token: token, searchText: searchText }))
      .map((response: Response) => response.json());
  }
  getCustomerLoans(token: string, id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getCustomerLoans', JSON.stringify({ token: token, id: id }))
      .map((response: Response) => response.json());
  }
  getLoanProducts(token: string, id: number): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/product/getlpult', JSON.stringify({ token: token, LOAN_TYPE: id }))
      .map((response: Response) => response.json());
  }
  applyForLoan(token: string, loan_request: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/applyForLoan', JSON.stringify({ token: token, loan_request: loan_request }))
      .map((response: Response) => response.json());
  }
  changeLoanProduct(token: string, model: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/changeProduct', JSON.stringify({ token: token, model: model }))
      .map((response: Response) => response.json());
  }
  acceptContract(token: string, request_id: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/acceptContract', JSON.stringify({ token: token, request_id: request_id }))
      .map((response: Response) => response.json());
  }
  acceptBorrowerGetPaid(token: string, request_id: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/acceptBorrowerGetPaid', JSON.stringify({ token: token, request_id: request_id }))
      .map((response: Response) => response.json());
  }
  sendBVNRequest(token: string, request_id: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/sendBVNRequest', JSON.stringify({ token: token, request_id: request_id }))
      .map((response: Response) => response.json());
  }
  sendForGuarantors(token: string, request_id: any, financial_docs: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/sendForGuarantors', JSON.stringify({ token: token, request_id: request_id, financial_request: financial_docs }))
      .map((response: Response) => response.json());
  }
  sendForCancelAutoDebit(token: string, request_id: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/operations/sendForCancelAutoDebit', JSON.stringify({ token: token, request_id: request_id }))
      .map((response: Response) => response.json());
  }
  sendForReactivateAutoDebit(token: string, request_id: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/operations/sendForReactivateAutoDebit', JSON.stringify({ token: token, request_id: request_id }))
      .map((response: Response) => response.json());
  }
  sendForFinancialDocuments(token: string, request_id: any, financial_docs: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/sendForFinancialDocuments', JSON.stringify({ token: token, request_id: request_id, financial_request: financial_docs }))
      .map((response: Response) => response.json());
  }
  sendForOtherDocuments(token: string, request_id: any, financial_docs: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/sendForOtherDocuments', JSON.stringify({ token: token, request_id: request_id, financial_request: financial_docs }))
      .map((response: Response) => response.json());
  }
  sendCardRequest(token: string, request_id: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/sendCardRequest', JSON.stringify({ token: token, request_id: request_id }))
      .map((response: Response) => response.json());
  }
  requestGuarantorCard(token: string, request_id: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/guarantors/requestGuarantorCard', JSON.stringify({ token: token, request_id: request_id }))
      .map((response: Response) => response.json());
  }
  sendAccountConfirmationRequest(token: string, request_id: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/sendAccountConfirmationRequest', JSON.stringify({ token: token, request_id: request_id }))
      .map((response: Response) => response.json());
  }
  sendKYCRequest(token: string, request_id: any, kyc_request: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/sendKYCRequest', JSON.stringify({ token: token, request_id: request_id, kyc_request: kyc_request }))
      .map((response: Response) => response.json());
  }
  sendDocumentPickupRequest(token: string, request_id: any, pick_up: any, doctypes: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/sendDocumentPickupRequest', JSON.stringify({ pick_up: pick_up, doctypes: doctypes, token: token, request_id: request_id }))
      .map((response: Response) => response.json());
  }
  sendDeleteRequest(token: string, request_id: any, rejection: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/sendDeleteRequest', JSON.stringify({ token: token, request_id: request_id, rejection: rejection }))
      .map((response: Response) => response.json());
  }
  sendContractDocumentRequest(token: string, request_id: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/sendContractDocumentRequest', JSON.stringify({ token: token, request_id: request_id }))
      .map((response: Response) => response.json());
  }
  reopenRequest(token: string, request_id: any, reopen: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/reopenRequest', JSON.stringify({ token: token, request_id: request_id, reopen: reopen }))
      .map((response: Response) => response.json());
  }
  sendForDirectDebit(token: string, request_id: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/setupDirectDebit', JSON.stringify({ token: token, request_id: request_id }))
      .map((response: Response) => response.json());
  }
  sendForDirectDebitOnAccount(token: string, request_id: any, account: any, password: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/mandate/setupDirectDebit', JSON.stringify({ token: token, request_id: request_id, password: password, account: account }))
      .map((response: Response) => response.json());
  }
  cancelCustomerNotification(token: string, request_id: any, notification: any, password: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/rejectNotification', JSON.stringify({ token: token, request_id: request_id, password: password, notification: notification }))
      .map((response: Response) => response.json());
  }
  sendForStopDirectDebitMandate(token: string, request_id: any, account: any, password: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/mandate/doStopDirectDebitMandate', JSON.stringify({ token: token, request_id: request_id, password: password, account: account }))
      .map((response: Response) => response.json());
  }
  sendForDirectDebitStatus(token: string, request_id: any, account: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/mandate/sendForDirectDebitStatus', JSON.stringify({ token: token, request_id: request_id, account: account }))
      .map((response: Response) => response.json());
  }
  sendForCancelDirectDebitStatus(token: string, request_id: any, account: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/mandate/sendForCancelDirectDebitStatus', JSON.stringify({ token: token, request_id: request_id, account: account }))
      .map((response: Response) => response.json());
  }
  runCreditCheck(token: string, request_id: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/credit/runCreditCheck', JSON.stringify({ token: token, request_id: request_id }))
      .map((response: Response) => response.json());
  }
  getCustomerPayments(token: string, request_id: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/getCustomerPayments', JSON.stringify({ token: token, request_id: request_id }))
      .map((response: Response) => response.json());
  }
  recalculateFees(token: string, value: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/recalculateFees', JSON.stringify({ token: token, value: value }))
      .map((response: Response) => response.json());
  }
  doUpload(files: any): Observable<any> {
    // get users from api
    const formData: FormData = new FormData();
    formData.append('file', files, files.name);
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/uploadDoc', formData)
      .map((response: Response) => response.json());
  }

  uploadTheLoanPhoto(token: any, id: any, filesUploaded: any, doctype: any, description: any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/uploadTheLoanPhoto', JSON.stringify({ token: token, id: id, filesUploaded: filesUploaded, doctype: doctype, description: description }))
      .map((response: Response) => response.json());
  }
  doUploadPhoto(files: any): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('X-API-KEY', 'z2BhpgFNUA99G8hZiFNv77mHDYcTlecgjybqDACv');
    const options = new RequestOptions({ headers: headers });
    // get users from api
    const formData: FormData = new FormData();
    formData.append('file', files, files.name);
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/loan/uploadImage', formData)
      .map((response: Response) => response.json());
  }
  printTheOfferLetter(token: string, request_id: any, offer:any): Observable<any> {
    // get users from api
    return this.http.post('http://137.117.105.90/dataupload_test/api/v2/reports/printTheOfferLetter', JSON.stringify({ token: token, request_id: request_id, offer:offer }))
      .map((response: Response) => response.json());
  }
}
