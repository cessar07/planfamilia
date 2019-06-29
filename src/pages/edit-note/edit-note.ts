import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, AlertController, ActionSheetController , ToastController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';

import * as $ from 'jquery';

/**
 * Generated class for the EditNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-note',
  templateUrl: 'edit-note.html',
    providers: [AuthServiceProvider]

})
export class EditNotePage {
	public n;
	userFamilies:any;
    userFamilyExt:any;
    family_r: any = [];
    userDetails: any;
  	constructor(public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public auth: AuthServiceProvider) {
        this.n = navParams.get("n");
        var data = JSON.parse(localStorage.getItem('userAuth'));
        var dat2 = JSON.parse(localStorage.getItem('userFamilyExt'));
        var fam = JSON.parse(localStorage.getItem('userFamilies'));
        this.userFamilyExt = dat2;
        this.userFamilies = fam;
        this.userDetails = data;

        $.each(this.n.family, (index, val)=> {
           $.each(this.userFamilies, (index2, val2)=> {
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
       	console.log(this.family_r);
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad EditNotePage');
  	}

  	updateCucumber(f){
        if (f.status_select != true) {
            $.each(this.family_r, (index, val)=> {
                if(f.id == val){
                    this.family_r.splice(index, 1);
                    console.log(this.family_r);
                }
            });
        }else{
            this.family_r.push(f.id);
            console.log(this.family_r);
        }
    }

  	editTextNote(){
  		var url = this.auth.url+'/editTextNote';
  		var dat = $('#form_edit_note').serialize();
  		console.log(dat);
  		let loader : any;
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
				localStorage.removeItem("userNotes"); 
				/*let parametro = */localStorage.setItem('userNotes' , JSON.stringify(data.notes));

				// this.events.publish('editarObjeto',(parametro)); puedes usarlo asi y pasar el parametro
				this.events.publish('editarObjeto');
				loader.dismiss();
    			this.toastCtrl.create({
                  message: 'Nota de texto editada exitosamente',
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

  	deleteTextNote(){
  		var url = this.auth.url+'/deleteTextNote/'+this.n.id;
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
				localStorage.removeItem("userNotes");
				localStorage.setItem('userNotes' , JSON.stringify(data.notes));

				// this.events.publish('editarObjeto',(parametro)); puedes usarlo asi y pasar el parametro
				this.events.publish('editarObjeto');

				loader.dismiss();
    			this.toastCtrl.create({
                  message: 'Nota de texto eliminada exitosamente',
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

  	delNote(){
  		this.actionSheetCtrl.create({
	      	title: 'Seguro de eliminar esta nota de texto?',
	      	buttons: [
	        	{
	          		text: 'Confirmar',
	          		role: 'destructive',
	          		handler: () => {
	            		this.deleteTextNote();
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
