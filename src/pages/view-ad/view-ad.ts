import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdsProvider } from '../../providers/ads/ads';
import { AuthProvider } from '../../providers/auth/auth';
import { BuyingProvider } from '../../providers/buying/buying';
import { SERVER_URL } from '../../providers/serverUrl';

/**
 * Generated class for the ViewAdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-ad',
  templateUrl: 'view-ad.html',
})
export class ViewAdPage {
	user = {};
	name;
	price;
	desc;
	image;
  ad_id;
  loading = true;
  type;
  constructor(private buyingProvider: BuyingProvider, private authProvider: AuthProvider, private adsProvider: AdsProvider, public navCtrl: NavController, public navParams: NavParams) {
  	this.authProvider.getUserData('api/auth/user').subscribe((res)=>{
  	let type = res['type'];
    		this.adsProvider.getAds('api/auth/getad/' + type + '/' + this.navParams.get('id')).subscribe((res)=>{
    			this.name = res['name']
    			this.desc = res['desc']
          this.price = res['price']
    			this.ad_id = res['id']
  	  		this.image = SERVER_URL + 'img/ads/' + res['image'];
    			this.user = res['user']
          let info = {
            ad_id : res['id'],
            seller_id : res['user']['id']
          }
          this.buyingProvider.request(info, 'api/auth/getad').subscribe((data)=>{
            this.loading = false;
            if (data['status'] === 'requested') {
              this.type = true
            }else{
              this.type = false
            }
          })
    		})
    	})
  }

	goBack() {
		this.navCtrl.pop();
	}

  request(){
    this.loading = true
    let info = {
      ad_id : this.ad_id,
      seller_id : this.user['id']
    }
    this.buyingProvider.request(info, 'api/auth/requestad').subscribe((res)=>{
      this.loading = false;
      this.type = true;
    })
  }

}
