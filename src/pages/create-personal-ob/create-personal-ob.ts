import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Events, LoadingController, AlertController , ToastController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import * as $ from 'jquery';

/**
 * Generated class for the CreatePersonalObPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-personal-ob',
  templateUrl: 'create-personal-ob.html',
  providers: [AuthServiceProvider]
})
export class CreatePersonalObPage {
	userDetails: any;
	myDate: any;
    testCheckboxOpen :any;
    testCheckboxResult :any = [];
    days_repeat :any = [
        'Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'
    ];
  	constructor(public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController, public auth: AuthServiceProvider) {
		var data = JSON.parse(localStorage.getItem('userAuth'));
		if(data){
	    	this.userDetails = data;
		}
  	}
  	goHome(){
  		this.navCtrl.pop();
  	}
  	ionViewDidLoad() {  
    	console.log('ionViewDidLoad CreatePersonalObPage');
  	}
  	addPersonalOb(){
  		var url = this.auth.url+'/addPersonalOb';
  		var dat = $('#form_add_p_o').serialize();
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
				localStorage.removeItem("userPerOb");
				localStorage.setItem('userPerOb' , JSON.stringify(data.p_o));
				this.events.publish('editarObjeto');
				loader.dismiss();
                this.toastCtrl.create({
                  message: 'Objetivo personal registrado exitosamente',
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

    // showCheckbox() {
    //     let alert = this.alertCtrl.create();
    //     alert.setTitle('¿Qué días se repetira este objetivo?');
    //     for (let i = 0; i < 7; ++i) {
    //         if (this.testCheckboxResult.indexOf(i+1) != -1) {
    //             alert.addInput({
    //                 type: 'checkbox',
    //                 label: this.days_repeat[i],
    //                 value: i+1,
    //                 checked: true
    //             });
    //         }else{
    //             alert.addInput({
    //                 type: 'checkbox',
    //                 label: this.days_repeat[i],
    //                 value: i+1,
    //             });
    //         }
    //     }

    //     alert.addButton({
    //         text: 'Cancelar',
    //         handler : data =>{
    //             data = [];
    //             this.testCheckboxResult = data;
    //             // console.log('Checkbox data:', data);
    //         }
    //     });
    //     alert.addButton({
    //         text: 'Seleccionar',
    //         handler: data => {
    //             // console.log('Checkbox data:', data);
    //             this.testCheckboxOpen = false;
    //             this.testCheckboxResult = data;
    //         }
    //     });
    //     alert.present();
    // }
}
