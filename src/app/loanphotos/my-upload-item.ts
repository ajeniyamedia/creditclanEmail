import { UploadItem } from 'angular2-http-file-upload';

export class MyUploadItem extends UploadItem {
  constructor(file: any) {
    super();
    this.url = 'https://dataupload.creditclan.com/api/v2/loan/uploadDocs';
    this.headers = {};
    this.file = file;
  }
}
