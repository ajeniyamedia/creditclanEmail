import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.css']
})
export class EmailTemplateComponent implements OnInit {

  constructor( private dataServices: DataService) { }

  ngOnInit() {
  }

  openemail(type){
    this.dataServices.openmailevent.emit({emailopen: type});
  }
}
