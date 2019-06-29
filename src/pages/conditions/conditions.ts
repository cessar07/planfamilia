import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ConditionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conditions',
  templateUrl: 'conditions.html',
})
export class ConditionsPage {
	public c: any;
  	constructor(public navCtrl: NavController, public navParams: NavParams) {
  		var con = JSON.parse(localStorage.getItem('conditions'));
  		this.c = con;
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad ConditionsPage');
  	}
}
