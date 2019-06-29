import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Events , ToastController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';

import * as $ from 'jquery';

/**
 * Generated class for the YoungerInviPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-younger-invi',
  templateUrl: 'younger-invi.html',
})
export class YoungerInviPage {
	userDetails : any;
	InvitationYounger : any;
    constructor(public toastCtrl: ToastController,public events: Events,public navCtrl: NavController, public navParams: NavParams , public loadingCtrl: LoadingController,public alertCtrl: AlertController , public auth: AuthServiceProvider) {
  		var data = JSON.parse(localStorage.getItem('userAuth'));
  		var in_y = JSON.parse(localStorage.getItem('InvitationYounger'));
        this.userDetails = data;

        if (!in_y) {
        	let loader: any;
	        $.ajax({
	            url: this.auth.url+'/searchInYounger/'+this.userDetails.id,
	            type: 'GET',
	            data:{},
	            beforeSend: ()=>{ 
	                loader = this.loadingCtrl.create({
	                  content: "Buscando",
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
	            	localStorage.setItem('InvitationYounger' , JSON.stringify(data.y));
	            	this.InvitationYounger = JSON.parse(localStorage.getItem('InvitationYounger'));
	            	$.each(this.InvitationYounger, (index, val)=> { 
			            if (val.responsable_status == 1) {
			                val.statusText = 'Aceptada';
			            }
			            if (val.responsable_status == 2) {
			                val.statusText = 'Cancelada por el usuario';
			            }
			            if (val.responsable_status == 3) {
			                val.statusText = 'Rechazada';
			            }
			            if (val.responsable_status == 0) {
			                val.statusText = 'En espera';
			            }
			        });
			        setTimeout(()=>{
	                	loader.dismiss();
			        },1000)
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
        }else{
        	this.InvitationYounger = JSON.parse(localStorage.getItem('InvitationYounger'));

        	$.each(this.InvitationYounger, (index, val)=> {
	            if (val.responsable_status == 1) {
	                val.statusText = 'Aceptada';
	            }
	            if (val.responsable_status == 2) {
	                val.statusText = 'Cancelada Por el usuario';
	            }
	            if (val.responsable_status == 3) {
	                val.statusText = 'Rechazada';
	            }
	            if (val.responsable_status == 0) {
	                val.statusText = 'En espera';
	            }
	        });
        }

        this.events.subscribe('editarObjeto',()=>{
            this.InvitationYounger = JSON.parse(localStorage.getItem('InvitationYounger'));
            $.each(this.InvitationYounger, (index, val)=> {
                if (val.responsable_status == 1) {
                    val.statusText = 'Aceptada';
                }
                if (val.responsable_status == 2) {
                    val.statusText = 'Cancelada Por el usuario';
                }
                if (val.responsable_status == 3) {
                    val.statusText = 'Rechazada';
                }
                if (val.responsable_status == 0) {
                    val.statusText = 'En espera';
                }
            });
        })
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad YoungerInviPage'); 
  	}

  	Rech(p){
  		let loader: any;
        $.ajax({
            url: this.auth.url+'/rechYoung/'+p.id,
            type: 'GET',
            data:{},
            beforeSend: ()=>{
                loader = this.loadingCtrl.create({
                  content: "Rechazando",
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
                localStorage.removeItem("InvitationYounger");
                localStorage.setItem('InvitationYounger' , JSON.stringify(data.y));
                p.status = 3;
                p.statusText = 'Rechazada';
               	loader.dismiss();
                this.toastCtrl.create({
                  message: 'Invitación rechazada exitosamente',
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

  	Acep(p){
  		let loader: any;
        $.ajax({
            url: this.auth.url+'/aceptYoung/'+p.id,
            type: 'GET',
            data:{},
            beforeSend: ()=>{
                loader = this.loadingCtrl.create({
                  content: "Aceptando",
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
                localStorage.removeItem("InvitationYounger");
                localStorage.setItem('InvitationYounger' , JSON.stringify(data.y));
                localStorage.removeItem("userActivity");
                p.status = 1;
                p.statusText = 'Aceptada';
               	loader.dismiss();
                this.toastCtrl.create({
                  message: 'Invitación aceptada exitosamente',
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
}
