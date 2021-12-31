import { Component } from '@angular/core';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Tour of xOne Products';//'Tour of Heroes';


  constructor(private authService: AuthService
    // , private messageService:MessageService //第五節加入導航後癈棄
  ) { } // 建構函式載入多個 Service


  logout() {
    this.authService.logout();
  }

}
