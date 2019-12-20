import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SERVER_URL } from '../../providers/serverUrl';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ViewRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-request',
  templateUrl: 'view-request.html',
})
export class ViewRequestPage {
	image;
	data;
	userName;
  userId;
  constructor(private authProvider: AuthProvider, public navCtrl: NavController, public navParams: NavParams) {
  	this.data = this.navParams.get('data')
	  this.image = SERVER_URL + 'img/ads/';
  	this.authProvider.getUserData('api/auth/getUserDataFromId/' + this.data['pivot']['user_id']).subscribe((res)=>{
      this.userName = res['name']
  		this.userId = res['id']
  	})
  }

  accept(id){
  	this.authProvider.getUserData('api/auth/acceptrequest/' + id + '/' + this.userId).subscribe(()=>{
  		alert("Request Accepted Successfully")
  		this.navCtrl.setRoot("TabsPage")
  	},(err)=>{
  		alert("There Is An Error")
  		this.navCtrl.setRoot("TabsPage")
  	})
  }

  cancel(id){
  	this.authProvider.getUserData('api/auth/cancelrequest/' + id + '/' + this.userId).subscribe(()=>{
  		alert("Request Cancelled Successfully")
  		this.navCtrl.setRoot("TabsPage")
  	},(err)=>{
  		alert("There Is An Error")
  		this.navCtrl.setRoot("TabsPage")
  	})
  }

}
