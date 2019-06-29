import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, AlertController, ActionSheetController , ToastController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { EditActivityPage } from '../edit-activity/edit-activity';
import { DetailActivityPage } from '../detail-activity/detail-activity';
import { HomePage } from '../home/home';

import * as $ from 'jquery';

/**
 * Generated class for the ViewActivitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-activities',
  templateUrl: 'view-activities.html',
      providers: [AuthServiceProvider]

})
export class ViewActivitiesPage {
	public act;
	public day;
	date : any;
  	constructor(public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController,public auth: AuthServiceProvider) {
  		this.act = JSON.parse(navParams.get('act'));
  		this.day = navParams.get('day');
  		var d = new Date(this.day);
  		this.date = d.toLocaleDateString();
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad ViewActivitiesPage');
  	}
  	
  	editAct(p){
  		this.navCtrl.push(EditActivityPage , {
  			a:p
  		})
  	}

  	viewAct(p){
  		this.navCtrl.push(DetailActivityPage , {
            a:p
        });
  	}

  	deleteActivity(id){
        var url = this.auth.url+'/deleteActivity/'+id;
        let loader : any;
        $.ajax({
            url: url,
            type: 'GET',
            data: {},
            beforeSend: ()=>{
                loader = this.loadingCtrl.create({
                  content: "Eliminando",
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
                localStorage.removeItem("userActivity");
                localStorage.setItem('userActivity' , JSON.stringify(data.act));
                this.events.publish('editarObjeto');
                loader.dismiss();
                this.toastCtrl.create({
                  message: 'Actividad eliminada exitosamente',
                  duration: 3000
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

  	deleteAct(p){
        this.actionSheetCtrl.create({
            title: 'Seguro de eliminar esta actividad?',
            buttons: [
                {
                    text: 'Confirmar',
                    role: 'destructive',
                    handler: () => {
                        this.deleteActivity(p.id);
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
}
