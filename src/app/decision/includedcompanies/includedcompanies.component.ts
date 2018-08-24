import { Component, OnInit, Input } from '@angular/core';
import { OperationsService } from '../../_services';

@Component({
  selector: 'app-includedcompanies',
  templateUrl: './includedcompanies.component.html',
  styleUrls: ['./includedcompanies.component.css']
})
export class IncludedcompaniesComponent implements OnInit {

  @Input('currentUser') currentUser;
  companies:any;

  constructor(private operationsService:OperationsService) { }

  ngOnInit() {
    this.operationsService.getSpecialCompanies(this.currentUser.token)
      .subscribe(data => {
        if(data.status==true){
          this.companies = data.data.companies;
        }
      });

  }

}
