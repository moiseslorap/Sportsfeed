import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../providers/storage/storage';

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  public favorites = [];
  public currentUser;
  public usersList = [];
  
  constructor(private storage: StorageService) {  
  }

  async ionViewWillEnter() {
    await this.storage.getCurrentUser()
      .then((user) => {
        if (user)
          this.currentUser = user;
          this.favorites = user.favorites;
      });
      await this.storage.getUsers()
      .then((users) => {
        if (users)
          this.usersList = users;
        
      });
  }

  async deleteFavorite(article) {
    for (let index = 0; index < this.favorites.length; index++) {
      if (this.favorites[index] == article) {
        this.favorites.splice(index, 1);
      }
    }
    
    this.currentUser.favorites = this.favorites;

    await this.storage.saveCurrentUser(this.currentUser);
    await this.usersList.forEach(user => {
      if(user.username == this.currentUser.username && user.password == this.currentUser.password){
        console.log(user);
        user.favorites = this.currentUser.favorites;
        console.log(user.favorites);
      }
    });
    console.log(this.usersList);
    await this.storage.saveUsers(this.usersList);

  }
}