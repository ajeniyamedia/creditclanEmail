import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../_services/customers.service';
import { LoansService, StorageService } from '../../_services/index';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})

// styleUrls: ['./customer-update.component.css'] - This style is more like it

export class CustomerUpdateComponent implements OnInit {
  loading = false;
  // Basic
  @Input('userType') userType = "individual"; // Type of user
  @Input('userId') userId; // User Id
  @Input('external') external = false;
  currentUser: any;
  // Select Options
  months = [
    { value: '1', display: 'January' },
    { value: '2', display: 'Feburary' },
    { value: '3', display: 'March' },
    { value: '4', display: 'April' },
    { value: '5', display: 'May' },
    { value: '6', display: 'June' },
    { value: '7', display: 'July' },
    { value: '8', display: 'August' },
    { value: '9', display: 'September' },
    { value: '10', display: 'October' },
    { value: '11', display: 'November' },
    { value: '12', display: 'December' }
  ];
  gender = [
    { value: 0, display: 'Male' },
    { value: 1, display: 'Female' }
  ];
  marital_status = [
    { value: 0, display: '' },
    { value: 1, display: 'Single' },
    { value: 2, display: 'Married' },
    { value: 3, display: 'Widowed' }
  ];

  // Models
  model = {
    basicInfo: { open: true, data: {}, prev: {} },
    address: { open: false, data: {}, prev: {} },
    work: { open: false, data: {}, prev: {} },
    id: { open: false, data: {}, prev: {} },
    nok: { open: false, data: {}, prev: {} },
    director: { open: false, data: {}, prev: {} },
    phone: { open: false, data: {}, prev: {} },
    edu: { open: false, data: {}, prev: {} },
    dump: {
      profile_photo: null
    },
    individualExtra: {}
  }

  last_updated;

  // Driving Licence Expiry Date Selection
  startDate = 2016;
  maxDuration = new Array(16);

  // Function to fetch keys from object to use in iteration
  keysGetter = Object.keys;

  // Director Model
  director = {
    KEY: '',
    DIR_NAME: '',
    DIR_SURNAME: '',
    BVN: ''
  }

  edu_levels = [];
  photoHasBeenUploaded = false

  // Open form
  openForm = false;
  @ViewChild('file') file;
  filesUploaded = [];
  public files: Set<File> = new Set();
  uploadingfile = false;
  btnText = "Upload Photo";
  fileAdded = false;
  constructor(protected customersSrvc: CustomersService,
    public route: ActivatedRoute, private toastr: ToastrService,
    public loansService: LoansService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }
  openUploadDialog() {
    if (!this.fileAdded) {
      this.file.nativeElement.click();
    } else {
      this.uploadingfile = true;
      this.customersSrvc.updateProfilePhoto(this.currentUser.token, this.model.basicInfo.data, this.model.dump.profile_photo).subscribe(data => {
        this.uploadingfile = false;
this.btnText = 'Upload Photo';
        this.showSuccess(data.message);
      });
    }

  }
  onFilesAdded(event) {
    this.uploadingfile = true;
    const files = event.target.files;
    this.loansService.doUploadPhoto(files[0])
      .subscribe(result => {
        this.uploadingfile = false;
        this.fileAdded = true;
        this.btnText = "Save";
        this.model.dump.profile_photo = result.data.upload_data.file_name;

      });
  }
  loadRecords() {

    // Load Basic informtion
    this.customersSrvc.getCustomerUpdateData(this.userType, this.userId).subscribe(data => {
      this.model.basicInfo.data = data.data;
      this.model.basicInfo.prev = data.prev;

      // Education Information
      let edu = {
        EDUCATION_INSTITUTION: data['user']['EDUCATION_INSTITUTION'],
        EDUCATION_LEVEL_ID: data['user']['EDUCATION_LEVEL_ID'],
        EDUCATION_QUALIFICATION: data['user']['EDUCATION_QUALIFICATION'],
        SPECIFY_QUALIFICATIONS: data['user']['SPECIFY_QUALIFICATIONS'],
      }
      this.model.edu.data = edu;
      this.model.edu.prev = edu;
      this.edu_levels = data['education_levels'];

      // Set extra information for corporate users
      if (this.userType == 'corporate') {
        this.model.address.prev = data.add_prev;
        this.model.director.prev = data.dir_prev;
        this.model.director.data = data.dir_prev;

        this.model.address.data = data.add_data;
        this.model.phone.data = data.phone_data;
      }

      // Save the response to a common accessible dump
      this.last_updated = data['user']['DATE_MODIFIED'];
      this.model.dump = data;
    });

    // If this user is an individual, then load the extra data
    if (this.userType == "individual") {
      this.customersSrvc.getIndividualExtraData(this.userId).subscribe(data => {
        // Preview Information
        this.model.address.prev = data.add_prev;
        this.model.work.prev = data.work_prev;
        this.model.id.prev = data.id_prev;
        this.model.nok.prev = data.nok_prev;

        // Data Information
        this.model.address.data = data.add_data;
        this.model.work.data = data.work_data;
        this.model.id.data = data.id_data;
        this.model.nok.data = data.nok_data;
      });
    }
  }

