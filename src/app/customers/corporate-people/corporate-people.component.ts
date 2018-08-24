import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../_services/customers.service';
import { ConstantsService } from '../../_services/constants.service';
import { DataService, StorageService, OperationsService } from '../../_services/index';
import { Router } from '@angular/router';

// import { Uploader } from 'angular2-http-file-upload';
// import { MyUploadItem } from './my-upload-items';
@Component({
  selector: 'app-corporate-people',
  templateUrl: './corporate-people.component.html',
  styleUrls: ['./corporate-people.component.css']
})
export class CorporatePeopleComponent implements OnInit {
  uploadingComplete = false;
  uploadedResponse: any;
  isUploading = false;
  enable_peer = '0'
  customers: any;
  openedTab: any;
  sub;
  mainSection = true;
  showEmptyState = false;
  count = '0';
  description = ' ';
  loading = false
  currentUser: any;
  userId: any;
  constructor(public storageService: StorageService,
    public route: ActivatedRoute,
    protected customersSrvc: CustomersService,
    protected constants: ConstantsService,
    public DataService: DataService,
    public router: Router,
    public operationsService: OperationsService) {
    this.currentUser = this.storageService.read<any>('currentUser');
  }
  uploadFile(event) {
    // let files = event.target.files;

    // let uploadFile = files[0];
    // let myUploadItem = new MyUploadItem(uploadFile);
    // myUploadItem.formData = { description: this.description, token: this.currentUser.token,company_id:this.userId };  // (optional) form data can be sent with file
    // this.loading = true;
    // this.uploadingComplete = false;
    // this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
    //   // success callback
    //   this.loading = false;
    //   this.uploadedResponse = response;
    //   this.uploadingComplete = true;
    // };
    // this.uploaderService.onErrorUpload = (item, response, status, headers) => {
    //   // error callback
    //   this.loading = false;
    // };
    // this.uploaderService.onCompleteUpload = (item, response, status, headers) => {
    //   // complete callback, called regardless of success or failure
    //   this.loading = false;


    // };
    // this.uploaderService.upload(myUploadItem);
  }
  start = '0';
  customerPreview = { 'corporate': {}, 'individual': {} };
  pie_perf = {
    'COMPANY_ID': '0'
  }
  // Load the basic information on navigation to this page
  ngOnInit() {

    this.sub = this.route.parent.params.subscribe(params => {
      this.userId = params["id"];
      this.loadCustomerPeoples(params["id"]);
      this.pie_perf.COMPANY_ID = params["id"];
    });

  }


  // load and reload functions
  loadCustomerPeoples(company_id) {

    this.customersSrvc.getCustomerPeoples(company_id, this.start).subscribe(data => {
      //this.customers = data;
      if (data.status == false) {
        this.router.navigate(['/login']);
      } else {
        // this.data = data;
        this.customers = data.all_cus.a;
        this.count = data.COUNT;

        if (this.customers[0] == undefined) {
          this.showEmptyState = true;
        } else {
          this.showEmptyState = false;
        }
        this.DataService.onProfileNav.emit({ 'location': 'home_corporate', 'data': data });
      }

    });

  }
  showCustomerPreview(event, category, id) {

    event.preventDefault();

    // If the data is not loaded, then open it.
    if (this.customerPreview[category][id] == undefined) {
      this.openedTab = id;
      this.customerPreview[category][id] = { data: {} };
      this.customersSrvc.getCustomerPreview(category, id).subscribe(data => {
        this.customerPreview[category][id] = { data: data['cust'], funding: data['funding'], loans: data['loans'], wallet: data['wallet'] };
        console.log(this.customerPreview[category]);
      });
    } else {
      this.openedTab = id;
      return;
    }
  }


  nextRecords(records) {

  }
  prevRecords(records) {

  }

  exportCustomers() {
    this.loading = true;
    this.operationsService.downloadCustomers(this.currentUser.token, this.pie_perf).subscribe(data => {
      this.loading = false;
      if (data.status) {
        alert('Data Successfully exported. Download would start automatically.');
        window.open(data.message);
        return;
      } else {
        alert('Data could not be exported.');
      }
    });
  }

}
