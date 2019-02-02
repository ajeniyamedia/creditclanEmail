import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ussd-chat',
  templateUrl: './ussd-chat.component.html',
  styleUrls: ['./ussd-chat.component.css']
})
export class UssdChatComponent implements OnInit {

  constructor() { }
  view = 'ussd';
  ngOnInit() {
  }

}
