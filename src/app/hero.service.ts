import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';  // 匯入 RxJS 函式庫 以便使用 HeetClient
import { HttpClient, HttpHeaders } from '@angular/common/http';  //使用 HttpClient
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
//import { HEROES } from './mock-heroes';
// 在這個 Services 使用其他的 Services
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // 把伺服器上英雄資料資源的訪問地址 heroesURL 定義為 :base/:collectionName 的形式。 這裡的 base 是要請求的資源，而 collectionName 是 in-memory-data-service.ts 中的英雄資料物件。
  // 注意：伺服器必須開啟 跨域資源共享 (CORS) 允許您的 Web 服務器接受和服務來自其他域的請求
  // private heroesUrl = 'api/heroes';
  // private myurl = "https://1a46-111-240-114-204.ngrok.io";  //windows
  private myurl = "https://2e77-2001-b011-3001-36e1-4f59-d720-4f2c-fa1e.ngrok.io";  // ubuntu
  private heroesUrl = this.myurl + '/app?kind=1&prx=DM&xg3=33';
  private locateheroesUrl = this.myurl +'/app?kind=1';
  private heroesUpdateUrl = this.myurl + '/app/1';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) };

  constructor(private http: HttpClient,   //使用 HttpClient
    private messageService: MessageService) { }  //建構函式，注入其他的 Service (一個典型的“服務中的服務”場景)

  public log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  // 在 HTTP 課程中，你將會呼叫 HttpClient.get<Hero[]>() 它也同樣返回一個 Observable<Hero[]>，它也會發出單個值，這個值就是來自 HTTP 回應內文中的英雄陣列。
  getHeroes(): Observable<Hero[]> {
    //const heroes = of(HEROES);
    //this.messageService.add('HeroService: fetched heroes');  //建構函式有宣告，這裏使用
    //return heroes;
    // 第六節改用 httpClient 取得資料
    // 其它 API 可能在返回物件中深埋著你想要的資料。 你可能要藉助 RxJS 的 map() 運算子對 Observable 的結果進行處理，以便把這些資料探勘出來。
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }
  // 在 HTTP 課程中，你將會呼叫 HttpClient.get<Hero[]>() 它也同樣返回一個 Observable<Hero[]>，它也會發出單個值，這個值就是來自 HTTP 回應內文中的英雄陣列。
  getHeroesUsedParam(name:string): Observable<Hero[]> {
    //const heroes = of(HEROES);
    //this.messageService.add('HeroService: fetched heroes');  //建構函式有宣告，這裏使用
    //return heroes;
    // 第六節改用 httpClient 取得資料
    // 其它 API 可能在返回物件中深埋著你想要的資料。 你可能要藉助 RxJS 的 map() 運算子對 Observable 的結果進行處理，以便把這些資料探勘出來。
    return this.http.get<Hero[]>(this.locateheroesUrl+"&prx="+name)
      .pipe(
        tap(_ => this.log('fetched locateheroesUrl products')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }
  // Http 失敗的錯誤處理函數
  // @param operation - 失敗的操作名稱 , @param result - 作為可觀察結果返回的可選值
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed : ${error.message}`);
      return of(result as T);
    }
  }
  getHeroNo404<Data>(id: number): Observable<Hero> {
    // const url = `${this.heroesUrl}/?id=${id}`;
    const url = `${this.heroesUrl}/?id=${id}`; // 改抓資料庫的 id
    return this.http.get<Hero[]>(url).pipe(
      map(heroes => heroes[0]), tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} hero id=${id}`);
      }),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  // 第五節新增 getHero 給 hero-detail.component 呼叫,會傳入 id 在列表中尋找並傳回 hero 類別
  getHero(id: number): Observable<Hero> {
    /* 第六節改用 URL 取資料
    const hero = HEROES.find(h => h.id === id)!;
    // 樣板字面值:允許嵌入運算式的字串字面值,反引號 ( ` ) 用於定義 JavaScript 的 範本字串字面量，以便嵌入 id。
    // https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Template_literals
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero); */
    // 第六節改用 URL 取資料並有錯誤處理
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  getHeroUsedParam(name:string): Observable<Hero> {
    /* 第六節改用 URL 取資料
    const hero = HEROES.find(h => h.id === id)!;
    // 樣板字面值:允許嵌入運算式的字串字面值,反引號 ( ` ) 用於定義 JavaScript 的 範本字串字面量，以便嵌入 id。
    // https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Template_literals
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero); */
    // 第六節改用 URL 取資料並有錯誤處理
    const url = `${this.locateheroesUrl}&six=${name}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched product prono=${name}`)),
      catchError(this.handleError<Hero>(`getHero prono=${name}`))
    );
  }

// 利用 Request.PathInfo 來分辨要處理的是那個表格或單據資料 例如：
// https://noob.tw/restful-api/
// 新增使用者：POST /user
// 查所有帳號：GET /users
// 查詢使用者：GET /user/1
// 修改使用者：PUT /user/1
// 刪除使用者：DELETE /user/1

  // 更新回去的函式
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUpdateUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id} name=${hero.name}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  //新增
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  //刪除
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`delete hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )
  }
  //尋找
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // 如果搜尋字串空白,回傳空陣列
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
