import { Component, OnInit } from '@angular/core';
import { MessageService } from './../message.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // 這裏的 messageService 屬性必須是公共屬性，因為你將會在範本中繫結到它。(Angular 只會繫結到元件的公共屬性。)
  constructor(public messageService:MessageService) { }

  ngOnInit(): void {
  }

}
