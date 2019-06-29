import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, AlertController, ActionSheetController , ToastController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import * as $ from 'jquery';

/**
 * Generated class for the DetailSharedObjetivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({ 
  selector: 'page-detail-shared-objetive',
  templateUrl: 'detail-shared-objetive.html',
    providers: [AuthServiceProvider]

})
export class DetailSharedObjetivePage {
	public s;
	userFamily : any;
    userFamilyExt : any;
	family_r : any = [];
    options:any;
    userDetails : any;
    res:any;
  	constructor(public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController,public auth: AuthServiceProvider) {
  		this.s = navParams.get("s");
  		var dat = JSON.parse(localStorage.getItem('userFamilies'));
        var dt = JSON.parse(localStorage.getItem('userAuth'));
        var dat2 = JSON.parse(localStorage.getItem('userFamilyExt'));
        var da2 = JSON.parse(localStorage.getItem('userResponsable2'));
  		this.userFamily = dat;
        this.userFamilyExt = dat2;
        this.userDetails = dt;

        if (da2) {
            this.res = da2;
        }

        if (this.userDetails.younger != 1) {
      		$.each(this.s.family, (index, val)=> {
    			$.each(this.userFamily, (index2, val2)=> {
    				if (val2.id === val.family_id) {
      					this.family_r.push(val2);
    				}
    			});
    		});

            $.each(this.s.family, (index, val)=> {
                $.each(this.userFamilyExt, (index2, val2)=> {
                    if (val2.id === val.family_id) {
                        this.family_r.push(val2);
                    }
                });
            }); 

            if (this.s.user_id != this.userDetails.id) {
                $.each(this.userFamily, (index2, val2)=> {
                    $.each(val2.family, (index3, val3)=> {
                        if (val3.user_to == this.s.user_id) {
                            this.s.act_res = val3.userInfo;
                        }
                    });
                    $.each(val2.familyOther, (index3, val3)=> {
                        if (val3.id == this.s.user_id) {
                            this.s.act_res = val3;
                        }
                    });
                });
                $.each(this.userFamilyExt, (index2, val2)=> {
                    if (val2.adminInfo.id == this.s.user_id) {
                        this.s.act_res = val2.adminInfo;
                    }
                    $.each(val2.family, (index3, val3)=> {
                        if (val3.userInfo.id == this.s.user_id) {
                            this.s.act_res = val3.userInfo;
                        }
                    });
                    $.each(val2.familyOther, (index3, val3)=> {
                        if (val3.id == this.s.user_id) {
                            this.s.act_res = val3;
                        }
                    });
                });
            }
        }

        this.options = {year: "numeric", month: "long", day: "numeric"};
        var fc = new Date(this.s.created_at);
        this.s.format_create_date = fc.toLocaleString("es-ES", this.options);

        var f = new Date(this.s.limit_date+' '+this.s.limit_hour);
        this.s.format_date = f.toLocaleString("es-ES", this.options);

        if(this.s.status == 0){
            this.s.statusText = 'Pendiente';
        }else{
            this.s.statusText = 'Superado';
        }

        if (this.s.complete_date) {
            var f2 = new Date(this.s.complete_date+' 00:00:00');
            this.s.format_complete_date = f2.toLocaleString("es-ES", this.options);
        }else{
            this.s.format_complete_date = 'Sin registro';
        }

        if(this.s.repeat_type == 0){
            this.s.period = 'No repetir';
        }
        if(this.s.repeat_type == 1){
            this.s.period = 'Repetir Todos los dias (Lun - Dom)';
        }
        if(this.s.repeat_type == 2){
            this.s.period = 'Repetir cada semana';
        }
        if(this.s.repeat_type == 3){
            this.s.period = 'Repetir cada mes';
        }
        if(this.s.repeat_type == 4){
            this.s.period = 'Repetir cada año';
        }
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad DetailSharedObjetivePage');
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
}
