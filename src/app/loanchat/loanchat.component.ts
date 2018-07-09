import { Component, OnInit,Input,Output,EventEmitter,ViewEncapsulation } from '@angular/core';
import { DataService, OptionsserviceService, LoansService, StorageService } from '../_services/index';
import { ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { AnonymousSubscription } from "rxjs/Subscription";
import { ChatService } from "../_services/chat.service";

@Component({
  selector: 'app-loanchat',
  templateUrl: './loanchat.component.html',
  styleUrls: ['./loanchat.component.css']
})
export class LoanchatComponent implements OnInit {
  @Input('request_id') request_id:any; 
  public loading = false;
  public analysis: any;
  public currentUser: any;
  @Input('sub') sub: any;
  chats:any;
  posts:any;
  reply = ""; 
  private timerSubscription: AnonymousSubscription;
  private postsSubscription: AnonymousSubscription;
  current_channel:any;
  loan:any;
  lenders:any;
  constructor(private chatService:ChatService,private DataService: DataService, public route: ActivatedRoute, 
    public storageService: StorageService, public optionsService: OptionsserviceService, public loansService: LoansService) {


  }
  ngOnInit() {
    this.loanAnalysis();
    this.refreshData();
  } 
  loanAnalysis() {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.sub = this.route.parent.params.subscribe(params => {
      this.request_id = +params["id"];
      this.loansService.getLoan(this.currentUser.token, this.request_id)
        .subscribe(analysis => {  
          this.analysis = analysis;
        });
    });
  } 
  sendReply() {
    this.chatService.sendReplyToSingle(this.currentUser.token, this.current_channel, this.reply,this.analysis).subscribe(chats => {
      this.refreshData();
    });
  }
 
  size=0;
  private refreshData(): void {
    
    this.postsSubscription = this.chatService.getLoanChats(this.currentUser.token, this.request_id).subscribe(chats => {
      
      if (chats.size == '0') {

      } else {
        this.chats = chats.channels;
        this.size = chats.size;
        if (chats.size != '0') {
          this.posts = chats.channels[0].posts
        }
        this.current_channel = chats.channels[0]
          this.loan = chats.channels[0].loan;
          this.lenders = chats.channels[0].lenders;
        this.subscribeToData();
      }


    });
  }
  public ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  private subscribeToData(): void {
    this.timerSubscription = Observable.timer(10000).first().subscribe(() => this.refreshData());
  }
 
}
