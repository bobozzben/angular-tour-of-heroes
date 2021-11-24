import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // property
  hero_ : Hero = { id:1, name:'Windstorm' };  // 使用 hero.ts 的 interface ,在此加入一筆資料 hero_ 第一節用

  heroes = HEROES;
  constructor() { }

  ngOnInit(): void {
  }

}
