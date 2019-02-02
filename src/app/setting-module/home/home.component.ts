import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  viewTitle: string;
  setting =  true;

  constructor() { }

  ngOnInit() {
    this.viewTitle = 'General Settings';
  }

  onSettings( setting ) {
    this.setting = !setting;
  }

}
