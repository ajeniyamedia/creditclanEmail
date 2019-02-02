import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {
  loadingRouteConfig = false;
  constructor(private dataService: DataService) {
    this.dataService.loadingRoute.subscribe(res => { 
      this.loadingRouteConfig = res.loadingRouteConfig;
    });
    
  }

  ngOnInit() {
  }

}
