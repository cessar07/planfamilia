import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, AlertController, ActionSheetController , ToastController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import * as $ from 'jquery';


/**
 * Generated class for the CreateNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-note',
  templateUrl: 'create-note.html',
    providers: [AuthServiceProvider]

})
export class CreateNotePage {
	userDetails: any;
    userFamilies:any;
    userFamilyExt:any;
    family_r: any = [];
  	constructor(public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public auth: AuthServiceProvider) {
  		var data = JSON.parse(localStorage.getItem('userAuth'));
        var dat2 = JSON.parse(localStorage.getItem('userFamilyExt'));
        var fam = JSON.parse(localStorage.getItem('userFamilies'));
        this.userFamilyExt = dat2;
        this.userFamilies = fam;
		if(data){
	    	this.userDetails = data;
		}
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad CreateNotePage');
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
    
  	addTextNote(){
  		var url = this.auth.url+'/addTextNote'; 
  		var dat = $('#form_add_note').serialize();
  		let loader : any;
  		$.ajax({
			url: url,
			type: 'POST',
			data: dat,
			beforeSend: ()=>{
                loader = this.loadingCtrl.create({
                  content: "Registrando",
                });
                loader.present();
            }
		})
		.done((data) => {
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
				this.events.publish('editarObjeto');
				loader.dismiss();
				// this.alertCtrl.create({
    //               title: 'Exito!',
    //               subTitle: 'Nota de texto registrada exitosamente',
    //               buttons: ['OK']
    //             }).present();
                this.toastCtrl.create({
                  message: 'Nota de texto registrada exitosamente',
                  duration: 3000
                }).present(); 
				this.navCtrl.pop();
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

    toggle(f){
        $('.no_s_'+f.id).toggle();
    }
}
