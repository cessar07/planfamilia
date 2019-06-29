import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ResetPasswordPage } from '../reset-password/reset-password';
import * as $ from 'jquery';
/**
 * Generated class for the SendPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send-password',
  templateUrl: 'send-password.html',
    providers: [AuthServiceProvider]

})
export class SendPasswordPage {

    constructor(public navCtrl: NavController, public navParams: NavParams , public loadingCtrl: LoadingController,public alertCtrl: AlertController , public auth: AuthServiceProvider) {
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad SendPasswordPage');
  	}

  	sendPass(){
  		let loader: any;
        var f = $('#form-passw').serialize();
        $.ajax({
            url: this.auth.url+'/sendPassword',
            type: 'POST',
            data:f,
            beforeSend: ()=>{
                loader = this.loadingCtrl.create({
                  content: "Procesando",
                });
                loader.present();
            }
        })
        .done((data)=> {
            // console.log(data);
            if (data.success != true) {
                loader.dismiss();
                this.alertCtrl.create({
                  title: 'Error!',
                  subTitle: data.msj,
                  buttons: ['OK']
                }).present();
            }else{
                loader.dismiss();
                this.alertCtrl.create({
                	title: 'Exito!',
                  	subTitle: data.msj,
                 	buttons: ['OK']
                }).present();
                this.navCtrl.push(ResetPasswordPage);
            }
        })
        .fail((r)=> {
            loader.dismiss();
                this.alertCtrl.create({
                title: 'Error!',
                subTitle: 'Error al procesar los datos, intente mas tarde',
                buttons: ['OK']
            }).present();
        })
        .always(()=> {
            console.log("complete");
        });
  	}
}
