import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';  // 匯入 RxJS 函式庫 以便使用 HeetClient

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
// 在這個 Services 使用其他的 Services
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor( private messageService:MessageService ) { }  //建構函式，注入其他的 Service (一個典型的“服務中的服務”場景)

  // 在 HTTP 課程中，你將會呼叫 HttpClient.get<Hero[]>() 它也同樣返回一個 Observable<Hero[]>，它也會發出單個值，這個值就是來自 HTTP 回應內文中的英雄陣列。
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');  //建構函式有宣告，這裏使用
    return heroes;
  }
  // 第五節新增 getHero 給 hero-detail.component 呼叫,會傳入 id 在列表中尋找並傳回 hero 類別
  getHero(id : number) : Observable<Hero> {
    const hero = HEROES.find(h => h.id === id)!;
    // 樣板字面值:允許嵌入運算式的字串字面值,反引號 ( ` ) 用於定義 JavaScript 的 範本字串字面量，以便嵌入 id。
    // https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Template_literals
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
}
