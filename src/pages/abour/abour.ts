import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConditionsPage } from '../conditions/conditions';
import { PrivacyPage } from '../privacy/privacy';
import { EmailComposer } from '@ionic-native/email-composer';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the AbourPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-abour',
  templateUrl: 'abour.html',
})
export class AbourPage {
    userDetails : any;
  	constructor(private iab: InAppBrowser,private emailComposer: EmailComposer,public navCtrl: NavController, public navParams: NavParams) {
  	    var data = JSON.parse(localStorage.getItem('userAuth'));
        this.userDetails = data;
    }

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad AbourPage');
  	}

  	privacy(){
  		this.navCtrl.push(PrivacyPage);
  	}

  	conditions(){
  		this.navCtrl.push(ConditionsPage);
  	}

    support(){
        let email = {
          to: 'lauraparicio@hotmail.com',
          cc: this.userDetails.email,
          subject: 'Soporte técnico',
          body: 'Describenos tu problema!',
          isHtml: true
        };

        this.emailComposer.open(email);
    }

    web(){
        this.iab.create('http://jasoluciones.com.mx' , '_blank')
    }
}
