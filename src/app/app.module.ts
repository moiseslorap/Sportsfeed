import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StorageService } from '../providers/storage/storage';
import { IonicStorageModule } from '@ionic/storage';
import { NewsPage } from '../pages/news/news';
import { FavoritesPage } from '../pages/favorites/favorites';
import { NflPage } from '../pages/nfl/nfl';
import { MlbPage } from '../pages/mlb/mlb';
import { NbaPage } from '../pages/nba/nba';
import { LoginPage } from '../pages/login/login';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NewsPage,
    NbaPage,
    MlbPage,
    NflPage,
    FavoritesPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NewsPage,
    NbaPage,
    MlbPage,
    NflPage,
    FavoritesPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageService
  ]
})
export class AppModule {}
