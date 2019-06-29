import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import { HomePage } from '../home/home';

import * as $ from 'jquery';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    constructor(public navCtrl: NavController, public navParams: NavParams , public loadingCtrl: LoadingController,public alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    logForm(){
        let apiUrl : any = 'http://localhost/plandefamilia/public/';
        let loader: any;
        var f = $('#form-login').serialize();
          $.ajax({
            url: apiUrl+'auth',
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
                localStorage.setItem('userPerOb' , JSON.stringify(data.p_o));
                localStorage.setItem('userNotes' , JSON.stringify(data.notes));
                localStorage.setItem('userListNotes' , JSON.stringify(data.list_notes));
                if (data.privacy) {
                    localStorage.setItem('privacy' , JSON.stringify(data.privacy));
                }
                if (data.conditions) {
                    localStorage.setItem('conditions' , JSON.stringify(data.conditions));
                }
                localStorage.setItem('news' , JSON.stringify(data.news));
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
}