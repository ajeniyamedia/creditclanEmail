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
  loading= false;
  timeline: any;
  subb: any;
  adding_notes = false;
  editorConfig = {
    editable: true,
    spellcheck: false,
    height: '350px',
    minHeight: '350px',
    placeholder: 'Enter your text here',
    translate: 'no',
    width: "100%",
    minWidth: "100%"
  };
  notes = {
    CONTENT: ''
  };
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
  saveNotes(value, valid) {
    this.loading = true;
    this.loansService.saveNotes(this.currentUser.token, this.request_id, this.notes)
    .subscribe(result => {
      this.loading = false;
      if (result.status == true) {
        this.adding_notes = false;
        this.getRequestTimeline();
      }
    });
  }
}
