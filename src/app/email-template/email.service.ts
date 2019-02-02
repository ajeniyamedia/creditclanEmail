import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class EmailService extends DataService {

  constructor( http: Http) {
    super('https://emailmodule.creditclan.com/index.php/Mailservices/', http);
  }
}
