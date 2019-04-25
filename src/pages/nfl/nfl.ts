import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../providers/storage/storage';

/**
 * Generated class for the NflPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-nfl',
  templateUrl: 'nfl.html',
})
export class NflPage {

  public nfl;
  
  constructor(private http: HttpClient, private storage: StorageService) { }

  async getNFL() {
    var url = 'http://site.api.espn.com/apis/site/v2/sports/football/nfl/news';
    this.http.get(url).subscribe( async response => {
      await this.passNFL(response);
    });
  }
  async passNFL(data){
    this.nfl = data;
    console.log(this.nfl);
  }

  async ionViewWillEnter() {
    await this.getNFL();
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