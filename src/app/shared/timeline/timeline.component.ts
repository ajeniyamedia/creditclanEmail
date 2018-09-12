import { Component, OnInit, Input } from '@angular/core';
import { StorageService, LoansService } from '../../_services/index';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  @Input('request_id') request_id: any;
  currentUser: any;
  loading: false;
  timeline: any;
  subb: any;
  constructor(private storageService: StorageService,
    private loansService: LoansService,
    public router: Router,
    public route: ActivatedRoute, ) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.request_id = route.snapshot.parent.params['id'];
  }

  ngOnInit() {
    this.getRequestTimeline();
  }
  getRequestTimeline() {
    this.loansService.getRequestTimeline(this.currentUser.token, this.request_id)
      .subscribe(result => {
        if (result.status == true) {
          this.timeline = result.data;
        }
      });
  }
}
