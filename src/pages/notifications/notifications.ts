import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Events, LoadingController, AlertController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import * as $ from 'jquery';
/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
        providers: [AuthServiceProvider]
})
export class NotificationsPage {
 	userDetails : any;
	userNotifications : any;
	skipNot : any = 0;
	options : any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController, public auth: AuthServiceProvider) {
  		var data = JSON.parse(localStorage.getItem('userAuth'));
        var not = JSON.parse(localStorage.getItem('userNotifications'));
        this.userDetails = data;
        this.options = {year: "numeric", month: "short", day: "numeric"};
        if (!not) {
        	let loader : any;
            $.ajax({
                url: this.auth.url+'/searchNotifications/'+this.userDetails.id,
                type: 'GET',
                data: {},
                beforeSend: ()=>{
                    loader = this.loadingCtrl.create({
                      content: "Buscando",
                    });
                    loader.present();
                }
            })
            .done((data) => {
                localStorage.setItem('userNotifications' , JSON.stringify(data.noti));
                this.userNotifications = JSON.parse(localStorage.getItem('userNotifications'));
                $.each(this.userNotifications, (index, val)=> {
	                var f = new Date(val.created_at);
	                val.format_date = f.toLocaleString("es-ES", this.options);
	            });
                this.events.publish('editarObjeto');
                this.skipNot = 20;
                loader.dismiss();
            })
            .fail(()=> {
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
        }else{
        	this.userNotifications = not;
        	$.each(this.userNotifications, (index, val)=> {
                var f = new Date(val.created_at);
                val.format_date = f.toLocaleString("es-ES", this.options);
            });
        	this.skipNot = 20;
        }

        this.events.subscribe('editarObjeto',()=>{
            this.userNotifications = JSON.parse(localStorage.getItem('userNotifications'));
            $.each(this.userNotifications, (index, val)=> {
                var f = new Date(val.created_at);
                val.format_date = f.toLocaleString("es-ES", this.options);
            });
        });
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad NotificationsPage');
  	}

  	showMore(){
        let loader : any;
        $.ajax({
            url: this.auth.url+'/showMoreNotifications/'+this.userDetails.id+'/'+this.skipNot,
            type: 'GET',
            data: {},
            beforeSend: ()=>{
                loader = this.loadingCtrl.create({
                  content: "Buscando",
                });
                loader.present();
            }
        })
        .done((data) => {
            if (data.count < 1) {
                loader.dismiss();
                $('.no_s').hide();
                this.alertCtrl.create({
                    title: 'Oops!',
                    subTitle: 'No hay mas resultados para mostrar',
                    buttons: ['OK']
                }).present();
            }else{
                let not = JSON.parse(JSON.stringify(data.noti));
                $.each(not, (index, val)=> {
                    var f = new Date(val.created_at);
                    val.format_date = f.toLocaleString("es-ES", this.options);
                    this.userNotifications.push(val);
                });
                this.skipNot = this.skipNot + 20;
                console.log(this.skipNot);
            }
            setTimeout(()=>{
                loader.dismiss();
            }, 1000)
        })
        .fail(()=> {
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
}
