import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../providers/storage/storage';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  public nba;
  public mlb;
  public nfl;

  constructor(private http: HttpClient, private storage: StorageService) { 
  }
  
  async getNBA() {
    var url = 'http://site.api.espn.com/apis/site/v2/sports/basketball/nba/news';
    await this.http.get(url).subscribe( async response => {
      await this.passNBA(response);
    });
  }
  async passNBA(data){
    this.nba = data;
    console.log(this.nba);
  }

  async getMLB() {
    var url = 'http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/news';
    await this.http.get(url).subscribe( async response => {
      await this.passMLB(response);
    });
  }
  async passMLB(data){
    this.mlb = data;
    console.log(this.mlb);
  }

  async getNFL() {
    var url = 'http://site.api.espn.com/apis/site/v2/sports/football/nfl/news';
    await this.http.get(url).subscribe( async response => {
      await this.passNFL(response);
    });
  }
  async passNFL(data){
    this.nfl = data;
    console.log(this.nfl);
  }

  async ionViewWillEnter() {
    await this.getNBA();
    console.log(this.nba);
    await this.getMLB();
    console.log(this.mlb);
    await this.getNFL();
    console.log(this.nfl);

  }

  async favorite(article) {
    var usersList = [];
    var currentUser;
    await this.storage.getUsers()
      .then((users) => {
        if (users)
          usersList = users;
        console.log(usersList);
      });
    await this.storage.getCurrentUser()
      .then((user) => {
        if (user)
          currentUser = user;
        console.log(currentUser);
      });
    await currentUser.favorites.push(article);
    await this.storage.saveCurrentUser(currentUser);

    console.log(currentUser);
    await usersList.forEach(user => {
      if(user.username == currentUser.username && user.password == currentUser.password){
        user.favorites.push(article);
      }
    });
    await this.storage.saveUsers(usersList);
  }

}