import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoleModel } from '../../_models/role.model';

@Component({
  selector: 'app-newrole',
  templateUrl: './newrole.component.html',
  styleUrls: ['./newrole.component.css']
})
export class NewroleComponent implements OnInit {

  @Input('loading') loading = false;
  @Input('role_id') role_id: string;
  @Input('role') role: RoleModel;
  @Input('isedit') isedit: boolean;
  @Input('rolerights') rolerights: any;
  @Output() saveRole = new EventEmitter();
  formRole: RoleModel;
  @Input('chosenRights') chosenRights = [];
  constructor() { }

  ngOnInit() {
    //this.isedit = !!this.role;
    this._setFormRole();
  }
  _setFormRole() { 
    if (!this.isedit) {
      // If creating a new role,
      // create new rolemodel with default data
      this.formRole = new RoleModel("", false, false);
      this.chosenRights = [];
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
    this.saveRole.emit({ role: this.formRole, isedit: this.isedit, role_id: this.role_id, chosenRights: this.chosenRights });
  }
  chooseRight(event, right) {
    if (event.target.checked === true) {
      if (this.chosenRights.indexOf(right.RIGHT_ID) === -1) {
        this.chosenRights.push(right.RIGHT_ID);
      }
    } else {
      this.chosenRights.splice(this.chosenRights.indexOf(right.RIGHT_ID), 1);
    }
  }
  isItAvailableInChosenRights(RIGHT_ID) {
    if (this.isedit === false) {
      return false;
    } else { 
      if (this.chosenRights.indexOf(RIGHT_ID) != -1) {
        return true;
      } else {
        return false;
      }
    }
  }
}
