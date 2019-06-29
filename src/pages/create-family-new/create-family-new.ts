import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Events, LoadingController, AlertController , ToastController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import * as $ from 'jquery';

/**
 * Generated class for the CreateFamilyNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-family-new',
  templateUrl: 'create-family-new.html',
  providers: [AuthServiceProvider]
})
export class CreateFamilyNewPage {
	userDetails:any;
  	constructor(public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController, public auth: AuthServiceProvider) {
  		var data = JSON.parse(localStorage.getItem('userAuth'));
  		this.userDetails = data;
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad CreateFamilyNewPage');
  	}

  	addFamilyNew(){
  		var url = this.auth.url+'/addFamilyNew';
  		var dat = $('#form_add_family_new').serialize();
  		let loader: any;
  		$.ajax({
			url: url,
			type: 'POST',
			data: dat,
			beforeSend: ()=>{
                loader = this.loadingCtrl.create({
                  content: "Registrando",
                });
                loader.present();
            }
		})
		.done((data) => {
			console.log(data);

			if (data.success != true) {
				loader.dismiss();
                this.alertCtrl.create({
                  title: 'Error!',
                  subTitle: data.msj, 
                  buttons: ['OK']
                }).present();
			}else{
				localStorage.removeItem("userFamilies");
				localStorage.setItem('userFamilies' , JSON.stringify(data.fam));
				this.events.publish('editarObjeto');
				loader.dismiss();
				// this.alertCtrl.create({
    //               title: 'Exito!',
    //               subTitle: 'Familia registrada exitosamente',
    //               buttons: ['OK']
    //             }).present();
                this.toastCtrl.create({
                  message: 'Familia registrada exitosamente',
                  duration: 3000
                }).present(); 
				this.navCtrl.pop();
			}
		})
		.fail((r) => {
			loader.dismiss();
            this.alertCtrl.create({
                title: 'Error!',
                subTitle: 'Error al procesar los datos, intente mas tarde',
                buttons: ['OK']
            }).present();
		})
		.always(function() {
			console.log("complete");
		});
  	}
}
