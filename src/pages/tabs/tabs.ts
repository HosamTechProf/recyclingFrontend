import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'HomePage';
  tab2Root = 'ProfilePage';

  constructor(public navCtrl: NavController) {

  }

  addAd(){
  	this.navCtrl.push("AddAdPage")
  }
}
