import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoleModel } from '../_models/role.model';
import { UserService, OperationsService, AuthenticationService, StorageService } from '../_services/index';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-newempform',
  templateUrl: './newempform.component.html',
  styleUrls: ['./newempform.component.css']
})
export class NewempformComponent implements OnInit {

  @Input('loading') loading = false;
  @Input('employee') employee = { "PEOPLE_PEOPLE_ID": "", "LEGAL_NAME": "", "EMAIL": "", "ROLES": "" };
  @Input('isedit') isedit = false;
  @Input('roles') roles: RoleModel[];
  @Output() saveTheEmployee = new EventEmitter();
  public currentUser: any;
  constructor(public toastr: ToastrService, public operationsService: OperationsService,
    public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
  }

  ngOnInit() {
    console.log(this.isedit)
    if (!this.isedit) {
      this.employee.EMAIL = "";
      this.employee.LEGAL_NAME = '';
      this.employee.PEOPLE_PEOPLE_ID = '';
    }
    console.log(this.roles)
  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }
  saveEmployee() {
    // this.saveTheEmployee.emit()
    this.loading = true;
    this.operationsService.saveEmployee(this.currentUser.token, this.employee, this.employee, this.isedit, this.roles)
      .subscribe(status => {
        this.loading = false;

        if (status.status) {
          this.showSuccess(status.message);
          this.employee = status.employee;
        } else {
          this.showError(status.message);
        }
        this.saveTheEmployee.emit();
      });
  }

  checkSector(sector, event, index) {
    if (event == false) {
      this.roles[index].CHECKED_ = event;
    } else {
      this.roles[index].CHECKED_ = event;
    }

  }
  IsAvailable(PEOPLE_PEOPLE_ROLE_ID, index) {
    if (this.isedit == true) {
      if (this.employee.ROLES.indexOf(PEOPLE_PEOPLE_ROLE_ID) != -1) {
        this.roles[index]["CHECKED"] = true;
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }

  }
}

