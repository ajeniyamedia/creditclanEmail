import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decision',
  templateUrl: './decision.component.html',
  styleUrls: ['./decision.component.css']
})
export class DecisionComponent implements OnInit {
  decision = {
    "DECISION_TYPE":"1"
  };
  constructor() { }

  ngOnInit() {
  }

}
