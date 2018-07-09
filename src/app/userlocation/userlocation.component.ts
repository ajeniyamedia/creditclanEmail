import {GoogleMapsAPIWrapper} from '@agm/core';
import {MapsAPILoader} from '@agm/core';
import {AfterViewInit,
        Component,
        Input,
        NgZone,
        OnInit,ViewContainerRef, Output, EventEmitter} from '@angular/core';
        import { ToastrService } from 'ngx-toastr';
declare var google: any;

@Component({
  selector: 'app-userlocation',
  templateUrl: './userlocation.component.html',
  styleUrls: ['./userlocation.component.css']
})

export class UserlocationComponent implements OnInit, AfterViewInit {
  latlngBounds;

  title: string = 'User Location';
  @Input('latitude')
  lat: number = 51.678418;
  @Input('longitude')
  lng: number = 7.809007;
  @Input('latitude_')
  lat_: number = 51.678418;
  @Input('longitude_')
  lng_: number = 7.809007;
  @Input('loan')
  loan: any; 
  @Output() updateRequestAddress = new EventEmitter();
  markers: marker[] = []
  constructor(public toastr: ToastrService,private __loader: MapsAPILoader, private __zone: NgZone) {
  
  }
  reverseAddress(lat:any,lng:any){
    try {
       
      this.__loader.load().then(() => {
        var latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({'location': latlng}, (results, status) => {
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
  findadd(address: string, label: string, iconUrl:string) {
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
              iconUrl:iconUrl
            })
          } else {
            this.showError(address+'\n could not be mapped');
            if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
              console.log(results) 
            } else {
              console.log(results) 
            }
          }
        });
      });
    } catch (error) {
    }
  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }
  public ngAfterViewInit() {
    
  }
  fitBounds(){
    this.__loader.load().then(() => {
      this.latlngBounds = new google.maps.LatLngBounds();
      this.markers.forEach((location) => {
          this.latlngBounds.extend(new google.maps.LatLng(location.lat, location.lng))
      })
  });
  }
  ngOnInit() {
    this.markers = [{lat: this.lat,lng: this.lng,draggable: false,iconUrl:'assets/img/mapmoney.png'}]
    this.reverseAddress(this.lat,this.lng);
    this.findadd(this.loan.HOME_ADDRESS,'B',"assets/img/maphome.png");
    this.findadd(this.loan.WORK_ADDRESS,'C',"assets/img/mapoffice.png");
    //this.fitBounds();
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