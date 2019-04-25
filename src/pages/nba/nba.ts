import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../providers/storage/storage';
/**
 * Generated class for the NbaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-nba',
  templateUrl: 'nba.html',
})
export class NbaPage {

  public nba;
  constructor( private http: HttpClient, private storage: StorageService) { 
  }
  
  async getNBA() {
    var url = 'http://site.api.espn.com/apis/site/v2/sports/basketball/nba/news';
    this.http.get(url).subscribe( async response => {
      await this.passNBA(response);
    });
  }
  async passNBA(data){
    this.nba = data;
    console.log(this.nba);
  }

  async ionViewWillEnter() {
    await this.getNBA();
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
