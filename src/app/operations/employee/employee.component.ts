import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms'; 
import { UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RoleModel } from '../../_models/role.model';
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
  employee = { "PEOPLE_PEOPLE_ID": "", "LEGAL_NAME": "", "EMAIL": "" };
  search = "";
  roles: RoleModel[];
  constructor(public toastr: ToastrService, vcr: ViewContainerRef,public fb: FormBuilder, public operationsService: OperationsService, 
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
  saveEmployee() { 
    this.loading = true; 
    this.operationsService.saveEmployee(this.currentUser.token, this.employee, this.employee, this.isedit,this.roles)
      .subscribe(status => {
        this.loading = false;

        if (status.status) {
          this.showSuccess(status.message)
          this.showForm = false;
          this.overlayOpen = false;
          this.getEmployees()
        } else {
          this.showError(status.message)
        }
      });
  }
  cancelOperation() {
    this.loading = false;
    this.overlayOpen = false
  }

  addNewEmployee() {
    this.showForm = true;
    this.overlayOpen = true;
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
    this.showForm = false;
  }
  

}
