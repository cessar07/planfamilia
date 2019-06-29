import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, AlertController, ActionSheetController , ToastController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../../pages/home/home';
import * as $ from 'jquery';

/**
 * Generated class for the EditPersonalObPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-personal-ob',
  templateUrl: 'edit-personal-ob.html',
    providers: [AuthServiceProvider]

})
export class EditPersonalObPage { 
	public p;
	public userDetails;
  	constructor(public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController,public auth: AuthServiceProvider) {
  		this.p = navParams.get("p");
  		this.userDetails = navParams.get("userDetails");
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad EditPersonalObPage'); 
  	}

  	goHome(){
  		this.navCtrl.pop();
  	}

  	editPersonalOb(){
  		var url = this.auth.url+'/editPersonalOb';
  		var dat = $('#form_edit_p_o').serialize();
  		let loader : any;
  		console.log(dat);
  		$.ajax({
			url: url,
			type: 'POST',
			data: dat,
			beforeSend: ()=>{
                loader = this.loadingCtrl.create({
                  content: "Editando",
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
				/*let parametro = */localStorage.setItem('userPerOb' , JSON.stringify(data.p_o));
				this.events.publish('editarObjeto');
				loader.dismiss();
    			this.toastCtrl.create({
                  message: data.msj,
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
	      	title: 'Seguro de eliminar este objetivo personal?',
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
}