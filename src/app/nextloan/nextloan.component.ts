import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../_services/index';
@Component({
  selector: 'app-nextloan',
  templateUrl: './nextloan.component.html',
  styleUrls: ['./nextloan.component.css']
})
export class NextloanComponent implements OnInit {

  @Input('loan') loan:any;
  @Input('loan_viewed') loan_viewed: any;
  constructor(public router: Router,private DataService: DataService) { }

  ngOnInit() {
  }
  open_loan(REQUEST_ID){
    this.router.navigate(['/loan/', REQUEST_ID, 'contract']);
    this.DataService.borrowerChange.emit(REQUEST_ID); 
  }
}
