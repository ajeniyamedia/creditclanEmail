import { LoggingService } from './logging.service';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChatService {

  private postsUrl = 'http://137.117.105.90/dataupload_test/api/v2/chats/';
  private replyUrl = 'http://137.117.105.90/dataupload_test/api/v2/chats/reply';
  constructor(private http: Http, private loggingService: LoggingService) {

  }
  public getChats(token: any, search_text: any, chat_type: any, lender_selected: any): Observable<any> {
    return this.http.post(this.postsUrl, JSON.stringify({ token: token, search_text: search_text, chat_type: chat_type, lender_selected: lender_selected }))
      .map(res => res.json())
      .catch(this.loggingService.handleError);
  }
  public getLoanChats(token: any, request_id: any): Observable<any> {
    return this.http.post(this.postsUrl+'loan', JSON.stringify({ token: token, request_id: request_id }))
      .map(res => res.json())
      .catch(this.loggingService.handleError);
  }
  public sendReply(token: any, current_channel: any, reply: any, loan:any): Observable<any> {
    return this.http.post(this.replyUrl, JSON.stringify({ token: token, current_channel: current_channel, reply: reply, loan:loan }))
      .map(res => res.json())
      .catch(this.loggingService.handleError);
  }
  public sendReplyToSingle(token: any, current_channel: any, reply: any, loan:any): Observable<any> {
    return this.http.post(this.replyUrl, JSON.stringify({ token: token, current_channel: current_channel, reply: reply, loan:loan }))
      .map(res => res.json())
      .catch(this.loggingService.handleError);
  }
}
