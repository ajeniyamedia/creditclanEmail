import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoleModel } from '../../_models/role.model';

@Component({
  selector: 'app-newrole',
  templateUrl: './newrole.component.html',
  styleUrls: ['./newrole.component.css']
})
export class NewroleComponent implements OnInit {

  @Input('loading') loading=false;
  @Input('role_id') role_id: string;
  @Input('role') role: RoleModel;
  @Input('isedit') isedit: boolean;
  @Output() saveRole = new EventEmitter();
  formRole: RoleModel;
  constructor() { }

  ngOnInit() {
    this.isedit = !!this.role;
    this._setFormRole();
  } 
  _setFormRole(){
    if (!this.isedit) {
      // If creating a new role,
      // create new rolemodel with default data
      this.formRole = new RoleModel("",false,false);
    } else {
      // If editing an existing role,
      // create new rolemodel from existing data
      this.formRole = new RoleModel(
        this.role.DESCRIPTION, 
        this.role.IS_CUSTOMER,
        this.role.IS_CREDIT, 
        this.role.PEOPLE_PEOPLE_ROLE_ID
      );
    }
  }
  onSubmit() { 
    this.saveRole.emit({role:this.formRole,isedit:this.isedit,role_id:this.role_id})
  }
}
