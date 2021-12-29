import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  //  NgModel 雙向資料繫結要匯入
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// 以下是模擬 Http 遠端取得資料使用的服務
//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService } from './in-memory-data.service';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { initFirebaseBackend } from './authUtils';

import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';

// app.module.ts -> auhutils.ts.initFirebaseBackend (environment.ts.firebaseConfig)

if (environment.defaultauth === 'firebase') {
   initFirebaseBackend(environment.firebaseConfig);
}


@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    HeroFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,  //  NgModel 雙向資料繫結要匯入
    AppRoutingModule,  // app-routing.module.ts
    HttpClientModule,
    // 以下是模擬 Http 遠端取得資料使用的服務
 //   HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService,{dataEncapsulation:false})
 MatInputModule,
 MatPaginatorModule,
 MatProgressSpinnerModule,
 MatSortModule,
 MatTableModule,
 MatIconModule,
 MatButtonModule,
 MatCardModule,
 MatFormFieldModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export class User {
  id!: number;
  username!: string;
  password!: string;
  firstName?: string;
  lastName?: string;
  token?: string;
  email!: string;
}
