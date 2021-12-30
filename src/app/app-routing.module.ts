import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // 匯入 RouterModule 和 Routes，以便該應用具有路由功能

import { HeroesComponent } from './heroes/heroes.component'; // 匯入 HeroesComponent，它將告訴路由器要去什麼地方
import { HeroDetailComponent } from './hero-detail/hero-detail.component'; // 第五節儀表盤使用，可在網址上輸入id並導到該頁
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

//這一部分是你的路由配置。 Routes 告訴路由器，當用戶單擊連結或將 URL 貼上進瀏覽器位址列時要顯示哪個檢視。
//典型的 Angular Route 具有兩個屬性：
//  path: 用來匹配瀏覽器位址列中 URL 的字串。
//  component: 導航到該路由時，路由器應該建立的元件。
//這會告訴路由器把該 URL 與 path：'heroes' 匹配。 如果網址類似於 localhost:4200/heroes 就顯示 HeroesComponent。
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },  // 新增預設路由
  { path: 'dashboard', component: DashboardComponent }, //儀表盤頁面
  { path: 'detail/:id', component: HeroDetailComponent }, // 可在網址上輸入id並導到該頁
  { path: 'detail2/:prono', component: HeroDetailComponent }, // prono 是參數名稱， 可在網址上輸入id並導到該頁
  { path: 'heroes', component: HeroesComponent }, // 英雄列表的頁面
  { path: 'login', component: LoginComponent },  // 登入畫面
];

@NgModule({ // @NgModule 元資料會初始化路由器，並開始監聽瀏覽器地址的變化。
  //下面的程式碼行將 RouterModule 新增到 AppRoutingModule 的 imports 陣列中，同時透過呼叫 RouterModule.forRoot() 來用這些 routes 配置它：
  //這個方法之所以叫 forRoot()，是因為你要在應用的最上層配置這個路由器。 forRoot() 方法會提供路由所需的服務提供者和指令，還會基於瀏覽器的當前 URL 執行首次導航。
  imports: [RouterModule.forRoot(routes)],
  //接下來，AppRoutingModule 匯出 RouterModule，以便它在整個應用程式中生效。
  exports: [RouterModule]
})
export class AppRoutingModule { }

//ng generate module app-routing --flat --module=app
//--flat 把這個檔案放進了 src/app 中，而不是單獨的目錄中。
//--module=app 告訴 CLI 把它註冊到 AppModule 的 imports 陣列中。
