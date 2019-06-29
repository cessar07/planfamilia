import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Events, LoadingController, AlertController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../../pages/home/home';

import * as $ from 'jquery';
/**
 * Generated class for the SelectUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  	selector: 'page-select-user',
  	templateUrl: 'select-user.html',
    providers: [AuthServiceProvider]
})
export class SelectUserPage {

	userFamily:any;
    userDetails:any;
    familyYoung:any = [];
    res:any;
    constructor(public auth: AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController) {
  		var dat = JSON.parse(localStorage.getItem('userFamilies'));
        var dat2 = JSON.parse(localStorage.getItem('userAuth'));
        var da2 = JSON.parse(localStorage.getItem('userResponsable2'));
  		this.userFamily = dat;
        this.userDetails = dat2;
        $.each(this.userFamily, (index, val)=> { 
            $.each(val.familyOther, (index2, val2)=> { 
                if (val2.younger == 1) {
                    this.familyYoung.push(val2);
                }
            });
        });
        this.events.subscribe('editarObjeto',()=>{
          this.userFamily = JSON.parse(localStorage.getItem('userFamilies'));
        });

        if (da2) {
            this.res = da2;
        }
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad SelectUserPage');
  	}

  	changeApp(f){
  		let loader: any;
        $.ajax({
            url: this.auth.url+'/changeAcount/'+f.id,
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
            console.log(data);
            if (data.success != true) {
                loader.dismiss();
                this.alertCtrl.create({
                  title: 'Error!',
                  subTitle: data.msj,
                  buttons: ['OK']
                }).present();
            }else{
                localStorage.removeItem("userAuth");
                localStorage.removeItem("userShaOb");
                localStorage.removeItem("userActivity");
                localStorage.setItem('userAuth' , JSON.stringify(data.user));
                localStorage.setItem('userShaOb' , JSON.stringify(data.s_o));
                localStorage.setItem('userActivity' , JSON.stringify(data.act));
                localStorage.setItem('userNewFamy' , JSON.stringify(data.newFamy));
                this.events.publish('editarObjeto');
                loader.dismiss();
                this.alertCtrl.create({
                	title: 'Exito!',
                  	subTitle: data.msj,
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

    resetApp(f){
        let loader: any;
        $.ajax({
            url: this.auth.url+'/resetApp/'+f.id,
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
            console.log(data);
            if (data.success != true) {
                loader.dismiss();
                this.alertCtrl.create({
                  title: 'Error!',
                  subTitle: data.msj,
                  buttons: ['OK']
                }).present();
            }else{
                localStorage.removeItem("userAuth");
                localStorage.removeItem("userShaOb");
                localStorage.removeItem("userActivity");
                localStorage.setItem('userAuth' , JSON.stringify(data.user));
                localStorage.setItem('userShaOb' , JSON.stringify(data.s_o));
                localStorage.setItem('userActivity' , JSON.stringify(data.act));
                this.events.publish('editarObjeto');
                loader.dismiss();
                this.alertCtrl.create({
                    title: 'Exito!',
                      subTitle: data.msj,
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
}
