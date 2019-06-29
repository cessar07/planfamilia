import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ActionSheetController , Events } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { QuestionsPage } from '../questions/questions';

import * as $ from 'jquery';

/**
 * Generated class for the VerifycodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verifycode', 
  templateUrl: 'verifycode.html',
  providers: [AuthServiceProvider]
})
export class VerifycodePage {
	public id;
    constructor(public events: Events,public actionSheetCtrl: ActionSheetController,public navCtrl: NavController, public navParams: NavParams , public loadingCtrl: LoadingController,public alertCtrl: AlertController,public auth: AuthServiceProvider) {
  		this.id   = navParams.get("id");
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad VerifycodePage');
  	}

  	activate(){
        let loader: any;
        var f = $('#form-activate').serialize();
        console.log(f);
        $.ajax({
            url: this.auth.url+'/activateUser',
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
                localStorage.setItem('userAuth' , JSON.stringify(data.user));
                localStorage.setItem('schools' , JSON.stringify(data.schools));
                loader.dismiss();
                this.events.publish('editarObjeto');
                this.navCtrl.setRoot(QuestionsPage);
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

    resendCodeConfirm(){
        this.actionSheetCtrl.create({
            title: 'Seguro de reenviar el codigo?',
            buttons: [
                {
                    text: 'Confirmar',
                    role: 'destructive',
                    handler: () => {
                        this.resendCode();
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancelado');
                    }
                }
              ]
        }).present();
    }

    resendCode(){
        let loader: any;
        $.ajax({
            url: this.auth.url+'/'+this.id,
            type: 'GET',
            data:{},
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
