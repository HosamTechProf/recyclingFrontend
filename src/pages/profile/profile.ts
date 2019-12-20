import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { SERVER_URL } from '../../providers/serverUrl';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
	name;
	email;
	phone;
	points;
	image;
	type;

  constructor(private storage: Storage, private app: App, private authProvider: AuthProvider, public navCtrl: NavController, public navParams: NavParams) {
  	this.authProvider.getUserData('api/auth/user').subscribe((res)=>{
  		this.name = res["name"]
  		this.email = res["email"]
  		this.phone = res["phone"]
  		this.points = res["points"]
  		this.type = res["type"]
  		this.image = SERVER_URL + 'img/users/' + res["image"]
  	})
  }

  logout(){
        localStorage.clear();
        this.storage.clear();
        let newRootNav = <NavController>this.app.getRootNavById('n4');
        newRootNav.push("LoginPage")
  }

}
