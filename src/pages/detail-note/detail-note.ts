import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, AlertController, ActionSheetController , ToastController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { EditNotePage } from '../edit-note/edit-note';
import { EditlistnotePage } from '../editlistnote/editlistnote';

import * as $ from 'jquery';

/**
 * Generated class for the DetailNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-note',
  templateUrl: 'detail-note.html',
  providers: [AuthServiceProvider]
})
export class DetailNotePage {
	public p;
	userDetails: any;
  	constructor(public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public auth: AuthServiceProvider) {
  		this.p = navParams.get('n');
  		var data = JSON.parse(localStorage.getItem('userAuth'));
        this.userDetails = data;
  		var options = {year: "numeric", month: "long", day: "numeric"};
        var fc = new Date(this.p.created_at);
        this.p.format_create_date = fc.toLocaleString("es-ES", options);
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad DetailNotePage');
  	}

  	editNote(){
        this.navCtrl.push(EditlistnotePage , { 
            n:this.p,
        });
    }

    editNote1(){
        this.navCtrl.push(EditNotePage , { 
            n:this.p,
        });
    }

  	deleteTextNote(){
  		var url = this.auth.url+'/deleteTextNote/'+this.p.id;
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

    deleteNoteN(){
      var url = this.auth.url+'/deleteListNote/'+this.p.id;
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
}
