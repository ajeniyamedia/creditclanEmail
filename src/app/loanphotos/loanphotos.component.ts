import { Component, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { DataService, OptionsserviceService, LoansService, StorageService } from '../_services/index'; 
import { Loan } from '../_interfaces/loan.interface';
import { Loan_ } from '../_models/loan_';
import { ActivatedRoute } from '@angular/router';
// import { Uploader } from 'angular2-http-file-upload';
// import { MyUploadItem } from './my-upload-item';
@Component({
  selector: 'app-loanphotos',
  templateUrl: './loanphotos.component.html',
  styleUrls: ['./loanphotos.component.css']
})
export class LoanphotosComponent implements OnInit {
  @Input('parentRouteId') parentRouteId: number;
  @Input('sub') sub: any;
  @Input('sub_summary') sub_summary: any;
  view = 'photo';
  attachments: any;
  currentUser: any;
  description = "";
  file_field: any;
  loading = false;
  file_type = '2';
  constructor(private DataService: DataService, public route: ActivatedRoute, public storageService: StorageService, public optionsService: OptionsserviceService, public loansService: LoansService) {

  }


  ngOnInit() {
    this.loadRecords()
  }
  loadRecords() {
    this.currentUser = this.storageService.read<any>('currentUser');

    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      this.loansService.getLoanAttachments(this.currentUser.token, this.parentRouteId)
        .subscribe(attachments => {
          this.attachments = attachments.data


        });
    });
  }
  uploadFile(event) {
    // let files = event.target.files;
    // //this.loansService.uploadFile(files[0],this.description,this.parentRouteId);
    // let uploadFile = files[0];
    // let myUploadItem = new MyUploadItem(uploadFile);
    // myUploadItem.formData = { description: this.description, token: this.currentUser.token, request_id: this.parentRouteId, section: this.file_type };  // (optional) form data can be sent with file
    // this.loading = true;
    // this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
    //   // success callback
    //   this.loading = false;
    // };
    // this.uploaderService.onErrorUpload = (item, response, status, headers) => {
    //   // error callback
    //   this.loading = false;
    // };
    // this.uploaderService.onCompleteUpload = (item, response, status, headers) => {
    //   // complete callback, called regardless of success or failure
    //   this.loading = false;
    //   this.loadRecords();
    //   this.view = "photo"
    // };
    // this.uploaderService.upload(myUploadItem);
  }
  open(section) {
    this.view = section;
    this.description = '';
  }
  close() {
    this.view = 'photo';
  }

}
