import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { OperationsService } from '../../_services/index';
@Component({
  selector: 'app-queuecancel',
  templateUrl: './queuecancel.component.html',
  styleUrls: ['./queuecancel.component.css']
})
export class QueuecancelComponent implements OnInit {
  @Input('schedule_type') schedule_type = '0';
  @Input('record_type') record_type = '0';
  @Input('disburse') disburse : any;
  @Output() rejectRequest = new EventEmitter();
  @Output() moveToLevel = new EventEmitter();
  @Output() close = new EventEmitter();
  @Input('currentUser') currentUser:any;
  approval_levels:any;
  has_approvals=false;
  formdata = {
    "REJECT_ACTION":'0',
    "REJECT_TO_LEVEL":'0',
    "COMMENTS":''
  }
  loading=false;
  is_done = false;
  status:any;
  constructor(private operationsService:OperationsService) { }

  ngOnInit() {

    this.initialize();
  }

  initialize(){
    this.operationsService.getQueueSummary(this.currentUser.token, this.record_type, this.schedule_type, this.disburse)
    .subscribe(data => {
      this.has_approvals = data.has_approvals;
      this.approval_levels = data.approval_levels;
      this.formdata.REJECT_ACTION = '0';
      this.formdata.REJECT_TO_LEVEL = '0';
      this.formdata.COMMENTS = '';
      this.has_approvals = data.has_approvals;
    });
  }
  doRejection(value, valid){
    if(this.has_approvals){
      this.moveToLevel.emit({schedule_type:this.schedule_type,record_type:this.record_type,disburse:this.disburse,formdata:this.formdata});
    }
    if(!this.has_approvals){ 
      this.operationsService.cancelQueuedOperation(this.currentUser.token,{schedule_type:this.schedule_type,record_type:this.record_type,disburse:this.disburse,formdata:this.formdata})
      .subscribe(result => {
        this.is_done = true;
        this.status = result;
      });
    }
  }
  closeOverlaY(){
    this.close.emit({});
  }
}
