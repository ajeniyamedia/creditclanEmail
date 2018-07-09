import { Component, OnInit,OnDestroy, EventEmitter, ViewContainerRef, ElementRef,ViewEncapsulation, Output, Input} from '@angular/core';
import { OperationsService, AuthenticationService, StorageService} from '../_services/index';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-web-ussd',
  templateUrl: './web-ussd.component.html',
  styleUrls: ['./web-ussd.component.css']
})
export class WebUssdComponent implements OnInit {
  uniqid = '';
  response:any;
  availability:any='0';
  ussdRequest= {
    phoneNumber: '',
    serviceCode: '',
    sessionId : this.uniqID(20),
    text: ''
  }
  constructor(
    public operationsService:OperationsService,
    public toastr: ToastrService,
  ) { }

  showError(message) {
    this.toastr.error(message, 'Error');
  }

  ngOnInit() {
  }

  uniqID(idlength) {
    var charstoformid = '_0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
    if (! idlength) {
        idlength = Math.floor(Math.random() * charstoformid.length);
    }
    var uniqid = '';
    for (var i = 0; i < idlength; i++) {
        uniqid += charstoformid[Math.floor(Math.random() * charstoformid.length)];
    }

        return uniqid;

  }

  saveUssd(value, valid){
    this.operationsService.saveUssd(this.ussdRequest) 
    .subscribe(data => {
        this.response = data.substring(3);
        console.log(this.response);
        this.availability = '1';
  });

}

}
