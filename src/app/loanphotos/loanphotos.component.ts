import { Component, OnInit, OnDestroy, Output, Input, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  photoHasBeenUploaded = false;
  fileHasBeenUploaded = false;
  doc_types: any;
  DOCTYPE: any;
  @ViewChild('file') file;
  filesUploaded = [];
  public files: Set<File> = new Set();
  uploadingfile = false;
  constructor(private sanitizer: DomSanitizer,
    private DataService: DataService,
    public route: ActivatedRoute,
    public storageService: StorageService,
    public optionsService: OptionsserviceService,
    public loansService: LoansService) {

  }
  fileUploadeds(event) {
    console.log(event)
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  ngOnInit() {
    this.loadRecords()
  }
  addingphoto() {
    this.file_type = '2';
    this.open('photo_form');
    this.filesUploaded = [];
  }
  uploadThePhoto() {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.loading = true;
    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      this.loansService.uploadTheLoanPhoto(this.currentUser.token, this.parentRouteId, this.filesUploaded, this.DOCTYPE, this.description)
        .subscribe(result => {
          this.attachments = result.data.attachments;
          this.doc_types = result.data.doctypes;
          this.open('photo');
          this.loading = false;
        });
    });
  }
  uploadTheFile() {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.loading = true;
    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      this.loansService.uploadTheLoanPhoto(this.currentUser.token, this.parentRouteId, this.filesUploaded, this.DOCTYPE, this.description)
        .subscribe(result => {
          this.attachments = result.data.attachments;
          this.doc_types = result.data.doctypes;
          this.open('attach');
          this.loading = false;
        });
    });
  }
  loadRecords() {
    this.currentUser = this.storageService.read<any>('currentUser');

    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      this.loansService.getLoanAttachments(this.currentUser.token, this.parentRouteId)
        .subscribe(result => {
          this.attachments = result.data.attachments;
          this.doc_types = result.data.doctypes;

        });
    });
  }
  onFilesAdded(event) {
    this.uploadingfile = true;
    let files = event.target.files;
    this.loansService.doUpload(files[0])
      .subscribe(result => {
        this.uploadingfile = false;
        if (result.status == true) {
          this.photoHasBeenUploaded = true;
          this.filesUploaded.push(result.result);
        }

      });
  }
  openUploadDialog() {
    this.file.nativeElement.click();
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
    this.filesUploaded = [];
  }
  close() {
    this.view = 'photo';
    this.filesUploaded = [];
  }

}
