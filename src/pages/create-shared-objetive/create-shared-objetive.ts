import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Events, LoadingController, AlertController , ToastController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import * as $ from 'jquery';
/**
 * Generated class for the CreateSharedObjetivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-shared-objetive',
  templateUrl: 'create-shared-objetive.html',
    providers: [AuthServiceProvider]

})
export class CreateSharedObjetivePage { 
	userDetails: any;
	myDate: any;
	userFamily: any;
    userFamilyExt: any;
	family_r: any = [];
  	constructor(public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController,public auth: AuthServiceProvider) {
  		var data = JSON.parse(localStorage.getItem('userAuth'));
  		var dat = JSON.parse(localStorage.getItem('userFamilies'));
        var dat2 = JSON.parse(localStorage.getItem('userFamilyExt'));
  		this.userFamily = dat;
        this.userFamilyExt = dat2;
	    this.userDetails = data;
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad CreateSharedObjetivePage');
        $.each(this.family_r, (index, val)=> {
            val.status_select = false;
        });
  	}

  	updateCucumber(f){
        console.log(f);
  		if (f.status_select != true) {
  			$.each(this.family_r, (index, val)=> {
				if(f.id == val){
					this.family_r.splice(index, 1);
  					console.log(this.family_r);
				}
			});
  		}else{
  			this.family_r.push(f.id);
  			console.log(this.family_r);
  		}
  	}

  	addSharedOb(){
  		var url = this.auth.url+'/addSharedOb';
  		var dat = $('#form_add_s_o').serialize();
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
				localStorage.removeItem("userShaOb");
				localStorage.setItem('userShaOb' , JSON.stringify(data.s_o));
				this.events.publish('editarObjeto');
				loader.dismiss();
                this.toastCtrl.create({
                  message: 'Objetivo compartido registrado exitosamente',
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

    toggle(f){
        $('.no_s_'+f.id).toggle();
    }
}
