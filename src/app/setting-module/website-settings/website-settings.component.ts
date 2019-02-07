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
  selectedLogo = true;
  data: any;
  vendor_id: any;
  token: string;
  selectedFile: File;
  selectedFooterImg: File;
  logo: any;
  selectBgImg: any;
  footerImg: any;
  selectedBgImg: File;
  bgImg: any;
  footerBgImg: any;
  selectedFtImg = true;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(
    public toastr: ToastrService,
    public services: EmailService) {

    }

  ngOnInit() {
    const vendorIdData = localStorage.getItem('platform');
    const userdata = JSON.parse(vendorIdData);
    this.vendor_id = userdata.PEOPLE_ID;
    console.log(this.vendor_id);
    this.token = localStorage.getItem('token');

    this.services.getWebsiteContent(this.vendor_id).subscribe((data) => {
      this.data = data;
      console.log(this.data);
      this.logo = data[0].website_logo;
      this.bgImg = data[0].website_bk_img;
      this.footerBgImg = data[0].website_footer_bg_img;
    });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.selectedLogo = false;
    console.log(this.selectedFile);
  }

  onBgImgUpload(event) {
    this.selectedBgImg = event.target.files[0];
    this.selectBgImg = false;
    console.log(this.selectedBgImg);
  }

  onFooterImgUpload(event) {
    this.selectedFooterImg = event.target.files[0];
    this.selectedFtImg = false;
    console.log(this.selectedFooterImg);
  }

  onSubmitLogo() {
    this.loader = true;
      const uploadData = new FormData();
      uploadData.append('img', this.selectedFile, this.selectedFile.name);
      uploadData.append('token', this.token);
      uploadData.append('company_id', this.vendor_id);

      this.services.postLogo(uploadData).subscribe((data) => {
        this.selectedLogo = true;
        this.logo = data.logo;
        this.loader = false;
        this.toastr.success('Success', 'Success!');
      });
  }


  onSubmitToAction(form: NgForm) {
    this.loader = true;
    if (form.valid) {
      this.services.postCallToAction(this.token, this.vendor_id, form.value.callToAction).subscribe(() => {
        this.loader = false;
        this.toastr.success('Success', 'Success!');
      });
    }
  }

  onSubmitCodeSection(form: NgForm) {
    this.loader = true;
    if (form.valid) {
      this.services.postCodeSection(this.token, this.vendor_id, form.value).subscribe(() => {
        this.loader = false;
        this.toastr.success('Success', 'Success!');
      });
    }
  }

  onSubmitContactSection(form: NgForm) {
    console.log(form.value);
    this.loader = true;
      const uploadFooter = new FormData();
        uploadFooter.append('img', this.selectedFooterImg, this.selectedFooterImg.name);
        uploadFooter.append('company_id', this.vendor_id);
        uploadFooter.append('companyDescription', form.value.companyDescription);
        uploadFooter.append('address', form.value.address);
        uploadFooter.append('email', form.value.email);
        uploadFooter.append('phone', form.value.phone);

      this.services.postContactSection(uploadFooter).subscribe((data) => {
        console.log(data);
        this.footerBgImg = data.website_bk_img;
        this.selectedFtImg = true;
        this.loader = false;
        this.toastr.success('Success', 'Success!');
      });
  }

  onSubmitBgImage(form: NgForm) {
    this.loader = true;
      const uploadBgImage = new FormData();
        uploadBgImage.append('img', this.selectedBgImg, this.selectedBgImg.name);
        uploadBgImage.append('company_id', this.vendor_id);

      this.services.postBgImage(uploadBgImage).subscribe(( response ) => {
        this.bgImg = response.website_bk_img;

        console.log(response);
        this.loader = false;
        this.toastr.success('Success', 'Success!');
      });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }

  imageLoaded() {
      // show cropper
  }
  
  loadImageFailed() {
      // show message
  }

}
