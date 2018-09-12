import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { UploadService } from '../upload.service';
import { DataService } from '../../_services/index';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  @Output() fileUploaded = new EventEmitter();
  constructor(public dialog: MatDialog, public uploadService: UploadService, public dataService: DataService) {
    this.dataService.onFileUploaded.subscribe(res => {
      this.fileUploaded.emit({uploadedfiles: res.uploadedFiles});
    });
  }

  public openUploadDialog() {
    const dialogRef = this.dialog.open(DialogComponent, { width: '50%', height: '50%' });
  }
}
