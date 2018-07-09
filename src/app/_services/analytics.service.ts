import { LoggingService } from '../_services/logging.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AnalyticsService {

  private postsUrl = 'https://dataupload.creditclan.com/api/v2/operations/';
  constructor(private http: HttpClient, private loggingService: LoggingService) {

  }
  public runEmployeePerformance(token: any, emp_perf:any): Observable<any> {
    return this.http.post(this.postsUrl+'runEmployeePerformance', JSON.stringify({ token: token, emp_perf:emp_perf }));
  }
  public runPlatformAnalysis(token: any, data:any): Observable<any> {
    return this.http.post(this.postsUrl+'runPlatformAnalysis', JSON.stringify({ token: token, data:data }));
  }
  public runPiePerformance(token: any, data:any): Observable<any> {
    return this.http.post(this.postsUrl+'runPiePerformance', JSON.stringify({ token: token, data:data }));
  }
  runPPSPerformance(token: any, data:any): Observable<any> {
    return this.http.post(this.postsUrl+'runPPSPerformance', JSON.stringify({ token: token, data:data }));
  }
}
