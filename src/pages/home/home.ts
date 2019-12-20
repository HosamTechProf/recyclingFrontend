import { Component } from '@angular/core';
import { NavController, IonicPage, ModalController, AlertController } from 'ionic-angular';
import { AdsProvider } from '../../providers/ads/ads';
import { AuthProvider } from '../../providers/auth/auth';
import { CodesProvider } from '../../providers/codes/codes';
import { SERVER_URL } from '../../providers/serverUrl';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	ads;
	image;
  home = "ads";
  constructor(private alertCtrl: AlertController, private codesProvider: CodesProvider, private barcodeScanner: BarcodeScanner, public modalCtrl: ModalController, private authProvider: AuthProvider, private adsProvider: AdsProvider, public navCtrl: NavController) {
  	this.authProvider.getUserData('api/auth/user').subscribe((res)=>{
  		let type = res['type'];
	  	this.adsProvider.getAds('api/auth/getads/' + type).subscribe((data)=>{
	  		this.ads = data;
	  		this.image = SERVER_URL + 'img/ads/';
	  	})
  	})
  }

  openAd(id){
   let profileModal = this.modalCtrl.create("ViewAdPage", { id:id });
   profileModal.present();
  }

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
     let info = {
       code : barcodeData.text
     }
     this.codesProvider.scan(info, 'api/auth/scan').subscribe((res)=>{
       if (res['status'] === true) {
        let alert = this.alertCtrl.create({
          title: 'Message',
          subTitle: res['codes']['0']['msg'],
          buttons: ['Ok']
        });
        alert.present();
       }else{
        let alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: 'We could not find a product matching in our database! <br>In this case you could enter the number of the recycling symbol at the product (inside the rectangle) to know the recyclability of it ...then enter “Search”',
          inputs: [
            {
              name: 'number',
              placeholder: 'The number of the recycling symbol'
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Search',
              handler: data => {
                if (data.number == 1) {
                  let alert = this.alertCtrl.create({
                    title: 'Polyethylene Terephthalate',
                    subTitle: '- Soft drink, water and salad dressing bottles, peanut butter and jam jars.' + '<br>' + '- Suitable to store cold or warm drinks. Bad idea for hot drinks.' + '<br>' + '<b>- Highly recyclable</b>',
                    buttons: ['Ok']
                  });
                  alert.present();
                }else if (data.number == 2) {
                  let alert = this.alertCtrl.create({
                    title: 'High-Density polyethylene',
                    subTitle: '- Water pipes, milk, juice and water bottles; grocery bags, some shampoo / toiletry bottles.' + '<br>' + '<b>- Recyclable</b>',
                    buttons: ['Ok']
                  });
                  alert.present();
                }else if (data.number == 3) {
                  let alert = this.alertCtrl.create({
                    title: 'PVC (Polyvinyl Chloride)',
                    subTitle: '- Not used for food packaging.' + '<br>'+ '- Pipes, cables, furniture, clothes, toys.' + '<br>' + '<b>- Unrecyclable</b>',
                    buttons: ['Ok']
                  });
                  alert.present();
                }else if (data.number == 4) {
                  let alert = this.alertCtrl.create({
                    title: 'Low-Density Polyethylene',
                    subTitle: '- Frozen food bags; squeezable bottles, e.g. Honey, mustard; cling films; flexible container lids.' + '<br>' + '<b>- Recyclable except flexible bags and wraps as they are Unrecyclable.</b>',
                    buttons: ['Ok']
                  });
                  alert.present();
                }else if (data.number == 5) {
                  let alert = this.alertCtrl.create({
                    title: 'Polypropylene',
                    subTitle: '- Reusable microwavable ware; kitchenware; yogurt containers; microwavable disposable take-away containers; disposal cups; plates.' + '<br>' + '<b>- Badly Recyclable.</b>',
                    buttons: ['Ok']
                  });
                  alert.present();
                }else if (data.number == 6) {
                  let alert = this.alertCtrl.create({
                    title: 'Polystyrene',
                    subTitle: '- Plastic cups, disposable cutlery and cups (clear and colored), coffee cups, packing peanuts, Styrofoam insulation.' + '<br>' + '<b>- Recyclable except packing peanuts, Styrofoam etc. they are Unrecyclable (these are contaminated by food easily).</b>',
                    buttons: ['Ok']
                  });
                  alert.present();
                }else if (data.number == 7) {
                  let alert = this.alertCtrl.create({
                    title: 'Often Poly Carbonate or ABS',
                    subTitle: '- Biodegradable plastics, like cups made of corn, nylon, fiber glass, unbreakable glass.' + '<br>' + '<b>- Unrecyclable.</b>',
                    buttons: ['Ok']
                  });
                  alert.present();
                }else{
                  let alert = this.alertCtrl.create({
                    title: 'Error!',
                    subTitle: 'Please write a number between 1 and 7',
                    buttons: ['Ok']
                  });
                  alert.present();
                }
              }
            }
          ]
        });
        alert.present();
       }
     })
    }).catch(err => {
        console.log('Error', err);
    });
  }

  survey(){
   let profileModal = this.modalCtrl.create("SurveyPage", undefined, { cssClass: 'mymodal' });
   profileModal.present();
  }

}
