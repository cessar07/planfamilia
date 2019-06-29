import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, AlertController, ActionSheetController , ToastController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { EditPersonalObPage }    from '../edit-personal-ob/edit-personal-ob';

import * as $ from 'jquery';

/**
 * Generated class for the DetailPErsonalObPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage() 
@Component({
  selector: 'page-detail-p-ersonal-ob',
  templateUrl: 'detail-p-ersonal-ob.html',
    providers: [AuthServiceProvider]

})
export class DetailPErsonalObPage {
	public p;
	options:any;
    userDetails:any;
  	constructor(public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController,public auth: AuthServiceProvider) {
  		this.p = navParams.get("p");
        var data = JSON.parse(localStorage.getItem('userAuth'));
        this.userDetails = data;
  		this.options = {year: "numeric", month: "long", day: "numeric"};
  		var f = new Date(this.p.limit_date+' '+this.p.limit_hour);
        this.p.format_date = f.toLocaleString("es-ES", this.options);

        var fc = new Date(this.p.created_at);
        this.p.format_create_date = fc.toLocaleString("es-ES", this.options);

        if(this.p.status == 0){
        	this.p.statusText = 'Pendiente';
        }else{
        	this.p.statusText = 'Superado';
        }

        if (this.p.complete_date) {
        	var f2 = new Date(this.p.complete_date+' 00:00:00');
        	this.p.format_complete_date = f2.toLocaleString("es-ES", this.options);
        }else{
        	this.p.format_complete_date = 'Sin registro';
        }

        if(this.p.repeat_type == 0){
        	this.p.period = 'No repetir';
        }
        if(this.p.repeat_type == 1){
        	this.p.period = 'Repetir Todos los dias (Lun - Dom)';
        }
        if(this.p.repeat_type == 2){
        	this.p.period = 'Repetir cada semana';
        }
        if(this.p.repeat_type == 3){
        	this.p.period = 'Repetir cada mes';
        }
        if(this.p.repeat_type == 4){
        	this.p.period = 'Repetir cada año';
        }
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad DetailPErsonalObPage');
  	}

  	deletePerOb(){
  		var url = this.auth.url+'/deletePerOb/'+this.p.id;
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
				localStorage.removeItem("userPerOb");
				localStorage.setItem('userPerOb' , JSON.stringify(data.p_o));

				// this.events.publish('editarObjeto',(parametro)); puedes usarlo asi y pasar el parametro
				this.events.publish('editarObjeto');
				loader.dismiss();
                this.toastCtrl.create({
                  message: 'Objetivo personal eliminado exitosamente',
                  duration: 3000
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

  	PerOb(){
  		this.actionSheetCtrl.create({
	      	title: 'Seguro de eliminar este objetivo personal',
	      	buttons: [
	        	{
	          		text: 'Confirmar',
	          		role: 'destructive',
	          		handler: () => {
	            		this.deletePerOb();
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

    editOb(){
        this.navCtrl.push(EditPersonalObPage , {
            p:this.p,
            userDetails:this.userDetails
        });
    }

}
