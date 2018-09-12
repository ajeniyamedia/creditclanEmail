import { Component, OnInit } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { DataService } from '../app/_services/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  loadingRouteConfig: boolean;
  title = 'app';

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        console.log(1)
        this.dataService.loadingRoute.emit({ loadingRouteConfig: true });
      } else if (event instanceof RouteConfigLoadEnd) {
        this.dataService.loadingRoute.emit({ loadingRouteConfig: false });
        console.log(2)
      }
    });
  }
}
