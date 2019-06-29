import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, AlertController, ActionSheetController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import * as $ from 'jquery';
/**
 * Generated class for the FoodCalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-food-calendar',
  templateUrl: 'food-calendar.html',
  providers: [AuthServiceProvider]
})
export class FoodCalendarPage {
	public f;
	tody_date:any;
	food:any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController,public auth: AuthServiceProvider) {
  		this.f = navParams.get('f');
  		var options = {month: "long"};
  		var t_d = new Date();
        this.tody_date = t_d.toLocaleString("es-ES", options);
  		var url = this.auth.url+'/searchFood/'+this.f.id;
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
                this.food = data.food;
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
    console.log('ionViewDidLoad FoodCalendarPage');
  }

} 
