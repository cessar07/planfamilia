import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Events , ToastController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import * as $ from 'jquery';

/**
 * Generated class for the InvitationsMyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invitations-my',
  templateUrl: 'invitations-my.html',
  providers: [AuthServiceProvider]
})
export class InvitationsMyPage {
	userDetails : any;
	InvitationMy : any;
    constructor(public toastCtrl: ToastController,public events: Events,public navCtrl: NavController, public navParams: NavParams , public loadingCtrl: LoadingController,public alertCtrl: AlertController , public auth: AuthServiceProvider) {
  		var data = JSON.parse(localStorage.getItem('userAuth'));
  		var in_m = JSON.parse(localStorage.getItem('InvitationMy'));
        this.userDetails = data;

        if (!in_m) {
       		let loader: any;
	        $.ajax({
	            url: this.auth.url+'/searchInmy/'+this.userDetails.id,
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
	            	localStorage.setItem('InvitationMy' , JSON.stringify(data.inMy));
	            	this.InvitationMy = JSON.parse(localStorage.getItem('InvitationMy'));
	            	$.each(this.InvitationMy, (index, val)=> {
			            if (val.status == 1) {
			                val.statusText = 'Aceptada';
			            }
			            if (val.status == 2) {
			                val.statusText = 'Cancelada por el usuario';
			            }
			            if (val.status == 3) {
			                val.statusText = 'Rechazada';
			            }
			            if (val.status == 0) {
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
        	this.InvitationMy = JSON.parse(localStorage.getItem('InvitationMy'));

        	$.each(this.InvitationMy, (index, val)=> {
	            if (val.status == 1) {
	                val.statusText = 'Aceptada';
	            }
	            if (val.status == 2) {
	                val.statusText = 'Cancelada Por el usuario';
	            }
	            if (val.status == 3) {
	                val.statusText = 'Rechazada';
	            }
	            if (val.status == 0) {
	                val.statusText = 'En espera';
	            }
	        });
        }

        this.events.subscribe('editarObjeto',()=>{
            this.InvitationMy = JSON.parse(localStorage.getItem('InvitationMy'));
            $.each(this.InvitationMy, (index, val)=> {
                if (val.status == 1) {
                    val.statusText = 'Aceptada';
                }
                if (val.status == 2) {
                    val.statusText = 'Cancelada Por el usuario';
                }
                if (val.status == 3) {
                    val.statusText = 'Rechazada';
                }
                if (val.status == 0) {
                    val.statusText = 'En espera';
                }
            });
        })
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad InvitationsMyPage');
  	}

  	Rech(p){
  		let loader: any;
        $.ajax({
            url: this.auth.url+'/rechInvi/'+p.id,
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
                localStorage.removeItem("InvitationMy");
                localStorage.setItem('InvitationMy' , JSON.stringify(data.inMy));
                p.status = 3;
                p.statusText = 'Rechazada';
               	loader.dismiss();
                this.toastCtrl.create({
                  message: 'Invitación rechazada exitosamente',
                  duration: 3000
                }).present();
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
            url: this.auth.url+'/aceptInvi/'+p.id,
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
            	localStorage.removeItem("InvitationMy");
                localStorage.setItem('InvitationMy' , JSON.stringify(data.inMy));
                localStorage.removeItem("userFamilyExt");
                localStorage.setItem('userFamilyExt' , JSON.stringify(data.family_ext));
                p.status = 1;
                p.statusText = 'Aceptada';
                this.events.publish('editarObjeto');
               	loader.dismiss();
                this.toastCtrl.create({
                  message: 'Invitación aceptada exitosamente',
                  duration: 3000
                }).present();
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
