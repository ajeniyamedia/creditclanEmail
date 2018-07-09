import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoleModel } from '../_models/role.model';
@Component({
  selector: 'app-newempform',
  templateUrl: './newempform.component.html',
  styleUrls: ['./newempform.component.css']
})
export class NewempformComponent implements OnInit {

  @Input('loading') loading = false;
  @Input('employee') employee = { "PEOPLE_PEOPLE_ID": "", "LEGAL_NAME": "", "EMAIL": "","ROLES":"" };
  @Input('isedit') isedit = false;
  @Input('roles') roles: RoleModel[];
  @Output() saveTheEmployee = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  saveEmployee() {
    this.saveTheEmployee.emit()
  }
  checkSector(sector, event, index) {
    this.roles[index]["CHECKED"] = event;

  }
  IsAvailable(PEOPLE_PEOPLE_ROLE_ID){
    if(this.isedit==true){
      if(this.employee.ROLES.indexOf(PEOPLE_PEOPLE_ROLE_ID)!=-1){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
    
  }
}

