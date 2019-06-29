import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, AlertController, ActionSheetController , ToastController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { EditActivityPage } from '../../pages/edit-activity/edit-activity';
import { HomePage } from '../../pages/home/home';


import * as $ from 'jquery';
 
/**
 * Generated class for the DetailActivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-activity',
  templateUrl: 'detail-activity.html',
        providers: [AuthServiceProvider]

})
export class DetailActivityPage {
	public p;
    userFamily: any;
    userFamilyExt: any;
    family_shared :any = [];
    options:any;
    userDetails:any;
    res:any; 
  	constructor(public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController,public auth: AuthServiceProvider) {
  		this.p   = navParams.get('a');
        var dat  = JSON.parse(localStorage.getItem('userFamilies'));
        var dat2 = JSON.parse(localStorage.getItem('userFamilyExt'));
        var da   = JSON.parse(localStorage.getItem('userAuth'));
        var da2  = JSON.parse(localStorage.getItem('userResponsable2'));
        this.userFamily = dat;
        this.userFamilyExt = dat2;
        this.userDetails = da; 

        if (da2) {
            this.res = da2;
        }

        if (this.p.user_id != this.userDetails.id) {
            $.each(this.userFamily, (index2, val2)=> {
                $.each(val2.family, (index3, val3)=> {
                    if (val3.user_to == this.p.user_id) {
                        this.p.act_res = val3.userInfo;
                    }
                });
                $.each(val2.familyOther, (index3, val3)=> {
                    if (val3.id == this.p.user_id) {
                        this.p.act_res = val3;
                    }
                });
            });
            $.each(this.userFamilyExt, (index2, val2)=> {
                if (val2.adminInfo.id == this.p.user_id) {
                    this.p.act_res = val2.adminInfo;
                }
                $.each(val2.family, (index3, val3)=> {
                    if (val3.userInfo.id == this.p.user_id) {
                        this.p.act_res = val3.userInfo;
                    }
                });
                $.each(val2.familyOther, (index3, val3)=> {
                    if (val3.id == this.p.user_id) {
                        this.p.act_res = val3;
                    }
                });
            });
        }

        $.each(this.p.shared, (index, val)=> {
            $.each(this.userFamily, (index2, val2)=> {
                $.each(val2.family, (index3, val3)=> {
                    if (val3.user_to == val.family_id) {
                        this.family_shared.push(val3.userInfo);
                    }
                });
                $.each(val2.familyOther, (index3, val3)=> {
                    if (val3.id == val.family_id) {
                        this.family_shared.push(val3);
                    }
                });
            });
            $.each(this.userFamilyExt, (index2, val2)=> {
                if (val2.adminInfo.id == val.family_id) {
                    this.family_shared.push(val2.adminInfo);
                }
                $.each(val2.family, (index3, val3)=> {
                    if (val3.userInfo.id == val.family_id) {
                        this.family_shared.push(val3.userInfo);
                    }
                });
                $.each(val2.familyOther, (index3, val3)=> {
                    if (val3.id == val.family_id) {
                        this.family_shared.push(val3);
                    }
                });
            });
        });

        this.options = {year: "numeric", month: "long", day: "numeric"};
        var fc = new Date(this.p.created_at);
        this.p.format_create_date = fc.toLocaleString("es-ES", this.options);

        var f = new Date(this.p.limit_date+' '+this.p.limit_hour);
        this.p.format_date = f.toLocaleString("es-ES", this.options);

         if(this.p.status == 0){
            this.p.statusText = 'Pendiente';
        }else{
            this.p.statusText = 'Superado';
        }

        if (this.p.complete_date) {
            var f2 = new Date(this.p.complete_date+' 00:00:00');
            this.p.format_complete_date = f2.toLocaleString("es-ES", this.options);
        }else{
            this.p.format_complete_date = 'Sin registro';
        }

        if(this.p.repeat == 0){
            this.p.period = 'No repetir';
        }
        if(this.p.repeat == 1){
            this.p.period = 'Repetir Todos los dias (Lun - Dom)';
        }
        if(this.p.repeat == 2){
            this.p.period = 'Repetir cada semana';
        }
        if(this.p.repeat == 3){
            this.p.period = 'Repetir cada mes';
        }
        if(this.p.repeat == 4){
            this.p.period = 'Repetir cada año';
        }
  	}	

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad DetailActivityPage');
        if (this.p.name === 'Comida del Colegio') {
            console.log('Esta es una comida');

            let h = document.getElementById('img_food');
            let h2 = document.getElementById('bot_food');
            // let h = $('#img_food');
            let loader : any;
            $.ajax({
                url: this.auth.url+'/search/banner/'+this.p.id,
                type: 'GET',
                data: {},
            })
            .done((data)=> {
                // console.log(data);
                if (data.success != true) {
                    
                }else{
                    if (data.banner.banner) {
                        let srcI = this.auth.url+'/files/company/'+data.banner.banner;
                        let urk = data.banner.url;
                        setTimeout(()=>{
                            if (urk) {
                                h.innerHTML = '<a href="'+urk+'" target="_blank"><img src="'+srcI+'"/></a>';
                                if (h2) {
                                    h2.innerHTML = '<a href="'+urk+'" target="_blank"><img src="'+srcI+'"/></a>';
                                }
                            }else{
                                h.innerHTML = '<img src="'+srcI+'"/>';
                                if (h2) {
                                    h2.innerHTML = '<img src="'+srcI+'"/>';
                                }

                            }
                        } , 400);
                    }
                }
            })
            .fail((r)=> {
                // loader.dismiss();
                // this.alertCtrl.create({
                //     title: 'Error!',
                //     subTitle: 'Error al procesar los datos, intente mas tarde',
                //     buttons: ['OK']
                // }).present();
            })
            .always(()=> {
                console.log("complete");
            });
        }
  	}

  	deleteActivity(){ 
        var url = this.auth.url+'/deleteActivity/'+this.p.id;
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
                localStorage.removeItem("userActivity");
                localStorage.setItem('userActivity' , JSON.stringify(data.act));
                this.events.publish('editarObjeto');
                loader.dismiss();
                this.toastCtrl.create({
                  message: 'Actividad eliminada exitosamente',
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

  	deleteAct(){
        this.actionSheetCtrl.create({
            title: 'Seguro de eliminar esta actividad?',
            buttons: [
                {
                    text: 'Confirmar',
                    role: 'destructive',
                    handler: () => {
                        this.deleteActivity();
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

    editAc(p){
        this.navCtrl.push(EditActivityPage , {
            a:p
        })
    }
}
