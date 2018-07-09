import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { DataService, OptionsserviceService, UserService, LoansService, AuthenticationService, StorageService } from '../_services/index';
@Component({
  selector: 'app-requestslist',
  templateUrl: './requestslist.component.html',
  styleUrls: ['./requestslist.component.css']
})
export class RequestslistComponent implements OnInit {
  disburse:any;
  @Input('loans') loans: any;
  @Input('loan_status') loan_status:any;
  @Input('magic_filter') magic_filter:any;
  @Input('view_state') view_state:any;
  @Input('dontshownext') dontshownext:any;
  @Input('enable_bulk_disbursements') enable_bulk_disbursements=false;
  ordering: string ='DATE_ADDED';
  reverse=false;
  @Output() loadMore = new EventEmitter();
  @Output() open_loan = new EventEmitter();
  @Output() view_loan = new EventEmitter();
  @Output() requestaddToBulkPay = new EventEmitter();
  @Output() requestaddedToBulkPay = new EventEmitter();
  otherClosed = true;
  secOpen = '0';
  orderingText="Most Recent";
  @Input('type_of_view') type_of_view='2';
  public applyMethod = { '1': 'USSD', '2': 'Mobile', '3': 'Back Office','4':'Back Office' };
  constructor(public storageService: StorageService) {
     
    this.type_of_view = this.storageService.read<any>('type_of_view');

  }
  getTotalFunded(PERCENTAGE_FUNDED,REQUEST_PRINCIPAL){
    return parseFloat(PERCENTAGE_FUNDED)/100*parseFloat(REQUEST_PRINCIPAL);
  }
  getTotalRemaining(REQUEST_PRINCIPAL,TOTAL_FUNDED){
    return parseFloat(REQUEST_PRINCIPAL)-parseFloat(TOTAL_FUNDED);
  }
  ngOnInit() {
    this.type_of_view = this.storageService.read<any>('type_of_view');
  }
  setAsDefaultView(event){
    
    if(event.target.checked){
      localStorage.setItem('type_of_view', '2');
    }else{
      localStorage.setItem('type_of_view', '1');
    }
  }
  openSec(sec) {
    this.otherClosed = true;
    this.secOpen = sec;
  }
  loadMoreRecords(start){
    this.loadMore.emit(start);
  }
  openTheLoan(request_id){
    this.open_loan.emit(request_id);
  }
  viewTheLoan(request_id){
    this.view_loan.emit(request_id);
  }
  open_loan_(request_id){
    this.open_loan.emit(request_id);
  }
  percent_funded(val){
    return val+'%';
  }
  orderingBy(type){
    if(type==='1'){
      this.ordering = 'DATE_ADDED';
      this.reverse = false;
      this.orderingText="Most Recent"
    }
    if(type==='2'){
      this.ordering = 'LEGAL_NAME';
      this.reverse = false;
      this.orderingText="Name A - Z"
    }
    if(type==='3'){
      this.ordering = 'LEGAL_NAME';
      this.reverse = true;
      this.orderingText="Name Z - A"
    }
    if(type==='4'){
      this.ordering = 'REQUEST_PRINCIPAL';
      this.reverse = true;
      this.orderingText="Amount High - Low"
    }
    if(type==='5'){
      this.ordering = 'REQUEST_PRINCIPAL';
      this.reverse = false;
      this.orderingText="Amount Low - High"
    }
    if(type==='6'){
      this.ordering = 'REQUEST_TENOR_IN_DAYS';
      this.reverse = true;
      this.orderingText="Duration High - Low"
    }
    if(type==='7'){
      this.ordering = 'REQUEST_TENOR_IN_DAYS';
      this.reverse = false;
      this.orderingText="Duration Low - High"
    }
  }
  addToBulkPay(request_id,confirm,loan){
    this.requestaddToBulkPay.emit({request_id:request_id,loan:loan,confirm:confirm});
   }
   addedToBulkPay(request_id){ 
    this.requestaddedToBulkPay.emit({request_id:request_id});
   }
}
