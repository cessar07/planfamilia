import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Events, LoadingController, AlertController , ToastController} from 'ionic-angular';
import {WelcomePage} from '../welcome/welcome';
import { PersonalObPage } from '../personal-ob/personal-ob';
import { DetailPErsonalObPage }    from '../detail-p-ersonal-ob/detail-p-ersonal-ob';
import { DetailSharedObjetivePage }    from '../detail-shared-objetive/detail-shared-objetive';
import { CreatePersonalObPage }    from '../create-personal-ob/create-personal-ob';
import { CreateSharedObjetivePage }    from '../create-shared-objetive/create-shared-objetive';
import { EditPersonalObPage }    from '../edit-personal-ob/edit-personal-ob';
import { EditSharedObjetivePage }    from '../edit-shared-objetive/edit-shared-objetive';
import { MyperfilPage }    from '../myperfil/myperfil';
import { MyfamilyPage }    from '../myfamily/myfamily';
import { DetailActivityPage } from '../detail-activity/detail-activity';
import { CreateActivityPage }    from '../create-activity/create-activity';
import { SelectUserPage }    from '../select-user/select-user';
import { InfoSendPage }    from '../info-send/info-send';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import * as $ from 'jquery';

@IonicPage()
@Component({
  selector: 'page-home', 
  templateUrl: 'home.html',
   providers: [AuthServiceProvider]

})
export class HomePage {
    rootPage: any = WelcomePage;
    public userDetails;
    public userPerOb;
    userShaOb:any;
    userActivity;
    options :any;
    tody_date:any;
    constructor(public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController, public auth: AuthServiceProvider) {
        var data = JSON.parse(localStorage.getItem('userAuth'));
        var obs = JSON.parse(localStorage.getItem('userPerOb'));
        var sha = JSON.parse(localStorage.getItem('userShaOb'));
        var act = JSON.parse(localStorage.getItem('userActivity')); 
        this.userDetails = data;
        this.userShaOb = sha;
        this.userPerOb = obs; 
        this.userActivity = act;
        this.options = {year: "numeric", month: "short", day: "numeric"};

        if (!this.userActivity && !this.userShaOb && !this.userPerOb) {
            this.updateAll();
        }else{
            if (!this.userShaOb) {
                this.updateSha();
            }

            if (!this.userPerOb) {
                this.updatePer();
            }

            if (!this.userActivity) {
                this.updateAct();
            }
        }
        var t_d = new Date();
        this.tody_date = t_d.toLocaleString("es-ES", this.options);

        $.each(this.userPerOb, (index, val)=> {
            var f = new Date(val.limit_date+' '+val.limit_hour);
            val.format_date = f.toLocaleString("es-ES", this.options);
        });
        $.each(this.userShaOb, (index, val)=> {
            var f = new Date(val.limit_date+' '+val.limit_hour);
            val.format_date = f.toLocaleString("es-ES", this.options);
        });
        $.each(this.userActivity, (index, val)=> {
            var f = new Date(val.limit_date+' '+val.limit_hour);
            val.format_date = f.toLocaleString("es-ES", this.options);
        });

        this.events.subscribe('editarObjeto',()=>{
            // this.userPerOb = parametro
            this.userPerOb    = JSON.parse(localStorage.getItem('userPerOb'));
            this.userShaOb    = JSON.parse(localStorage.getItem('userShaOb'));
            this.userActivity = JSON.parse(localStorage.getItem('userActivity'));
            this.userDetails  = JSON.parse(localStorage.getItem('userAuth'));
 
            $.each(this.userPerOb, (index, val)=> {
                var f = new Date(val.limit_date+' '+val.limit_hour);
                val.format_date = f.toLocaleString("es-ES", this.options);
            });
            $.each(this.userShaOb, (index, val)=> {
                var f = new Date(val.limit_date+' '+val.limit_hour);
                val.format_date = f.toLocaleString("es-ES", this.options);
            });
            $.each(this.userActivity, (index, val)=> {
                var f = new Date(val.limit_date+' '+val.limit_hour);
                val.format_date = f.toLocaleString("es-ES", this.options);
            });
        });

        this.events.subscribe('editarObjeto3',()=>{
            var url = this.auth.url+'/updateAllFami/'+this.userDetails.id;
            let loader: any;
            $.ajax({
                url: url,
                type: 'GET',
                data: {},
            })
            .done((data)=> {
                localStorage.setItem('userFamilies' , JSON.stringify(data.family));
                localStorage.setItem('userFamilyExt' , JSON.stringify(data.family_ext));
            })
            .fail((r) => {
                // loader.dismiss();
                // this.alertCtrl.create({
                //     title: 'Error!',
                //     subTitle: 'Error al procesar los datos, intente mas tarde',
                //     buttons: ['OK']
                // }).present();
            })
            .always(function() {
                console.log("complete");
            });
        });
    }

