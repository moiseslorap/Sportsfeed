import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageService {

  constructor(public storage: Storage) { }

  public getUsers(){
    return this.storage.get('users');
  }

  public saveUsers(users){
    this.storage.set('users', users);
    }
  
  public getCurrentUser(){
      return this.storage.get('current');
  }
  
  public saveCurrentUser(user){
      this.storage.set('current', user);
  }
}