import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	email;
	password;
	loading: boolean = false;

  constructor(private storage: Storage, public toastCtrl: ToastController, private authProvider: AuthProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

	presentToast(message) {
	    const toast = this.toastCtrl.create({
	        message: message,
	        duration: 3000
	    });
	    toast.present();
	}

  	// Login Function
	login(){
		this.loading = true;
		let info = {
			email: this.email,
			password: this.password
		}
		this.authProvider.login(info, 'api/auth/login').subscribe((data)=>{
		if (data) {
		    this.storage.set('my_token', data['access_token']);
		    this.navCtrl.setRoot("TabsPage")
			this.loading = false;
		    this.presentToast("Logged in successfully");
		} else {
			this.loading = false;
		    this.presentToast("Error with email and password");
		}
		},err=>{
			this.loading = false;
		    this.presentToast("Error with email and password");
		})
	}
}
