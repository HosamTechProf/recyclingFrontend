import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BuyingProvider } from '../../providers/buying/buying';
import { SERVER_URL } from '../../providers/serverUrl';

/**
 * Generated class for the RequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html',
})
export class RequestsPage {
	requests;
	image;
	name;
  constructor(private buyingProvider: BuyingProvider, public navCtrl: NavController, public navParams: NavParams) {
  	this.buyingProvider.getRequest('api/auth/getrequests').subscribe((res)=>{
  		this.requests = res;
	  	this.image = SERVER_URL + 'img/ads/';
  	})
  }

  openRequestPage(request){
  	this.navCtrl.push('ViewRequestPage', {data:request});
  }

}
