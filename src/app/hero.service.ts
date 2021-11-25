import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';  // 匯入 RxJS 函式庫 以便使用 HeetClient

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // 在 HTTP 課程中，你將會呼叫 HttpClient.get<Hero[]>() 它也同樣返回一個 Observable<Hero[]>，它也會發出單個值，這個值就是來自 HTTP 回應內文中的英雄陣列。
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    return heroes;
  }
  constructor() { }
}
