import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdsProvider } from '../../providers/ads/ads';
import { SERVER_URL } from '../../providers/serverUrl';

/**
 * Generated class for the MyAdsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-ads',
  templateUrl: 'my-ads.html',
})
export class MyAdsPage {
	image;
	ads;
  constructor(private adsProvider: AdsProvider, public navCtrl: NavController, public navParams: NavParams) {
 	this.adsProvider.getMyAds('api/auth/myads').subscribe((res)=>{
 		this.ads = res;
  		this.image = SERVER_URL + 'img/ads/';
 	})
  }

}
