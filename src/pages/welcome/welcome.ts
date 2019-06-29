import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController , Events , MenuController} from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { SendPasswordPage } from '../send-password/send-password';
import { QuestionsPage } from '../questions/questions';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import * as $ from 'jquery';


/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
  providers: [AuthServiceProvider]
})
export class WelcomePage {
    constructor(public menuCtrl: MenuController,public events: Events,public navCtrl: NavController, public navParams: NavParams , public loadingCtrl: LoadingController,public alertCtrl: AlertController , public auth: AuthServiceProvider) {
        var data = JSON.parse(localStorage.getItem('userAuth'));
        var p_o = JSON.parse(localStorage.getItem('userPerOb')); 
        if(data){
            this.navCtrl.setRoot(HomePage , {
                userDetails:data,
                userPerOb:p_o
            });
        }
        this.menuCtrl.swipeEnable(false);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad WelcomePage');
    }

  	login(){	
  		this.navCtrl.push(LoginPage);
	}

	signup(){
        this.navCtrl.push(SignupPage);
	}

    logForm(){
        let loader: any;
        var f = $('#form-login').serialize();
          $.ajax({
            url: this.auth.url+'/auth',
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
            console.log(data);
            if (data.success != true) {
                loader.dismiss();
                this.alertCtrl.create({
                  title: 'Error!',
                  subTitle: data.msj,
                  buttons: ['OK']
                }).present();
            }else{
                localStorage.setItem('userAuth' , JSON.stringify(data.user));
                localStorage.setItem('userPerOb' , JSON.stringify(data.p_o));
                localStorage.setItem('userShaOb' , JSON.stringify(data.s_o));
                localStorage.setItem('userFamilies' , JSON.stringify(data.family));
                localStorage.setItem('userFamilyExt' , JSON.stringify(data.family_ext));
                localStorage.setItem('schools' , JSON.stringify(data.schools));
                // localStorage.setItem('banner' , JSON.stringify(data.banner));
                if(data.privacy){
                    localStorage.setItem('privacy' , JSON.stringify(data.privacy));
                }
                if(data.conditions){
                    localStorage.setItem('conditions' , JSON.stringify(data.conditions));
                }
                localStorage.setItem('userActivity' , JSON.stringify(data.act));
                this.events.publish('editarObjeto');
                this.events.publish('reloadBanners');
                
                let onesignalId = localStorage.getItem('oneSignalIdFamilia');
                let user = localStorage.getItem('userAuth');

                if (onesignalId) {
                    $.ajax({
                        method: "POST",
                        url: this.auth.url+'/saveOnesignalId',
                        data: {user_id:JSON.parse(user).id,onesignal_id:onesignalId},
                    }).done((suc)=>{
                      console.log(suc);
                    }).fail((err)=>{
                      console.log(err);
                    })
                }

                loader.dismiss();
                this.goHome();
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

    goHome(){
        this.navCtrl.setRoot(HomePage);
    }

    sendPassword(){
        this.navCtrl.push(SendPasswordPage);
    }

    QuestionsPage(){
        this.navCtrl.push(QuestionsPage);
    }
}
