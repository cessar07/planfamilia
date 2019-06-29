import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Events, LoadingController, AlertController , ToastController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../../pages/home/home';

import * as $ from 'jquery';
/**
 * Generated class for the EditActivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-activity',
  templateUrl: 'edit-activity.html',
        providers: [AuthServiceProvider]

})
export class EditActivityPage {
	userDetails: any;
    userActivity: any;
	myDate: any;
    userFamily: any;
    userFamilyExt: any;
    family_r: any = [];
    public a;
    constructor(public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController,public auth: AuthServiceProvider) {
  		var data = JSON.parse(localStorage.getItem('userAuth'));
        var dat = JSON.parse(localStorage.getItem('userFamilies'));
        var dat2 = JSON.parse(localStorage.getItem('userFamilyExt'));
        this.userFamily = dat;
        this.userFamilyExt = dat2;
        this.userDetails = data;
        this.a = navParams.get('a');

        $.each(this.a.shared, (index, val)=> {
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

        this.events.subscribe('editarObjeto',()=>{
            // this.userPerOb = parametro
            this.userActivity = JSON.parse(localStorage.getItem('userActivity'));
        })
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad EditActivityPage');
  	}

  	updateCucumber(f){
        if (this.family_r.indexOf(f.id) != -1) {
            this.family_r.splice(this.family_r.indexOf(f.id), 1);
        }else{
            this.family_r.push(f.id); 
        }
    }

    editActivity(){
    	var url = this.auth.url+'/editActivity';
        var dat = $('#form_edit_ac').serialize();
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
                localStorage.removeItem("userActivity");
                localStorage.setItem('userActivity' , JSON.stringify(data.act));
                this.events.publish('editarObjeto');
                loader.dismiss();
                this.toastCtrl.create({
                  message: 'Actividad editada exitosamente',
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

    toggle(f){
        $('.no_s_'+f.id).toggle();
    }
}
