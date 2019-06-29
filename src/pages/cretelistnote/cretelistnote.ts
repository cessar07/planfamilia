import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Events, LoadingController, AlertController , ToastController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import * as $ from 'jquery';

/**
 * Generated class for the CretelistnotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cretelistnote',
  templateUrl: 'cretelistnote.html',
    providers: [AuthServiceProvider]

})
export class CretelistnotePage {
	userDetails : any;
	userListNotes : any;
	items : any = [];
	item_name_input:any;
    userFamilies:any;
    userFamilyExt:any;
    family_r: any = [];
  	constructor(public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController,public auth: AuthServiceProvider) {
  		var data = JSON.parse(localStorage.getItem('userAuth'));
        var not = JSON.parse(localStorage.getItem('userListNotes'));
        var dat2 = JSON.parse(localStorage.getItem('userFamilyExt'));
        var fam = JSON.parse(localStorage.getItem('userFamilies'));
        this.userDetails = data;
        this.userListNotes = not;
        this.userFamilyExt = dat2;
        this.userFamilies = fam;
        this.events.subscribe('editarObjeto',(/*parametro*/)=>{
            // this.userPerOb = parametro
            this.userListNotes = JSON.parse(localStorage.getItem('userListNotes'));
        })
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad CretelistnotePage');
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

    addListNote(){
    	var url = this.auth.url+'/addListNotes';
  		var dat = $('#form_add_list_note').serialize();
  		let loader: any;
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
				localStorage.removeItem("userListNotes");
				localStorage.setItem('userListNotes' , JSON.stringify(data.list_notes));
				this.events.publish('editarObjeto');
				loader.dismiss();
                this.toastCtrl.create({
                  message: 'Objetivo compartido registrado exitosamente',
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
