import { UploadItem } from 'angular2-http-file-upload';

export class MyUploadItem extends UploadItem {
  constructor(file: any) {
    super();
    this.url = 'http://137.117.105.90/dataupload_test/api/v2/company/uploadCustomerDocs';
    this.headers = {};
    this.file = file;
  }
}
