import { LoggingService } from './logging.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApprovalsService {

  private postsUrl = 'https://dataupload.creditclan.com/api/v2/operations/getApprovals';
  constructor(private http: HttpClient, private loggingService: LoggingService) {

  }
  public getApprovals(token: any): Observable<any> {
    return this.http.post(this.postsUrl, JSON.stringify({ token: token }));
  }
}
