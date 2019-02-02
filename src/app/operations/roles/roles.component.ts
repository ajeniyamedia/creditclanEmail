import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RoleModel } from '../../_models/role.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

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
  employee = { 'PEOPLE_PEOPLE_ID': '', 'LEGAL_NAME': '', 'EMAIL': '' };
  search = '';
  state: any;
  roles: RoleModel[];
  role: RoleModel;
  role_id: any;
  rolerights: any;
  currentSection = '0';
  currentRoleRights: any;
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
    this.overlayOpen = false;
    this.isedit = false; 
  }
  update(employee) {
    this.isedit = true;
    this.role = employee;
    this.role_id = employee.PEOPLE_PEOPLE_ROLE_ID;
    this.currentRoleRights = employee.RIGHTS;
    this.overlayOpen = true;

  }
  delete(role){
    this.loading = true;
    this.operationsService.deleteRole(role, this.currentUser.token)
      .subscribe(status => {
        this.loading = false;
        this.showForm = false;
        this.overlayOpen = false;
        if (status.status == true) {

          this.showSuccess(status.message)
          this.getRoles();
          this.getRoleRights();
        } else {
          this.showError(status.message)
        }
      });
  }
  saveRole(event) {
    this.loading = true;
    this.operationsService.saveRole(event.role, this.currentUser.token, this.isedit, this.role_id, event.chosenRights)
      .subscribe(status => {
        this.loading = false;
        this.showForm = false;
        this.overlayOpen = false;
        if (status.status == true) {

          this.showSuccess(status.message)
          this.getRoles();
          this.getRoleRights();
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
    this.getRoles();
    this.getRoleRights();
  }
  getRoles() {
    this.operationsService.getRoles(this.currentUser.token)
      .subscribe(employees => {
        this.roles = employees.roles;
        this.state = employees;
        this.loading = false;
      });
  }
  getRoleRights() {
    this.operationsService.getRoleRights(this.currentUser.token)
      .subscribe(employees => {
        this.rolerights = employees;
      });
  }
  closeModal() {
    this.showForm = false;
  }

}
