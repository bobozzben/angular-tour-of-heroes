import { Component, OnInit } from '@angular/core';

import { Hero, _Hero } from '../hero'; // 匯入2個以上的 Interface
// import { HEROES } from '../mock-heroes'; 修改成使用 Service 方式，這裏不用再import 改 import HeroService
import { HeroService } from '../hero.service';
//import { MessageService } from './../message.service'; //第五節加入導航後不用


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // property
  hero_: _Hero = { id: 1, name: 'Windstorm' };  // 使用 hero.ts 的 interface ,在此加入一筆資料 hero_ 第一節用
  // heroes = HEROES; 修改成使用 Service 方式
  heroes: Hero[] = [];
  // selectedHero?: Hero;  //第五節加入導航後廢棄
  // 使用 Service 方式，在建構函式中新增一個私有的 heroService，其型別為 HeroService。
  // 這個引數同時做了兩件事：1. 聲明瞭一個私有 heroService 屬性，2. 把它標記為一個 HeroService 的注入點
  constructor(private heroService: HeroService
    // , private messageService:MessageService //第五節加入導航後癈棄
  ) { } // 建構函式載入多個 Service

  //你固然可以在建構函式中呼叫 getHeroes()，但那不是最佳實踐。
  //讓建構函式保持簡單，只做最小化的初始化操作，比如把建構函式的引數賦值給屬性。 建構函式不應該做任何事。 它當然不應該呼叫某個函式來向遠端服務（比如真實的資料服務）發起 HTTP 請求。
  ngOnInit(): void {
    this.getHeroes();   // 呼叫本身的 getHeroes
  }

  // 範本點選會呼叫這裏，並傳入點選的項目
  // onSelect(hero: Hero): void { //第五節加入導航後癈棄
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }

  // 建立一個方法，以從 hero.service 服務中獲取這些英雄資料。
  getHeroes(): void {
    // this.heroes = this.heroService.getHeroes();  // 同步取值
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes); //非同步取值
  }
  // 被畫面呼叫的新增函式
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => { this.heroes.push(hero) });
  }

  // 被畫面呼叫的刪除函式
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  modify(hero: Hero): void {

  }
  search(name:string): void {
    this.heroService.getHeroesUsedParam(name)
      .subscribe(heroes => this.heroes = heroes); //非同步取值

  }

}
