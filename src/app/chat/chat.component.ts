import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AnonymousSubscription } from "rxjs/Subscription";
import { ChatService } from "../_services/chat.service";
import { OptionsserviceService, UserService, LoansService, AuthenticationService, StorageService } from '../_services/index';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private timerSubscription: AnonymousSubscription;
  private postsSubscription: AnonymousSubscription;
  public chats: any;
  public currentUser: any;
  public current_channel: any;
  current_chat_selected = false;
  posts: any;
  loan: any;
  search_text = "";
  public size = 0;
  chat_type = "2"
  lenders: any;
  lender_selected = "0"
  reply = "";
  loading=false;
  constructor(private chatService: ChatService, private storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
  }
  sendReply() {
    this.chatService.sendReply(this.currentUser.token, this.current_channel, this.reply, this.loan).subscribe(chats => {
      this.refreshData();
    });
  }
  searchChats() {
    this.refreshData();
  }
  ngOnInit() {
    this.refreshData();
  }
  changeType(event) { 
    this.chat_type = event;
    this.refreshData();
  }
  changeLender() {

    this.refreshData();
  }
  private refreshData(): void {
    
    this.postsSubscription = this.chatService.getChats(this.currentUser.token, this.search_text, this.chat_type, this.lender_selected).subscribe(chats => {
      
      if (chats.size == '0') {

      } else {
        this.chats = chats.channels;
        this.size = chats.size;
        if (!this.current_chat_selected) {
          this.current_channel = chats.channels[0]
          this.loan = chats.channels[0].loan;
          this.lenders = chats.channels[0].lenders;
          if (chats.size != '0') {
            this.posts = chats.channels[0].posts
          }
          this.subscribeToData();
        }
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
  public setCurrentSelectedChat(index) {
    this.current_channel = this.chats[index]
    this.current_chat_selected = true;
    this.loan = this.chats[index].loan;
    this.lenders = this.chats[index].lenders;
    this.posts = this.current_channel.posts
  }
}
