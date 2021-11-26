import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';  // 第五節支援路由使用
import { ActivatedRoute } from '@angular/router'; // 第五節支援路由使用

import { Hero } from '../hero';
import { HeroService } from './../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  // @Input() hero?: Hero;  // 帶有 @Input()的屬性代表可以被外部存取， @angular/core' 必須加入 Input 符號

  // 第五節改成傳 id 後就不是 input ,要改回單個 hero 的宣告
  hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,  // 第五節支援路由使用
    private location: Location, // 第五節支援路由使用
    private heroService: HeroService // 第五節支援路由使用
  ) { }

  ngOnInit(): void {
    this.getHero();
  }
  getHero(): void {
    // route.snapshot 是一個路由資訊的靜態快照，抓取自元件剛剛建立完畢之後。
    // paramMap 是一個從 URL 中提取的路由引數值的字典。 "id" 對應的值就是要獲取的英雄的 id。
    // 路由引數總會是字串。 JavaScript 的 Number 函式會把字串轉換成數字，英雄的 id 就是數字型別。
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
  goBack(): void {
    this.location.back();
  }
}
