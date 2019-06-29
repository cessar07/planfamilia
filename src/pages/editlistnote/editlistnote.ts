import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, AlertController, ActionSheetController , ToastController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';

import * as $ from 'jquery';

/**
 * Generated class for the EditlistnotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editlistnote',
  templateUrl: 'editlistnote.html',
    providers: [AuthServiceProvider]

})
export class EditlistnotePage {
	userListNotes : any;
	items : any = []; 
	item_name_input:any;
	public n;
    userFamilies:any;
    userFamilyExt:any;
    family_r: any = [];
    userDetails: any;
  	constructor(public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public auth: AuthServiceProvider) {
  		this.n = navParams.get("n");
        this.events.subscribe('editarObjeto',(/*parametro*/)=>{
            // this.userPerOb = parametro
            this.userListNotes = JSON.parse(localStorage.getItem('userListNotes'));
        });

        $.each(this.n.itemms, (index, val)=> {
			this.items.push(val.item);
		});

        var dat2 = JSON.parse(localStorage.getItem('userFamilyExt'));
        var fam = JSON.parse(localStorage.getItem('userFamilies'));
        var data = JSON.parse(localStorage.getItem('userAuth'));
        this.userDetails = data;
        this.userFamilyExt = dat2;
        this.userFamilies = fam;

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
    	console.log('ionViewDidLoad EditlistnotePage');
  	}

    updateCucumber(f){
        if (this.family_r.indexOf(f.id) != -1) {
            this.family_r.splice(this.family_r.indexOf(f.id), 1);
        }else{
            this.family_r.push(f.id); 
        }
    }

  	addItem(){
        if (this.item_name_input != '') {
        	this.items.push(this.item_name_input);
        }
        this.item_name_input = '';
        console.log(this.item_name_input);
    }

    borrarItem(i){
        this.items.splice(i,1);
    }

    editListNote(){
    	var url = this.auth.url+'/editListNotes';
  		var dat = $('#form_edit_list_note').serialize();
  		let loader: any;
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
		.done((data) => {
			if (data.success != true) {
				loader.dismiss();
                this.alertCtrl.create({
                  title: 'Error!',
                  subTitle: data.msj,
                  buttons: ['OK']
                }).present();
			}else{
				localStorage.removeItem("userListNotes");
				localStorage.setItem('userListNotes' , JSON.stringify(data.list_notes));
				this.events.publish('editarObjeto');
				loader.dismiss();
    			this.toastCtrl.create({
                  message: 'Nota tipo lista editada exitosamente',
                  duration: 3000
                }).present();
				this.navCtrl.setRoot(HomePage);
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

    deleteNoteN(){
  		var url = this.auth.url+'/deleteListNote/'+this.n.id;
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
				localStorage.removeItem("userListNotes");
				localStorage.setItem('userListNotes' , JSON.stringify(data.list_notes));
				this.events.publish('editarObjeto');
				loader.dismiss();
    			this.toastCtrl.create({
                  message: 'Nota eliminada exitosamente',
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

    deleteNote(){
    	this.actionSheetCtrl.create({
	      	title: 'Seguro de eliminar esta nota?',
	      	buttons: [
	        	{
	          		text: 'Confirmar',
	          		role: 'destructive',
	          		handler: () => {
	            		this.deleteNoteN();
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
