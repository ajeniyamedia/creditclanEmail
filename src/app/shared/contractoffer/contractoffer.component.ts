import { Component, OnInit } from '@angular/core';
import { OptionsserviceService, LoansService, StorageService, OperationsService } from '../../_services/index';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-contractoffer',
  templateUrl: './contractoffer.component.html',
  styleUrls: ['./contractoffer.component.css']
})
export class ContractofferComponent implements OnInit {

  offer: any;
  currentUser: any;
  parentRouteId: any;
  sub: any;
  loading = false;
  editorConfig = {
    editable: true,
    spellcheck: false,
    height: '350px',
    minHeight: '350px',
    placeholder: 'Enter your text here',
    translate: 'no',
    width: "100%",
    minWidth: "100%"
  };
  sendform = {
    'REQUEST_ID': '',
    'TIME_TO_SEND': ''
  };
  contractSending=false;
  sendingContract = false;
  constructor(public toastr: ToastrService, public route: ActivatedRoute, public storageService: StorageService,
    public optionsService: OptionsserviceService, public loansService: LoansService,
    public operationsService: OperationsService) {

  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }
  ngOnInit() {
    this.currentUser = this.storageService.read<any>('currentUser');

    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      this.loansService.getLoanOffer(this.currentUser.token, this.parentRouteId)
        .subscribe(data => {
          this.offer = data.offer;
          this.sendform.REQUEST_ID = this.offer.REQUEST_ID;
          this.sendform.TIME_TO_SEND = '1';


          this.sendform.REQUEST_ID = this.offer.REQUEST_ID;
        });
    });
  }
  sendContract(value, valid) {
    this.loading = true;
    this.loansService.sendContract(this.currentUser.token, value,this.offer)
      .subscribe(data => {
        this.loading = false;
        this.showSuccess(data.message);
      });
  }
  saveOL(value, valid) {
    this.loading = true;
    this.loansService.saveOLSettings(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        this.showSuccess(data.message);
      });
  }

}
