import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OptionsserviceService } from '../_services/index';

@Component({
  selector: 'app-loandocument',
  templateUrl: './loandocument.component.html',
  styleUrls: ['./loandocument.component.css']
})
export class LoandocumentComponent implements OnInit {

  public product_documents: any;
  @Input('master') masterName: string;
  public doc = { ddlDocList: '', ddlAddHeader: '', ddlAddSignature: '', ddlSendDateOption: '', txtSendDate: '', ddlEmailReceiver: '' };
  constructor(public optionsService: OptionsserviceService) { }

  ngOnInit() {
    this.optionsService.getProductDocuments(0).subscribe(product_documents => this.product_documents = product_documents);
    console.log(this.masterName)
  }

}
