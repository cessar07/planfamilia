import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, AlertController, ActionSheetController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import * as $ from 'jquery';
/**
 * Generated class for the DetailHourPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-hour',
  templateUrl: 'detail-hour.html',
  providers: [AuthServiceProvider]
})
export class DetailHourPage {
	public f;
    h:any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController,public auth: AuthServiceProvider) {
  		this.f = navParams.get('f');
        var url = this.auth.url+'/searchHour/'+this.f.id;
        let loader : any;
        $.ajax({
            url: url,
            type: 'GET',
            data: {},
            beforeSend: ()=>{
                loader = this.loadingCtrl.create({
                  content: "Buscando informacón escolar",
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
                this.f.schoolInfo = data.school;
                this.h = data.hour;
                loader.dismiss();
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

  	ionViewDidLoad() { 
    	console.log('ionViewDidLoad DetailHourPage');
  	}

}
