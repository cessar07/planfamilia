import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import { VerifycodePage } from '../verifycode/verifycode';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


import * as $ from 'jquery';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
    providers: [AuthServiceProvider]
})
export class SignupPage {

    constructor(public navCtrl: NavController, public navParams: NavParams , public loadingCtrl: LoadingController,public alertCtrl: AlertController, public auth: AuthServiceProvider) {
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad SignupPage');
  	}

  	singUp(){
        let loader: any;

        var f = $('#form-register').serialize();
        $.ajax({
            url: this.auth.url+'/registerUser',
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

                this.navCtrl.push(VerifycodePage , {
                    id:data.id,
                });
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
