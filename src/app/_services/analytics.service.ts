import { LoggingService } from '../_services/logging.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AnalyticsService {

  private postsUrl = 'https://dataupload.creditclan.com/api/v2/';
  private analyticsUrl = 'https://loans.creditclan.com/';
  constructor(private http: HttpClient, private loggingService: LoggingService) {

  }
  public runEmployeePerformance(token: any, emp_perf:any): Observable<any> {
    return this.http.post(this.postsUrl+'operations/runEmployeePerformance', JSON.stringify({ token: token, emp_perf:emp_perf }));
  }
  public getPendingApprovals(token: any): Observable<any> {
    return this.http.post(this.analyticsUrl+'pendingapprovals', JSON.stringify({ token: token}));
  }
  public runPlatformSummary(token: any): Observable<any> {
    return this.http.post(this.analyticsUrl+'loan/summary', JSON.stringify({ token: token}));
  }
  public runPlatformAnalysis(token: any, data:any): Observable<any> {
    return this.http.post(this.analyticsUrl+'loan/loanperformance', JSON.stringify({ token: token, data:data }));
  }
  public runPiePerformance(token: any, data:any): Observable<any> {
    return this.http.post(this.analyticsUrl+'loan/distribution', JSON.stringify({ token: token, data:data }));
  }
  runPPSPerformance(token: any, data:any): Observable<any> {
    return this.http.post(this.postsUrl+'operations/runPPSPerformance', JSON.stringify({ token: token, data:data }));
  }
  startAnalysis(token: any, data:any, settings:any, total:any): Observable<any> {
    return this.http.post(this.postsUrl+'analytics/startAnalysis', JSON.stringify({ token: token, magic_filter:data, settings:settings, total:total }));
  }
  runAnalysisForAdjustedSettings(token: any, loan:any, settings:any): Observable<any> {
    return this.http.post(this.postsUrl+'analytics/runAnalysisForAdjustedSettings', JSON.stringify({ token: token, loan:loan, settings:settings }));
  }
}
