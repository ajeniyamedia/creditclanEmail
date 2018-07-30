import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LevelModel } from '../../_models/level.model';

@Component({
  selector: 'app-newlevelform',
  templateUrl: './newlevelform.component.html',
  styleUrls: ['./newlevelform.component.css']
})
export class NewlevelformComponent implements OnInit {

  @Input('loading') loading = false;
  @Input('APPROVAL_LEVEL_ID_') APPROVAL_LEVEL_ID_: string;
  @Input('level') level: LevelModel;
  @Input('isedit') isedit: boolean;
  @Output() saveLevel = new EventEmitter();
  @Output() checkEmployee = new EventEmitter();
  @Input('employees') employees: any;
  formLevel: LevelModel;
  constructor() { }

  ngOnInit() {
    this.isedit = !!this.level;
    this._setFormLevel();
  }
  _setFormLevel() {
    this.formLevel = new LevelModel("");
  }
  onSubmit() {
    this.saveLevel.emit({ level: this.formLevel, isedit: this.isedit, APPROVAL_LEVEL_ID_: this.APPROVAL_LEVEL_ID_, employees: this.employees })
  }
  checkSector(sector, event, index) {

    // if (event === false) {
    //   this.employees[index].CHECKED_ = event;
    // } else {
    //   this.employees[index].CHECKED_ = event;
    // }
    this.checkEmployee.emit({ sector: sector, event: event, index: index })
  }
  checkILO(event) {
    this.formLevel.ILO = '0';
    if (event === true) {
      this.formLevel.ILO = '1';
    }
  }
  checkSNE(event) {
    this.formLevel.SNE = '0';
    if (event === true) {
      this.formLevel.SNE = '1';
    }
  }
  checkISTD(event) {
    this.formLevel.ISTD = '0';
    if (event === true) {
      this.formLevel.ISTD = '1';
    }
  }
  isAvailable(PEOPLE_PEOPLE_ID, index) {
    if (!this.isedit) { } else {
      if (this.level.EXECUTOR_ID.indexOf(PEOPLE_PEOPLE_ID) !== -1) {
        this.employees[index].CHECKED_ = true;
        return true;
      } else {
        return false;
      }
    }

  }

}
