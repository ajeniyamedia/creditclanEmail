import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../_services/customers.service';
import { ConstantsService } from '../../_services/constants.service';
import { DataService } from '../../_services/index';

@Component({
  selector: 'app-customer-attachments',
  templateUrl: './customer-attachments.component.html',
  styleUrls: ['./customer-attachments.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CustomerAttachmentsComponent implements OnInit {

  records = []; // Customer Information
  sub; // Instance of the route subscription
  userType; // Type of user
  userId; // User Id
  openForm = false;
  current = 0;
  show_prev = false;
  show_next = false;
  record: any;
  showingRecords = true;
  cust: any;


  attachToUpload: any = '';
  attachDesc = [];


  constructor(public route: ActivatedRoute,
    public DataService: DataService,
    protected customersSrvc: CustomersService,
    protected constants: ConstantsService) { }

  // Load the basic information on navigation to this page
  ngOnInit() {
    this.sub = this.route.parent.params.subscribe(params => {
      this.userType = params["type"];
      this.userId = params["id"];
      this.customersSrvc.getAttachments('reqatt', 'Sa6UJDAkLtaEQNrAbl5bScyFdPyp0N4UjdmXIdr3fzN36jQfpzh1pZobb0w5S5r1UE+R7IV7SVy5Jmd5RL0f5w==', this.userType, this.userId, this.current).subscribe(data => {
        this.records = data.queue;
        this.current = data.current;
        this.show_prev = data.show_prev;
        this.show_next = data.show_next;
        this.cust = data.customer;

        // Publish section
        this.DataService.onProfileNav.emit({ 'location': 'attachment', 'data': data.queue.length });

      });
    });
  }
  openAtt(record) {
    this.record = record;
    this.showingRecords = false
  }
  nextRecords() {
    this.sub = this.route.parent.params.subscribe(params => {
      this.userType = params["type"];
      this.userId = params["id"];
      this.customersSrvc.getAttachments('reqatt', 'Sa6UJDAkLtaEQNrAbl5bScyFdPyp0N4UjdmXIdr3fzN36jQfpzh1pZobb0w5S5r1UE+R7IV7SVy5Jmd5RL0f5w==', this.userType, this.userId, this.current).subscribe(data => {
        this.records = data.queue;
        this.current = data.current;
        this.show_prev = data.show_prev;
        this.show_next = data.show_next;
      });
    });
  }
  prevRecords() {
    this.sub = this.route.parent.params.subscribe(params => {
      this.userType = params["type"];
      this.userId = params["id"];
      this.customersSrvc.getAttachments('reqatt', 'Sa6UJDAkLtaEQNrAbl5bScyFdPyp0N4UjdmXIdr3fzN36jQfpzh1pZobb0w5S5r1UE+R7IV7SVy5Jmd5RL0f5w==', this.userType, this.userId, this.current - 5).subscribe(data => {
        this.records = data.queue;
        this.current = data.current - 5;
        if (data.current - 5 <= 5) { this.show_prev = false; } else {
          this.show_prev = data.show_prev;
        }

        this.show_next = data.show_next;
      });
    });
  }
  // Toogle open form
  toogleForm() {
    if (this.openForm == true) {
      this.openForm = false;
    } else {
      this.openForm = true;
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  saveFile(event) {
    let files = event.target.files;
    let formData: any = new FormData();
    formData.append("file", files[0], files[0].name);
    this.attachToUpload = formData;
  }

  // Upload Attachment
  uploadPayslip() {
    if (this.attachToUpload == '') {
      alert("Kindly select a attachment file to upload...");
      return;
    }

    this.customersSrvc._uploadFile("customer/uploadFile/", [], this.attachToUpload).then((data) => {
      if (data['status']) {

        // Set the data
        // this.payslipData['USER_ID'] = this.userId;
        // this.payslipData['RECORD_ID'] = this.cust.CURRENT_PEOPLE_WORK_ID;
        // this.payslipData['DOC_TYPE'] = 3;
        // this.payslipData['FILE_NAME'] = data['data']['upload_data']['file_name'];

        // this.customersSrvc.uploadStatement(this.payslipData).subscribe(data => {   
        //     if (data.status) {
        //         alert(data.message);
        //         this.load();
        //         this.subSection = 'payslips';
        //     }        
        // }); 
      }
    }, (error) => {
      console.error(error);
      alert("An error occured. File could not be uploaded.");
    });
  }

}
