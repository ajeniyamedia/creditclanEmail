import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-newaccount',
  templateUrl: './newaccount.component.html',
  styleUrls: ['./newaccount.component.css']
})
export class NewaccountComponent implements OnInit {

  @Input('loading') loading = false;
  @Input('banks') banks: any;
  @Input('showForm') showForm = false;
  @Input('showSearch') showSearch = false;
  @Input('nigerian_banks') nigerian_banks: any;
  @Input('VERIFY_STATUS') VERIFY_STATUS = false;
  @Input('charge_account') charge_account = false;
  @Input('destination') destination = false;
  @Input('fresponse') fresponse;
  @Input('confirming') confirming = true;
  @Input('types') types = true;
  @Input('parents') parents = true;
  @Input('otpConfirmed') otpConfirmed = false;
  @Input('otpHBSFC') otpHBSFC = false;
  @Input('confirmingOTP') confirmingOTP = true;
  @Input('lenderbanksaved') lenderbanksaved = false;
  @Input('lbHBSFS') lbHBSFS = false;
  @Input('account') account = { GL_PARENT: '', GL_NAME: '', GL_CATEGORY: '0', GL_TYPE: '0' };
  newAccountForm: FormGroup;
  categories = [
    {
      "value": "2", "display": "Leaf"
    },
    {
      "value": "1", "display": "Node"
    }
  ]
  report_code = [
    {
      "value": "1", "display": "Trial Balance", "checked": false
    },
    {
      "value": "2", "display": "Balance Sheet", "checked": false
    }
  ]
  excludes = [
    {
      "value": "1", "display": "Trial Balance", "checked": false
    },
    {
      "value": "2", "display": "Balance Sheet", "checked": false
    },
    {
      "value": "3", "display": "Profit and Loss", "checked": false
    }
  ]
  @Output() saveTheLenderAccount = new EventEmitter();
  constructor(public fb: FormBuilder) {
    this.newAccountForm = fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'GL_CATEGORY': [null, Validators.required],
      'GL_TYPE': [null, Validators.required],
      'GL_NAME': [null, Validators.required],
      'GL_PARENT': [null, Validators.required],
    })
  }

  ngOnInit() {

  }

  saveLenderAccount(value) {
    this.account.GL_CATEGORY = value.GL_CATEGORY;
    this.account.GL_PARENT = value.GL_PARENT;
    this.account.GL_NAME = value.GL_NAME;
    this.account.GL_TYPE = value.GL_TYPE;
    this.saveTheLenderAccount.emit()
  }
}
