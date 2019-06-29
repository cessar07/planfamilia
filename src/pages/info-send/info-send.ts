import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SendInvitationPage } from '../../pages/send-invitation/send-invitation';

/**
 * Generated class for the InfoSendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-send',
  templateUrl: 'info-send.html',
})
export class InfoSendPage {

  	constructor(public navCtrl: NavController, public navParams: NavParams) {
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad InfoSendPage');
  	}

  	sendIn(){
  		this.navCtrl.push(SendInvitationPage);
  	}
}
