import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AdsProvider } from '../../providers/ads/ads';
import { AuthProvider } from '../../providers/auth/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the AddAdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-ad',
  templateUrl: 'add-ad.html',
})
export class AddAdPage {
	name;
	desc;
	price;
	base64Image;
	type;
	loading = false
	adImage = "assets/imgs/adPlaceholder.png"
	constructor(private authProvider: AuthProvider, public toastCtrl: ToastController, private camera: Camera, private adsProvider: AdsProvider, public navCtrl: NavController, public navParams: NavParams) {
	  	this.authProvider.getUserData('api/auth/user').subscribe((res)=>{
	  		this.type = res["type"]
	  	})
	}

	presentToast(message) {
	    const toast = this.toastCtrl.create({
	        message: message,
	        duration: 3000
	    });
	    toast.present();
	}

    uploadImage() {
        const options: CameraOptions = {
            quality: 90,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            targetHeight: 500,
            targetWidth: 500
        }

        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
            this.adImage = 'data:image/jpeg;base64,' + imageData
        }, (err) => {
            console.log(err)
        });

    }

	add(){
		this.loading = true
		let info = {
			name : this.name,
			desc : this.desc,
			price : this.price,
			image : this.base64Image,
			type : this.type
		}
		this.adsProvider.addSellerAd(info, 'api/auth/user/addad').subscribe((res)=>{
			this.presentToast('Advertisement Added Succesfully')
			this.loading = false;
		}, (err)=>{
			this.presentToast('There Is An Error')
			this.loading = false;
		})
	}

}
