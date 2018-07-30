import { Component, OnInit, Input } from '@angular/core';
import { RemitaService } from '../_services/remita.service';

@Component({
  selector: 'app-customer-remita',
  templateUrl: './customer-remita.component.html',
  styleUrls: ['./customer-remita.component.css']
})
export class CustomerRemitaComponent implements OnInit {
  section_open = "basicInfo";
  @Input('userId') userId: any;
  @Input('currentUser') currentUser: any;
  loading = false;
  remita_records: any;
  record_found=false;
  constructor(public remitaService: RemitaService) { }

  ngOnInit() {
    this.loading = true;
    this.remitaService.getRemitaRecords(this.currentUser.token, this.userId)
      .subscribe(data => {
        if (data.status == true) {
          this.remita_records = data.data;
          this.record_found = true;
        } else {
          this.record_found = false;
        }

      });
  }
  toogleView(section) {
    this.section_open = section;
  }

}
