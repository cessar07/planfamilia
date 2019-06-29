import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController , Events , ToastController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import * as $ from 'jquery';

/**
 * Generated class for the MyInvitationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-invitations',
  templateUrl: 'my-invitations.html',
  providers: [AuthServiceProvider]
})
export class MyInvitationsPage {
	userDetails : any;
	myInvitation : any;
	public f;
    constructor(public toastCtrl: ToastController,public events: Events,public navCtrl: NavController, public navParams: NavParams , public loadingCtrl: LoadingController,public alertCtrl: AlertController , public auth: AuthServiceProvider) {
  		var data = JSON.parse(localStorage.getItem('userAuth'));
  		// var my_i = JSON.parse(localStorage.getItem('myInvitation'));
        this.userDetails = data;
        this.f = this.navParams.get('f');
        // if (!my_i) {
       	// 	let loader: any;
	       //  $.ajax({
	       //      url: this.auth.url+'/searchMyIn/'+this.userDetails.id,
	       //      type: 'GET',
	       //      data:{},
	       //      beforeSend: ()=>{
	       //          loader = this.loadingCtrl.create({
	       //            content: "Buscando",
	       //          });
	       //          loader.present();
	       //      }
	       //  })
	       //  .done((data)=> {
	       //      console.log(data);
	       //      if (data.success != true) {
	       //          loader.dismiss();
	       //          this.alertCtrl.create({
	       //            title: 'Error!',
	       //            subTitle: data.msj,
	       //            buttons: ['OK']
	       //          }).present();
	       //      }else{
	       //      	localStorage.setItem('myInvitation' , JSON.stringify(data.myIn));
	       //      	this.myInvitation = JSON.parse(localStorage.getItem('myInvitation'));
	       //      	$.each(this.myInvitation, (index, val)=> {
			     //        if (val.status == 1) {
			     //            val.statusText = 'Aceptada';
			     //        }
			     //        if (val.status == 2) {
			     //            val.statusText = 'Cancelada';
			     //        }
			     //        if (val.status == 3) {
			     //            val.statusText = 'Rechazada por el usuario';
			     //        }
			     //        if (val.status == 0) {
			     //            val.statusText = 'En espera';
			     //        }
			     //    });
			     //    setTimeout(()=>{
	       //          	loader.dismiss();
			     //    },1000)
	       //      }
	       //  })
	       //  .fail((r)=> {
	       //      loader.dismiss();
	       //          this.alertCtrl.create({
	       //          title: 'Error!',
	       //          subTitle: 'Error al procesar los datos, intente mas tarde',
	       //          buttons: ['OK']
	       //      }).present();
	       //  })
	       //  .always(()=> {
	       //      console.log("complete");
	       //  });
        // }else{
        // 	this.myInvitation = JSON.parse(localStorage.getItem('myInvitation'));

        // 	$.each(this.myInvitation, (index, val)=> {
	       //      if (val.status == 1) {
	       //          val.statusText = 'Aceptada';
	       //      }
	       //      if (val.status == 2) {
	       //          val.statusText = 'Cancelada';
	       //      }
	       //      if (val.status == 3) {
	       //          val.statusText = 'Rechazada por el usuario';
	       //      }
	       //      if (val.status == 0) {
	       //          val.statusText = 'En espera';
	       //      }
	       //  });
        // }

        // this.events.subscribe('editarObjeto',()=>{
        //     this.myInvitation = JSON.parse(localStorage.getItem('myInvitation'));
        // });

        var url = this.auth.url+'/searchFamilyInvi/'+this.f.id;
        let loader: any;
        $.ajax({
            url: url,
            type: 'GET',
            data: {},
            beforeSend: ()=>{
                loader = this.loadingCtrl.create({
                  content: "Buscando invitaciones",
                });
                loader.present();
            }
        })
        .done((data) => {
            if (data.success != true) {
                loader.dismiss();
                this.alertCtrl.create({
                  title: 'Error!',
                  subTitle: data.msj,
                  buttons: ['OK']
                }).present();
            }else{
            	this.f.invis = data.family;
                this.myInvitation = data.family;
                $.each(this.myInvitation, (index, val)=> {
		            if (val.status == 1) {
		                val.statusText = 'Aceptada';
		            }
		            if (val.status == 2) {
		                val.statusText = 'Cancelada';
		            }
		            if (val.status == 3) {
		                val.statusText = 'Rechazada por el usuario';
		            }
		            if (val.status == 0) {
		                val.statusText = 'En espera';
		            }
		        });
                setTimeout(()=>{
                    loader.dismiss();
                } , 1000)
            }
        })
        .fail((r) => {
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

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad MyInvitationsPage');
  	}

  	cancel(p){
  		let loader: any;
        $.ajax({
            url: this.auth.url+'/cancelInvi/'+p.id,
            type: 'GET',
            data:{},
            beforeSend: ()=>{
                loader = this.loadingCtrl.create({
                  content: "Cancelando",
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
            	p.status = 2;
            	p.statusText = 'Cancelada';
               	loader.dismiss();
                this.toastCtrl.create({
                  message: 'Invitación cancelada exitosamente',
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

  	resend(p){
  		let loader: any;
        $.ajax({
            url: this.auth.url+'/resendInvi/'+p.id,
            type: 'GET',
            data:{},
            beforeSend: ()=>{
                loader = this.loadingCtrl.create({
                  content: "Reenviando invitación",
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
            	p.status = 0;
            	p.statusText = 'En espera';
               	loader.dismiss();
                this.toastCtrl.create({
                  message: 'Invitación reenviada exitosamente',
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
