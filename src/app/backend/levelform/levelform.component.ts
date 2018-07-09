import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { LevelModel } from '../../_models/level.model';

@Component({
  selector: 'app-levelform',
  templateUrl: './levelform.component.html',
  styleUrls: ['./levelform.component.css']
})
export class LevelformComponent implements OnInit {

  @Input('loading') loading=false;
  @Input('APPROVAL_LEVEL_ID_') APPROVAL_LEVEL_ID_: string;
  @Input('level') level: LevelModel;
  @Input('isedit') isedit: boolean;
  @Output() saveLevel = new EventEmitter();
  @Input('employees') employees: any;
  formLevel: LevelModel;
  constructor() { }

  ngOnInit() {
    this.isedit = !!this.level;
    this._setFormLevel();
  } 
  _setFormLevel(){
    if (!this.isedit) {
      // If creating a new role,
      // create new rolemodel with default data
      this.formLevel = new LevelModel("");
    } else {
      // If editing an existing role,
      // create new rolemodel from existing data
      this.formLevel = new LevelModel(

        this.level.LEVEL_NAME,
        this.level.APPROVAL_LEVEL_DESCRIPTION,
        this.level.APPROVAL_LEVEL_ID_,
        this.level.LEVEL_ID,
        this.level.ILO,
        this.level.ISTD,
        this.level.EXECUTOR_ID,
        this.level.SNE
      );
    }
  }
  onSubmit() { 
    this.saveLevel.emit({level:this.formLevel,isedit:this.isedit,APPROVAL_LEVEL_ID_:this.APPROVAL_LEVEL_ID_,employees:this.employees})
  }
  checkSector(sector, event, index) {
    this.employees[index]["CHECKED"] = event;

  }
  checkILO(event){
    this.formLevel.ILO = '0';
    if(event===true){
      this.formLevel.ILO = '1';
    }
  }
  checkSNE(event){
    this.formLevel.SNE = '0';
    if(event===true){
      this.formLevel.SNE = '1';
    }
  }
  checkISTD(event){
    this.formLevel.ISTD = '0';
    if(event===true){
      this.formLevel.ISTD = '1';
    }
  }
  isAvailable(PEOPLE_PEOPLE_ID){
    if (!this.isedit) {}else{
      if(this.level.EXECUTOR_ID.indexOf(PEOPLE_PEOPLE_ID)!=-1){
        return true;
      }else{
        return false;
      }
    }  
    
  }
}
