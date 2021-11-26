import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from './../hero';
import { HeroService } from './../hero.service';


@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  constructor(private heroService: HeroService) { }

  // 注意，heroes$ 宣告為一個 Observable
  heroes$!: Observable<Hero[]>;
  //Subject 既是可觀察物件的資料來源，本身也是 Observable。 你可以像訂閱任何 Observable 一樣訂閱 Subject。
  //你還可以透過呼叫它的 next(value) 方法往 Observable 中推送一些值，就像 search() 方法中一樣。
  private searchTerms = new Subject<string>();

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // 在傳出最終字串之前，debounceTime(300) 將會等待，直到新增字串的事件暫停了 300 毫秒。 你實際發起請求的間隔永遠不會小於 300ms。
      debounceTime(300),
      // distinctUntilChanged() 會確保只在過濾條件變化時才傳送請求。
      distinctUntilChanged(),
      // switchMap() 會為每個從 debounce() 和 distinctUntilChanged() 中透過的搜尋詞調用搜索服務。 它會取消並丟棄以前的搜尋可觀察物件，只保留最近的。
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}
