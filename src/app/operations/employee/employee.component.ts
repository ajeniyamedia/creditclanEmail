import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RoleModel } from '../../_models/role.model';
import { UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public currentUser: any;
  public loading = false;
  public employees: any;
  public showForm = false;
  complexForm: FormGroup;
  overlayOpen = false;
  account_details: any;
  ledger: any;
  transactions: any;
  isedit = false;
  start = 0;
  employee = { "PEOPLE_PEOPLE_ID": "", "LEGAL_NAME": "", "EMAIL": "", 'SEND_WELCOME_EMAIL': true };
  search = "";
  roles: RoleModel[];
  deleting = false;

  constructor(public toastr: ToastrService, vcr: ViewContainerRef, public fb: FormBuilder, public operationsService: OperationsService,
    public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }

  closeOverlay() {
    this.overlayOpen = false
  }
  update(employee) {
    this.employee = employee;
    this.overlayOpen = true;
    this.isedit = true;
  }
  delete(employee){
    this.deleting = true;
    this.operationsService.deleteEmployee(this.currentUser.token, employee)
      .subscribe(status => {
        this.deleting = false;

        if (status.status) {
          this.showSuccess(status.message) ;
          this.getEmployees();
        } else {
          this.showError(status.message);
        }
      });
  }
  saveEmployee() {
    // this.loading = true;
    // this.operationsService.saveEmployee(this.currentUser.token, this.employee, this.employee, this.isedit, this.roles)
    //   .subscribe(status => {
    //     this.loading = false;

    //     if (status.status) {
    //       this.showSuccess(status.message)
    //       this.showForm = false;
    //       this.overlayOpen = false;
    //       this.getEmployees()
    //     } else {
    //       this.showError(status.message)
    //     }
    //   });
    this.showForm = false;
    this.overlayOpen = false;
    this.employee.PEOPLE_PEOPLE_ID = '';
    this.employee.EMAIL = '';
    this.employee.LEGAL_NAME = '';
    this.isedit = false;
    this.getEmployees();

  }
  cancelOperation() {
    this.loading = false;
    this.overlayOpen = false;
    this.isedit = false;
  }

  addNewEmployee() {
    this.showForm = true;
    this.overlayOpen = true;
    this.employee.EMAIL = "";
    this.employee.LEGAL_NAME = "";
    this.employee.PEOPLE_PEOPLE_ID = "";
    this.isedit = false;
  }
  ngOnInit() {
    this.getEmployees();
    this.getRoles();
  }
  getRoles() {
    this.operationsService.getRoles(this.currentUser.token)
      .subscribe(employees => {
        this.roles = employees.roles;
      });
  }
  getEmployees() {
    this.operationsService.getEmployees_(this.currentUser.token, this.start, this.search)
      .subscribe(employees => {
        this.employees = employees.employees;
        this.start = employees.start;
        this.loading = false;
      });
  }
  closeModal() {
    //this.showForm = false;
    this.isedit = false; 
    this.overlayOpen=false;
  }


}
