import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms'; 
import { UserService, OperationsService, AuthenticationService, StorageService } from '../_services/index';
@Component({
  selector: 'app-calendarview',
  templateUrl: './calendarview.component.html',
  styleUrls: ['./calendarview.component.css']
})
export class CalendarviewComponent implements OnInit {
  @Input('schedule_type') schedule_type = false;
  @Input('record_type') record_type = '1';
  @Input('calendarOptions') calendarOptions: any;
  @Input('calendarOptions_') calendarOptions_: any;
  @Input('calendarOptions__') calendarOptions__: any;
  @Input('calendarOptions___') calendarOptions___: any;
  @Input('showSwitch') showSwitch: true;
  @Output() changeTheScheduleType = new EventEmitter();
  currentUser:any;
  constructor(private operationsService:OperationsService,private storageService:StorageService) { 
    this.currentUser = this.storageService.read<any>('currentUser');
  }
  exporting=false;
  onChange(event) {
    this.changeTheScheduleType.emit(event);
  }
  ngOnInit() {
  }
  pie_perf = { 
    PIETPDATE: '',
    PIETPDATE_: '', 
  }
  loading = false;
  downloadRepayments(){
    this.loading = true;
    this.operationsService.downloadRepayments(this.currentUser.token, this.pie_perf).subscribe(data => {
      this.loading=false;
      if (data.status) {
          alert('Data Successfully exported. Download would start automatically.');
          window.open(data.message);
          return;
      }else{
          alert('Data could not be exported.');
      }
  });
  }
}
