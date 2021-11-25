import { Component, OnInit,Input } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;  // 帶有 @Input()的屬性代表可以被外部存取， @angular/core' 必須加入 Input 符號

  constructor() { }

  ngOnInit(): void {
  }

}
