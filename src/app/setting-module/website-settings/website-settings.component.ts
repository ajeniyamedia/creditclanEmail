import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmailService } from '../email.service';


@Component({
  selector: 'app-website-settings',
  templateUrl: './website-settings.component.html',
  styleUrls: ['./website-settings.component.css']
})
export class WebsiteSettingsComponent implements OnInit {
  loader: boolean;
  isDisabled: boolean;
  data: any;

  constructor(
    public toastr: ToastrService,
    public services: EmailService) {

    }

  ngOnInit() {
    this.services.getWebsiteContent('','').subscribe((data) => {
      console.log(data);
      this.data = data;
    });
  }

  onSubmitLogo(form: NgForm) {
    this.loader = true;
    if (form.valid) {
      console.log(form.value);
      this.services.postLogo('','','').subscribe(() => {
        this.loader = false;
        this.toastr.success('Success', 'Success!');
      });
    }
  }

  onSubmitBgImage(form: NgForm) {
    this.loader = true;
    if (form.valid) {
      console.log(form.value);
      this.services.postBgImage('','','').subscribe(() => {
        this.loader = false;
        this.toastr.success('Success', 'Success!');
      });
    }
  }

  onSubmitCallToAction(form: NgForm) {
    this.loader = true;
    if (form.valid) {
      console.log(form.value);
      this.services.postCallToAction('','','').subscribe(() => {
        this.loader = false;
        this.toastr.success('Success', 'Success!');
      });
    }
  }

  onSubmitCodeSection(form: NgForm) {
    this.loader = true;
    if (form.valid) {
      console.log(form.value);
      this.services.postCodeSection('','','').subscribe(() => {
        this.loader = false;
        this.toastr.success('Success', 'Success!');
      });
    }
  }

  onSubmitContactSection(form: NgForm) {
    this.loader = true;
    if (form.valid) {
      console.log(form.value);
      this.services.postContactSection('','','').subscribe(() => {
        this.loader = false;
        this.toastr.success('Success', 'Success!');
      });
    }
  }

}
