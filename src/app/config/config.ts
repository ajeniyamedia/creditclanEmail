import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class Config {
  public _config: Object
  public _env: Object
  constructor(public http: Http) {
  }
  load() {
    // json files will be loaded here
  }
  getEnv(key: any) {
    return this._env[key];
  }
  get(key: any) {
    return this._config[key];
  }

};
