import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../../pages/home/home';

import * as $ from 'jquery';

/**
 * Generated class for the SendInvitationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  	selector: 'page-send-invitation',
  	templateUrl: 'send-invitation.html',
    providers: [AuthServiceProvider]
})
export class SendInvitationPage {
	userDetails : any;
    public f;
    constructor(public navCtrl: NavController, public navParams: NavParams , public loadingCtrl: LoadingController,public alertCtrl: AlertController , public auth: AuthServiceProvider) {
  		var data = JSON.parse(localStorage.getItem('userAuth'));
        this.userDetails = data;
        this.f = this.navParams.get('f');
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad SendInvitationPage');
  	}

  	sendInvi(){
  		let loader: any;
        var f = $('#form-invi').serialize();
        $.ajax({
            url: this.auth.url+'/sendInvitation',
            type: 'POST',
            data:f,
            beforeSend: ()=>{
                loader = this.loadingCtrl.create({
                  content: "Enviando invitacion",
                });
                loader.present();
            }
        })
        .done((data)=> {
            console.log(data);
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
                  	subTitle: 'hemos enviado tu invitación, te avisaremos cuando sea aceptada!',
                 	buttons: ['OK']
                }).present();
                this.navCtrl.setRoot(HomePage);
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
    
    sendInviNew(){
        let loader: any;
        var f = $('#form-invi').serialize();
        $.ajax({
            url: this.auth.url+'/sendInviNew',
            type: 'POST',
            data:f,
            beforeSend: ()=>{
                loader = this.loadingCtrl.create({
                  content: "Enviando invitacion",
                });
                loader.present();
            }
        })
        .done((data)=> {
            console.log(data);
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
                      subTitle: 'Hemos enviado tu invitación, te avisaremos cuando sea aceptada!',
                     buttons: ['OK']
                }).present();
                this.navCtrl.pop();
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
