import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms'; 
import { UserService, OperationsService, AuthenticationService, StorageService,DataService } from '../../_services/index';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RoleModel } from '../../_models/role.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public company_id:any;
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
  sub:any;
  constructor(public DataService:DataService,public route: ActivatedRoute,public router: Router,
    public toastr: ToastrService, vcr: ViewContainerRef,public fb: FormBuilder, 
    public operationsService: OperationsService, public storageService: StorageService) {
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
    this.addingUser = true;
    this.isedit = true;
  }
  saveEmployee() { 
    this.loading = true; 
    this.operationsService.saveEmployeeCompany(this.currentUser.token, this.employee, this.company_id, this.isedit)
      .subscribe(status => {
        this.loading = false;

        if (status.status) {
          this.showSuccess(status.message)
          this.showForm = false;
          this.overlayOpen = false;
          this.getCompanyEmployees()
        } else {
          this.showError(status.message)
        }
        this.employee.EMAIL='';
        this.employee.LEGAL_NAME='';
        this.employee.PEOPLE_PEOPLE_ID='';
        this.addingUser=false;
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
    this.getCompanyEmployees();
    this.getRoles();
  }
  getRoles() {
    this.operationsService.getRoles(this.currentUser.token)
      .subscribe(employees => {
        this.roles = employees.roles; 
      });
  }
  getCompanyEmployees() {
    this.sub = this.route.parent.params.subscribe(params => {
      this.company_id = params["id"];
      this.operationsService.getCompanyEmployees(this.currentUser.token, this.start, this.search, params["id"])
      .subscribe(employees => { 
        this.employees = employees.employees;
        this.start = employees.start;
        this.loading = false;
        this.DataService.onProfileNav.emit({ 'location': 'home_corporate', 'data': employees });
      });
      
    });
    
  }
  closeModal() {
    this.showForm = false;
  }
  
  addNewCustomerEmployee(){
    // this.DataService.addNewCustomerEmployee.emit({ 'roles': this.roles, 'employee': this.employee, 'is_edit':this.isedit, 'loading':this.loading });

  }
  addingUser = false;
  
}
