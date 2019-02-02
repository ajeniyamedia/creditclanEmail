import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { EmailService } from '../email.service';
import { ToastrService } from 'ngx-toastr';

import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-borrower-received-offer-email',
  templateUrl: './borrower-received-offer-email.component.html',
  styleUrls: ['./borrower-received-offer-email.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(500)
      ]),

      transition('* => void', [
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class BorrowerReceivedOfferEmailComponent implements OnInit {

  formCheckbox: FormGroup;
  form: FormGroup;
  defaultSetting: boolean;
  showLogoPanelOnOver = false;
  showEditHeadingPanel = false;
  loading: boolean; 
  posts: any[];
  vendor: any;
  content: any;
  vendor_id: any;
  section_type: any;
  email_type: any;
  uploadData: any;
  contentLogo: any;
  showFieldPanel: boolean;
  showEditFooterPanel: boolean;
  editorContent: boolean;
  selectedFile: File;
  token: any = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb21wYW55RW1haWwiOiJ0b3BlYXBwc0BnbWFpbC5jb20iLCJjb21wYW55cGhvbmUiOiIwOTA2NzU0NzIzMiIsImNvbXBhbnlOYW1lIjoiS1lDIEFGUklDQSIsImlzX3N1cGVyX2FkbWluIjoxLCJpZCI6MjMyLCJzdGF0dXMiOnRydWUsInN1Y2Nlc3MiOiJDcmVhdGVkIHN1Y2Nlc3NmdWwifQ.JhPRD0aqoxkZ6UEyqfQZNQugMnboPxCuFJ4wQGLgA6k';
  fields: any;
  updated: any;
  mailLogo: any;
  mailBodySection: any;
  mailBodyContent: any;
  mailFooterSection: any;
  footerBodyContent: any;
  mailLogoSection: any;
  vendorSetting: any;
  vendorSettingData: any;
  logoUrl: string;
  option: boolean;

  viewMode = '';

  settingPage = {
    pageSetting: false,
    headerSetting: false,
    bodySetting: false,
    footerSetting: false,
    logoUpdate: false,
    pageSettingSection: true,
  };

  constructor(private fb: FormBuilder,
    public toastr: ToastrService,
    private services: EmailService) {
    this.option = false;
    const vendorIdData = localStorage.getItem('platform');
    const userdata = JSON.parse(vendorIdData);
    this.vendor_id = userdata.PEOPLE_ID;
    this.email_type = 10;
  }


  updateBodyContentForm = new FormGroup({
    bodyContent: new  FormControl('', [Validators.required]),
  });

  updateFooterContentForm = new FormGroup({
    footerContent: new  FormControl('', [Validators.required]),
  });

  

  updateUserFieldContentForm = new FormGroup({
    firstName: new  FormControl(''),
    lastName: new  FormControl(''),
    phoneNumber: new  FormControl(''),
    email: new  FormControl(''),
    address: new  FormControl(''),
    loanAmount: new  FormControl(''),
    dateDue: new  FormControl(''),
    bvn: new  FormControl(),
    accountNumber: new  FormControl(''),
    accountName: new  FormControl(''),
    bankName: new  FormControl(''),
  });


  submit() {
    const selectedOrderIds = this.formCheckbox.value.fields; 
  
    this.loading = true;  

    const uploadData = {
      'vendor_id': this.vendor_id,
      'loan_amount': selectedOrderIds[0].length == 0 ? this.vendorSettingData.loan_amount : selectedOrderIds[0],
      'duration': selectedOrderIds[1].length == 0 ? this.vendorSettingData.duration : selectedOrderIds[1],
      'fees': selectedOrderIds[2].length == 0 ? this.vendorSettingData.fees : selectedOrderIds[2],
      'net_disbursement': selectedOrderIds[3].length == 0 ? this.vendorSettingData.net_disbursement : selectedOrderIds[3],
      'monthly_installment': selectedOrderIds[4].length == 0 ? this.vendorSettingData.monthly_installment : selectedOrderIds[4],
      'total_repayment': selectedOrderIds[5].length == 0 ? this.vendorSettingData.total_repayment : selectedOrderIds[5],
      'contract_id': selectedOrderIds[6].length == 0 ? this.vendorSettingData.contract_id : selectedOrderIds[6],
      'lender': selectedOrderIds[7].length == 0 ? this.vendorSettingData.lender : selectedOrderIds[7],
      'obligor': selectedOrderIds[8].length == 0 ? this.vendorSettingData.obligor : selectedOrderIds[8],
      'facility_type': selectedOrderIds[9].length == 0 ? this.vendorSettingData.facility_type : selectedOrderIds[9],
      'facility_amount': selectedOrderIds[10].length == 0 ? this.vendorSettingData.facility_amount : selectedOrderIds[10],
      'purpose': selectedOrderIds[11].length == 0 ? this.vendorSettingData.purpose : selectedOrderIds[11],
      'tenure': selectedOrderIds[12].length == 0 ? this.vendorSettingData.tenure : selectedOrderIds[12],
      'first_repayment_date': selectedOrderIds[13].length == 0 ? this.vendorSettingData.first_repayment_date : selectedOrderIds[13],
      'token': this.token
    };

    this.services.addSetting(uploadData)
      .subscribe(onUpdateBodyContent => {
        this.loading = false;
        this.fetchOfferLetterFieldSetting ();
        this.toastr.success(onUpdateBodyContent, 'Success!');
      }); 
    
  }


  //////////////////////////////////////////////////////////////////

  insertTextAtCursor(text) {
    const doc = document as any;
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode( document.createTextNode(text) );
        }
    } else if (doc.selection && doc.selection.createRange) {
      doc.selection.createRange().text = text;
    }
  }

  ////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////
  /// Update email body content

  onUpdateBodyContent(file){
    this.loading = true;
    this.section_type = 3;

    const uploadData = {
      'content': file,
      'vendor_id': this.vendor_id,
      'email_type': this.email_type,
      'section_type': this.section_type,
      'token': this.token
    };

    this.services.addContent(uploadData)
    .subscribe(onUpdateBodyContent => {
      this.loading = false;
      this.toastr.success(onUpdateBodyContent, 'Success!');

    });
  }

  ////////////////////////////////////////////////////////////////////////
  //// Update email footer content

  onUpdateFooterContent(file){
    this.loading = true;
    this.section_type = 4;

    const uploadData = {
      'content': file,
      'vendor_id': this.vendor_id,
      'email_type': this.email_type,
      'section_type': this.section_type,
      'token': this.token
    };

    this.services.addContent(uploadData)
    .subscribe(onUpdateBodyContent => {
      this.loading = false;
      this.toastr.success(onUpdateBodyContent, 'Success!');
    });
  }

  ////////////////////////////////////////////////////////////////////////
  //// Get offer letter field setting from the database

  fetchOfferLetterFieldSetting () {
    this.defaultSetting = true;
 
    const uploadData = {
      'vendor_id': this.vendor_id,
      'email_type': this.email_type,
      'token': this.token
    };

    this.services.getSetting(uploadData)
      .subscribe(setting => {
        this.vendorSettingData  = setting;
        console.log(this.vendorSettingData);
        this.fields = [
          { name: 'Loan Amount', value: setting.loan_amount == 1 ? true : false },
          { name: 'Duration', value: setting.duration == 1 ? true : false },
          { name: 'Fees', value: setting.fees == 1 ? true : false },
          { name: 'Net Disbursement' , value: setting.net_disbursement == 1 ? true : false  },
          { name: 'Monthly Installment', value: setting.monthly_installment  == 1 ? true : false },
          { name: 'Total Repayment', value: setting.total_repayment == 1 ? true : false },
          { name: 'Contract ID' , value: setting.contract_id == 1 ? true : false },
          { name: 'Lender' , value: setting.lender == 1 ? true : false },
          { name: 'Obligor' , value: setting.obligor == 1 ? true : false },
          { name: 'Facilty Type' , value: setting.facility_type == 1 ? true : false },
          { name: 'Facilty Amount' , value: setting.facility_amount == 1 ? true : false },
          { name: 'Purpose' , value: setting.purpose == 1 ? true : false },
          { name: 'Tenure' , value: setting.tenure == 1 ? true : false },
          { name: 'First Repayment Date' , value: setting.first_repayment_date == 1 ? true : false }
        ];

        // Create a new array with a form control for each order
          const controls = this.fields.map(c => new FormControl(''));
          this.formCheckbox = this.fb.group({
            fields: new FormArray(controls)
          }); 
    });
  }

   
  /////////////////////////////////////////////////////////////////

  ngOnInit() {

    this.createForm();
    this.mailBodySection = 3;
    this.mailLogoSection = 2;
    this.mailFooterSection = 4;
    this.defaultSetting = true;
 
    const uploadData = {
      'vendor_id': this.vendor_id,
      'email_type': this.email_type,
      'token': this.token
    };


    this.services.getVendorInformation(uploadData)
      .subscribe(onGetUser => {
        console.log(onGetUser);
    }); 

    ////////////////////////////////////////////////////////////////////
    // Get mail body content

    const getBodyContent = {
      'vendor_id': this.vendor_id,
      'email_type': this.email_type,
      'section_type': this.mailBodySection,
      'token': this.token
    };


    this.services.getContent(getBodyContent)
      .subscribe(bodyContent => {
        this.mailBodyContent = bodyContent[0].content;
    }); 

    ////////////////////////////////////////////////////////////////////
    // Get vendor logo

    const getLogoContent = {
      'vendor_id': this.vendor_id,
      'email_type': this.email_type,
      'section_type': this.mailLogoSection,
      'token': this.token
    };


    this.services.getContent(getLogoContent)
      .subscribe(logoContent => {
        this.logoUrl = logoContent[0].content;
    }); 

    ////////////////////////////////////////////////////////////////////
    // Get footer content

    const getFooterContent = {
      'vendor_id': this.vendor_id,
      'email_type': this.email_type,
      'section_type': this.mailFooterSection,
      'token': this.token
    };


    this.services.getContent(getFooterContent)
      .subscribe(footerContent => {
        this.footerBodyContent = footerContent[0].content;
    });

    ////////////////////////////////////////////////////////////////////
    // Get setting 
    this.fetchOfferLetterFieldSetting ();
  }
  
  //////////////////////////////////////////////////////////////////////////////////////
  // preparing the uploaded logo for upload

  private prepareSave(): any {
    let input = new FormData();
    input.append('avatar', this.form.get('avatar').value);
    return input;
  }

  onFileChange(event) {
    this.selectedFile = event.target.files[0];
    let file = event.target.files[0];
    this.form.get('avatar').setValue({
      filename: file.name,
      filetype: file.type
    })
  }

  ////////////////////////////////////////////////////////////////////
  // upload logo to endpoint

  createForm() {
    this.form = this.fb.group({
      avatar: [null , Validators.required]
    });
  }


  onSubmit() {
    this.loading = true;
    this.section_type = 2;

    const uploadData = new FormData();
    uploadData.append('logo', this.selectedFile, this.selectedFile.name);
    uploadData.append('vendor_id', this.vendor_id);
    uploadData.append('email_type', this.email_type);
    uploadData.append('section_type', this.section_type);
    uploadData.append('token', this.token);

    this.services.uploadLogo(uploadData)
    .subscribe(uploadLogo => {
      this.loading = false;
      this.logoUrl = uploadLogo.logo_link;
      this.clearFile();
    });
  }

  @ViewChild('fileInput') fileInput: ElementRef;

  clearFile() {
    this.fileInput.nativeElement.value = '';
  }

}
