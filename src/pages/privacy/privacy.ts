import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PrivacyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-privacy',
  templateUrl: 'privacy.html',
})
export class PrivacyPage {
	public p:any;
  	constructor(public navCtrl: NavController, public navParams: NavParams) {
  		var pri = JSON.parse(localStorage.getItem('privacy'));
  		this.p  = pri;
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad PrivacyPage');
  	}
}
