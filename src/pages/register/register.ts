import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
	name;
	phone;
	email;
	password;
	c_password;
	type;
	loading: boolean = false;
	userImage = 'assets/imgs/user.png';
	base64Image;
  constructor(private camera: Camera, private storage: Storage, public toastCtrl: ToastController, private authProvider: AuthProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

	presentToast(message) {
	    const toast = this.toastCtrl.create({
	        message: message,
	        duration: 3000
	    });
	    toast.present();
	}

	isDisabled() {
		if(!this.name) return true;
		if(!this.phone) return true;
		if(!this.email) return true;
		if(!this.type) return true;
		if(!this.c_password) return true;
		if(!this.password) return true;
	}

	register(){
		this.loading = true;
		let info = {
			name : this.name,
			phone : this.phone,
			email : this.email,
			type : this.type,
			password : this.password,
			c_password : this.c_password,
            image: this.base64Image
		}
		this.authProvider.register(info, 'api/auth/register').subscribe((data)=>{
	        if (data['status']) {
	            this.navCtrl.push("TabsPage");
	            this.storage.set('my_token', data['success'].token);
	            this.loading = false;
	            this.presentToast("Register Successfully");
	        }
	    }, (err) => {
			this.loading = false;
	        this.presentToast(Object.keys(err['error'].error).map(key => err['error'].error[key])['0']);
        })
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
            this.userImage = 'data:image/jpeg;base64,' + imageData
        }, (err) => {
            console.log(err)
        });

    }

}
