import { GoogleMapsAPIWrapper } from '@agm/core';
import { MapsAPILoader } from '@agm/core';
import {
  AfterViewInit,
  Component,
  Input,
  NgZone,
  OnInit, ViewContainerRef, Output, EventEmitter
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare var google: any;
import { DataService } from '../_services/index';

@Component({
  selector: 'app-userlocation',
  templateUrl: './userlocation.component.html',
  styleUrls: ['./userlocation.component.css']
})

export class UserlocationComponent implements OnInit, AfterViewInit {
  latlngBounds;

  title: string = 'User Location';
  @Input('where') where = '1';
  @Input('latitude')
  lat: number = 6.6039051;
  @Input('longitude')
  lng: number = 3.3415067;
  @Input('latitude_')
  lat_: number = 6.6039051;
  @Input('longitude_')
  lng_: number = 3.3415067;
  @Input('address') address = '';
  @Input('loan')
  loan: any;
  @Output() updateRequestAddress = new EventEmitter();
  markers: marker[] = []
  constructor(public toastr: ToastrService, private __loader: MapsAPILoader, private __zone: NgZone, public dataService: DataService) {

  }
  reverseAddress(lat: any, lng: any) {
    try {

      this.__loader.load().then(() => {
        var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'location': latlng }, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {

              this.markers[0].address = results[0].formatted_address;
              this.updateRequestAddress.emit(results[0].formatted_address);
            } else {

            }
          } else {

          }
        });
      });
    } catch (error) {
    }
  }
  findadd(address: string, label: string, iconUrl: string) {
    try {

      this.__loader.load().then(() => {
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {

            const place = results[0].geometry.location;
            this.markers.push({
              lat: place.lat(),
              lng: place.lng(),
              draggable: false,
              address: address,
              iconUrl: iconUrl
            })
            if (this.where != '1') {
              this.recenter(place.lat(), place.lng())
              this.fitBounds()
            }
            this.dataService.geotagCustomerAddress.emit({label:label, lat: place.lat(), lng: place.lng()});
          } else {
            this.showError(address + '\n could not be mapped');
            if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
            } else {
            }
          }
        });
      });
    } catch (error) {
    }
  }
  recenter(lat, lng) {
    this.lat = 0;
    this.lng = 0;
    this.lat = lat;
    this.lng = lng;
  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }
  public ngAfterViewInit() {

  }
  fitBounds() {
    this.__loader.load().then(() => {
      console.log(1)
      this.latlngBounds = new google.maps.LatLngBounds();
      this.markers.forEach((location) => {

        this.latlngBounds.extend(new google.maps.LatLng(location.lat, location.lng))
      })
      console.log(this.latlngBounds)
    });

  }
  ngOnInit() {

    if (this.where == '1') {
      this.markers = [{ lat: this.lat, lng: this.lng, draggable: false, iconUrl: 'assets/img/mapmoney.png' }]
      this.reverseAddress(this.lat, this.lng);
      this.findadd(this.loan.HOME_ADDRESS, 'B', "assets/img/maphome.png");
      this.findadd(this.loan.WORK_ADDRESS, 'C', "assets/img/mapoffice.png");
    } else {
      this.findadd(this.address, 'D', "assets/img/maphome.png");

    }

  }
}
// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  address?: string;
  iconUrl?: string;
}