    ionViewDidLoad(){
        var preview = document.getElementById('div_ava');
        if (this.userDetails.avatar) {
            preview.style.backgroundColor = 'trasnparent';
            preview.style.backgroundImage = 'url("'+this.userDetails.avatar+'")';
            preview.style.backgroundSize  = 'cover';
            preview.style.borderRadius = '100%';
            preview.style.backgroundPosition = 'center center';
            preview.style.width = '60px';
            preview.style.height = '60px';
            preview.style.backgroundRepeat = 'no-repeat';
            preview.style.marginLeft = '20px';
        }else{
            preview.style.backgroundColor = 'trasnparent';
            preview.style.backgroundImage = 'url("../assets/imgs/avatar0.png")';
            preview.style.borderRadius = '100%';
            preview.style.backgroundSize  = 'cover';
            preview.style.backgroundPosition = 'center center';
            preview.style.width = '60px';
            preview.style.height = '60px';
            preview.style.backgroundRepeat = 'no-repeat';
            preview.style.marginLeft = '20px';
        }
        let aux_ext = JSON.parse(localStorage.getItem('userFamilyExt'));
        let aux_fam = JSON.parse(localStorage.getItem('userFamilies'));
        var url = this.auth.url+'/updateAllFami/'+this.userDetails.id;
        let loader: any;
        $.ajax({
            url: url,
            type: 'GET',
            data: {},
        })
        .done((data)=> {
            localStorage.setItem('userFamilies' , JSON.stringify(data.family));
            localStorage.setItem('userFamilyExt' , JSON.stringify(data.family_ext));
        })
        .fail((r) => {
            // loader.dismiss();
            // this.alertCtrl.create({
            //     title: 'Error!',
            //     subTitle: 'Error al procesar los datos, intente mas tarde',
            //     buttons: ['OK']
            // }).present();
            localStorage.setItem('userFamilies' , aux_fam);
            localStorage.setItem('userFamilyExt' , aux_ext);
        })
        .always(function() {
            console.log("complete");
        });
    }
    updateAll(){
        var url = this.auth.url+'/updateAll/'+this.userDetails.id;
        let loader: any;
        $.ajax({
            url: url,
            type: 'GET',
            data: {},
            beforeSend: ()=>{
                loader = this.loadingCtrl.create({
                  content: "Actualizando",
                });
                loader.present();
            }
        })
        .done((data)=> {
            localStorage.setItem('userActivity' , JSON.stringify(data.act));
            localStorage.setItem('userPerOb' , JSON.stringify(data.p_o));
            localStorage.setItem('userShaOb' , JSON.stringify(data.s_o));
            this.events.publish('editarObjeto');
            loader.dismiss();
            this.toastCtrl.create({
              message: 'Actividades actualizadas exitosamente',
              duration: 3000
            }).present();
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

    personalOb(){
        this.navCtrl.push(PersonalObPage);
    }

    createPersonalOb(){
        this.navCtrl.push(CreatePersonalObPage);
    }

    createSharedOb(){
        this.navCtrl.push(CreateSharedObjetivePage);
    }

    selectUser(){
        this.navCtrl.push(SelectUserPage);
    }

    editOb(p){
        this.navCtrl.push(EditPersonalObPage , {
            p:p,
            userDetails:this.userDetails
        });
    }

    viewOb(p){
        this.navCtrl.push(DetailPErsonalObPage , {
            p:p
        });
    }

    logout(){
        let aux = localStorage.getItem('oneSignalIdFamilia');
        localStorage.clear();
        localStorage.setItem('oneSignalIdFamilia',aux);
        setTimeout(()=>this.navCtrl.setRoot(WelcomePage), 500);
    }

    showMenu(){
        $('.dropdown-content').toggle();
    }

    myPerfil(){
        this.navCtrl.push(MyperfilPage);
    }

    myFamily(){
        this.navCtrl.push(MyfamilyPage);
    }

    editShaOb(p){
        this.navCtrl.push(EditSharedObjetivePage , {
            s:p
        })
    }

    viewShaOb(p){
        this.navCtrl.push(DetailSharedObjetivePage , {
            s:p
        })
    }

    viewAct(p){
        this.navCtrl.push(DetailActivityPage , {
            a:p
        })
    }

    addAct(){
        this.navCtrl.push(CreateActivityPage);
    }

    updateAct(){
        var url = this.auth.url+'/refreshActivities/'+this.userDetails.id;
        let loader: any;
        $.ajax({
            url: url,
            type: 'GET',
            data: {},
            beforeSend: ()=>{
                loader = this.loadingCtrl.create({
                  content: "Actualizando actividades",
                });
                loader.present();
            }
        })
        .done((data)=> {
            localStorage.removeItem("userActivity");
            localStorage.setItem('userActivity' , JSON.stringify(data.act));
            this.events.publish('editarObjeto');
            loader.dismiss();
            this.toastCtrl.create({
              message: 'Actividades actualizadas exitosamente',
              duration: 3000
            }).present();
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

    updatePer(){
        var url = this.auth.url+'/refreshPerOb/'+this.userDetails.id;
        let loader: any;
        $.ajax({
            url: url,
            type: 'GET',
            data: {},
            beforeSend: ()=>{
                loader = this.loadingCtrl.create({
                  content: "Actualizando objetivos personales",
                });
                loader.present();
            }
        })
        .done((data)=> {
            localStorage.removeItem("userPerOb");
            localStorage.setItem('userPerOb' , JSON.stringify(data.p_o));
            this.events.publish('editarObjeto');
            loader.dismiss();
            this.toastCtrl.create({
              message: 'Objetivos personales actualizados exitosamente',
              duration: 3000
            }).present();
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

    updateSha(){
        var url = this.auth.url+'/refreshShaOb/'+this.userDetails.id;
        let loader: any;
        $.ajax({
            url: url,
            type: 'GET',
            data: {},
            beforeSend: ()=>{
                loader = this.loadingCtrl.create({
                  content: "Actualizando objetivos compartidos",
                });
                loader.present();
            }
        })
        .done((data)=> {
            localStorage.removeItem("userShaOb");
            localStorage.setItem('userShaOb' , JSON.stringify(data.s_o));
            this.events.publish('editarObjeto');
            loader.dismiss();
            this.toastCtrl.create({
              message: 'Objetivos compartidos actualizados exitosamente',
              duration: 3000
            }).present();
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

    infoSend(){
        this.navCtrl.push(InfoSendPage);
    }

    actBlock(){
        this.alertCtrl.create({
            title: 'Oops!',
            subTitle: 'Esta actividad esta reservada para usuarios mayores de edad',
            buttons: ['OK']
        }).present();
    }

    actBlock2(){
        this.alertCtrl.create({
            title: 'Oops!',
            subTitle: 'Para cerrar sesion en la aplicacion, selecciona nuevamente tu perfil como mayor de edad',
            buttons: ['OK']
        }).present();
    }
}