  // Load the information to be updated
  ngOnInit() {
    if (this.external) {
      console.log(this.userType)
      this.loadRecords()
    } else {
      this.route.params.subscribe(params => {
        this.userType = params["type"];
        this.userId = params["id"];
        this.loadRecords();
      });
    }

  }


  /*======== Common Functions ==============*/

  // Toggle a section open. Shorthand copied from Soji-Okunnuga.
  toogleView(section) {
    this.model[section]['open'] = !this.model[section]['open'];
  }

  // Update Basic Info
  updateBasicInfo() {
    this.loading = true;
    this.customersSrvc.updateBasicInfo(this.model.basicInfo.data).subscribe(data => {
      this.loading = false;
      if (data) {
        this.model.director.data = data.directors;
      }
      this.showSuccess(data.message);
    });
  }

  // Update Education Information
  updateEducation() {
    this.loading = true;
    this.customersSrvc.updateEducation(this.userId, this.model.edu.data).subscribe(data => {
      this.loading = false;
      if (data) {
        this.showSuccess(data.message);
      }
    });
  }

  /*======== Individual Functions ==========*/
  updateAddress() {
    this.loading = true;
    this.customersSrvc.updateAddress(this.model.address.data).subscribe(data => {
      this.loading = false;
      if (data.status) {
        this.showSuccess(data.message);
      }
    });
  }

  updateWork() {
    this.loading = true;
    this.customersSrvc.updateWork(this.model.work.data).subscribe(data => {
      this.loading = false;
      if (data.status) {
        this.showSuccess(data.message);
      }
    });
  }

  updateId() {
    this.loading = true;
    this.customersSrvc.updateId(this.model.id.data).subscribe(data => {
      this.loading = false;
      if (data.status) {
        this.showSuccess(data.message);
      }
    });
  }

  updateNok() {
    this.loading = true;
    this.customersSrvc.updateNok(this.model.nok.data).subscribe(data => {
      this.loading = false;
      if (data.status) {
        this.showSuccess(data.message);
      }
    });
  }

  /*======== Corporate Functions ===========*/

  // Update Phone number
  updatePhone() {
    this.loading = true;
    this.customersSrvc.updatePhone(this.model.phone.data).subscribe(data => {
      this.loading = false;
      if (data.status) {
        this.showSuccess(data.message);
      }
    });
  }

  // Registers a Director for inclusion into the director list
  registerDirector() {
    if (this.director.DIR_NAME == '') {
      alert('Provide a valide First-Name, Last-Name and BVN number.');
      return;
    }

    this.customersSrvc.registerDirector(this.director).subscribe(data => {
      if (data.directors) {
        this.director = {
          KEY: '',
          DIR_NAME: '',
          DIR_SURNAME: '',
          BVN: ''
        }
        this.model.director.data = data.directors;
      }
    });
  }

  // Adds an already registered director to the list of directors
  addDirector() {
    this.customersSrvc.addDirector(this.userId).subscribe(data => {
      if (data.status) {
        this.showSuccess("Directors Successfully Updated");
      }
    });
  }


  // Deletes a Director from a corporate profile
  deleteDirector(directorId) {
    this.customersSrvc.deleteDirector(directorId).subscribe(data => {
      if (data) {
        this.model.director.data = data.directors;
      }
    });
  }

  // Update Director Information
  updateDirector(directorId) {
    alert("I want to delete a director.");
  }

  // Open Form
  toggleForm() {
    //this.openForm = !this.openForm;
    if (this.openForm == true) {
      this.openForm = false;
    } else {
      this.openForm = true;
    }
  }

}
