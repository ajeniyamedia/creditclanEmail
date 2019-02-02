import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services';

@Component({
  selector: 'app-newsettings',
  templateUrl: './newsettings.component.html',
  styleUrls: ['./newsettings.component.css']
})
export class NewsettingsComponent implements OnInit {
  profile = true;
  registration = true;
  intrest = true;
  fee = true;
  penalties = true;
  loan = true;
  setting = true;
  view ='mobile';
  viewMode = '';
  subview='';
  viewTitle = 'General';
  constructor(public dataService:DataService) { }

  ngOnInit() {
    this.viewMode = 'general';
    this.viewTitle = 'General';
  }

  onSelect(profile) {
    this.profile = !profile;
  }

  onRegistration(registration) {
    this.registration = !registration;
  }

  onIntrest( intrest ) {
    this.intrest = !intrest;
  }

  onFees( fee ) {
    this.fee = !fee;
  }

  onPenalties( penalties ) {
    this.penalties = !penalties;
  }

  onLoanDefault( loan ) {
    this.loan = !loan;
  }

  onSettings( setting ) {
    this.setting = !setting;
  }
  changeView(viewMode,view,subview){
    this.view=view;
    this.viewMode=viewMode,
    this.subview=subview;
    this.dataService.onChangeSettingsView.emit({ view: this.view })

  }

}
