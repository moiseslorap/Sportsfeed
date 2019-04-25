import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../providers/storage/storage';
/**
 * Generated class for the MlbPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mlb',
  templateUrl: 'mlb.html',
})
export class MlbPage {

  public mlb;
  constructor(private http: HttpClient, private storage: StorageService) { }

  async getMLB() {
    var url = 'http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/news';
    this.http.get(url).subscribe(async response => {
      await this.passMLB(response);
    });
  }
  async passMLB(data) {
    this.mlb = data;
    console.log(this.mlb);
  }

  async ionViewWillEnter() {
    await this.getMLB();
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