import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-walletdetails',
  templateUrl: './walletdetails.component.html',
  styleUrls: ['./walletdetails.component.css']
})
export class WalletdetailsComponent implements OnInit {
  @Input('state') state: any 
  @Output() openWalletStatement = new EventEmitter();
  @Input('loading') loading=false;
  isWalletSettings=false;
  constructor() { }

  ngOnInit() {
  }
  openStatement() {
    this.openWalletStatement.emit({ "status": 1 });
  }
  fundWallet(){
    
  }
  save(value,valid){

  }
}
