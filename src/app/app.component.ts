import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  constructor(private alertCtrl: AlertController, private storage: Storage, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.initRootPage();
    });
    // if (!localStorage['ip']) {
    //   let alert = this.alertCtrl.create({
    //     title: 'Change IP Address',
    //     inputs: [
    //       {
    //         name: 'ip',
    //         placeholder: 'IP Address'
    //       }
    //     ],
    //     buttons: [
    //       {
    //         text: 'Cancel',
    //         role: 'cancel',
    //         handler: data => {
    //           console.log('Cancel clicked');
    //         }
    //       },
    //       {
    //         text: 'Submit',
    //         handler: data => {
    //           localStorage['ip'] = data.ip;
    //           window.location.reload();
    //         }
    //       }
    //     ]
    //   });
    //   alert.present();
    // }
  }

    protected initRootPage() {
        this.storage.get('my_token').then((val) => {
            this.rootPage = val ? 'TabsPage' : 'LoginPage';
        })
    }
}
