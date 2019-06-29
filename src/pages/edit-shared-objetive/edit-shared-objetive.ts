import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, AlertController, ActionSheetController , ToastController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import * as $ from 'jquery';


/**
 * Generated class for the EditSharedObjetivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-shared-objetive',
  templateUrl: 'edit-shared-objetive.html',
    providers: [AuthServiceProvider]

})
export class EditSharedObjetivePage {
	public s;
	userFamily : any;
    userFamilyExt : any;
	family_r : any = [];
  	constructor(public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public auth: AuthServiceProvider) {
  		this.s = navParams.get("s");
  		var dat = JSON.parse(localStorage.getItem('userFamilies'));
        var dat2 = JSON.parse(localStorage.getItem('userFamilyExt'));
  		this.userFamily = dat;
        this.userFamilyExt = dat2;

        $.each(this.s.family, (index, val)=> {
            $.each(this.userFamily, (index2, val2)=> {
                $.each(val2.family, (index3, val3)=> {
                    if (val3.user_to == val.family_id) {
                        this.family_r.push(val3.userInfo.id); 
                    }
                });
                $.each(val2.familyOther, (index3, val3)=> {
                    if (val3.id == val.family_id) {
                        this.family_r.push(val3.id);
                    }
                });
            });
            $.each(this.userFamilyExt, (index2, val2)=> {
                if (val2.adminInfo.id == val.family_id) {
                    this.family_r.push(val2.adminInfo.id);
                }
                $.each(val2.family, (index3, val3)=> {
                    if (val3.userInfo.id == val.family_id) {
                        this.family_r.push(val3.userInfo.id);
                    }
                });
                $.each(val2.familyOther, (index3, val3)=> {
                    if (val3.id == val.family_id) {
                        this.family_r.push(val3.id);
                    }
                });
            });
        });
        // console.log(this.userFamily);
  	}

  	updateCucumber(f){
        if (this.family_r.indexOf(f.id) != -1) {
            this.family_r.splice(this.family_r.indexOf(f.id), 1);
        }else{
            this.family_r.push(f.id); 
        }
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad EditSharedObjetivePage');
  	}

  	editSharedOb(){
  		var url = this.auth.url+'/editSharedOb';
  		var dat = $('#form_edit_s_o').serialize(); 
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
				localStorage.removeItem("userShaOb"); 
				localStorage.setItem('userShaOb' , JSON.stringify(data.s_o));
				this.events.publish('editarObjeto');
				loader.dismiss();
                this.toastCtrl.create({
                  message: data.msj,
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

    deleteShaOb(){
        var url = this.auth.url+'/deleteShaOb/'+this.s.id;
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
                localStorage.removeItem("userShaOb");
                localStorage.setItem('userShaOb' , JSON.stringify(data.s_o));
                this.events.publish('editarObjeto');
                loader.dismiss();
                this.toastCtrl.create({
                  message: 'Objetivo compartido eliminado exitosamente',
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

    ShaOb(){
        this.actionSheetCtrl.create({
            title: 'Seguro de eliminar este objetivo compartido?',
            buttons: [
                {
                    text: 'Confirmar',
                    role: 'destructive',
                    handler: () => {
                        this.deleteShaOb();
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

    toggle(f){
        $('.no_s_'+f.id).toggle();
    }
}
