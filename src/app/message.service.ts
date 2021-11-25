import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // 定義及實作給外部用的 屬性和方法
  messages: string[] = [];
  add(message:string) {
    this.messages.push(message);
  }
  clear() {
    this.messages=[];
  }

  constructor() { }
}
