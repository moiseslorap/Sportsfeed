import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
import { StorageService } from '../../providers/storage/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public username:string;
  public password:string;
  public new_user:string;
  public new_pass:string;
  public usersList = [];
  
  constructor(private navController: NavController, public toastController: ToastController, private alertController: AlertController, public storage: StorageService) {
    this.storage.getUsers()
      .then((users) => {
        if (users)
          this.usersList = users;
        console.log(this.usersList);
      });
   }

  login() {
    this.usersList.forEach( (user, key, array) => {
      if(user.username == this.username && user.password == this.password){
        var last_visited = user.date;
        this.presentToast(last_visited);
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        user.date = dateTime;
        console.log(user.date);
        this.storage.saveCurrentUser(user);
        this.storage.saveUsers(this.usersList);
        this.navController.push(TabsPage);
      }
    });
  }

  async presentToast(date) {
    const toast = await this.toastController.create({
      message: 'Your last visit was on ' + date,
      duration: 1500,
      position: 'middle'
    });
    toast.present();
  }

  // async errorAlert() {
  //   const alert = await this.alertController.create({
  //     header: 'Failed Login',
  //     subHeader: 'Username and/or password are incorrect',
  //     buttons: ['Dismiss']
  //   });

  //   await alert.present();
  // }

  async registerAlert() {
    const alert = await this.alertController.create({
      title: 'Register',
      inputs: [
        {
          name: 'username',
          type: 'text',
          id: 'username-id',
          placeholder: 'Username'
        },
        {
          name: 'password',
          type: 'password',
          id: 'password-id',
          placeholder: 'Password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {

            if(data.username && data.password){
              var user = {
                username: data.username,
                password: data.password,
                date: ': Wait this is your first visit',
                favorites: []
              };
              this.usersList.push(user);
              this.storage.saveUsers(this.usersList);
            }

            console.log(this.usersList);
          }
        }
      ]
    });

    await alert.present();
  }

}
