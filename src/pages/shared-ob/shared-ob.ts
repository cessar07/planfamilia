import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Events , AlertController } from 'ionic-angular';
import { CreateSharedObjetivePage } from '../create-shared-objetive/create-shared-objetive';
import { EditSharedObjetivePage } from '../edit-shared-objetive/edit-shared-objetive';
import { DetailSharedObjetivePage } from '../detail-shared-objetive/detail-shared-objetive';

import * as $ from 'jquery';
/**
 * Generated class for the SharedObPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shared-ob',
  templateUrl: 'shared-ob.html',
})
export class SharedObPage {
    userDetails : any;
    userShaOb : any;
    options:any;
    constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams , public events: Events) {
  	    var data = JSON.parse(localStorage.getItem('userAuth'));
        var obs = JSON.parse(localStorage.getItem('userShaOb'));
        this.userDetails = data;
        this.userShaOb = obs;
        this.options = {year: "numeric", month: "short", day: "numeric"};

        $.each(this.userShaOb, (index, val)=> {
            var f = new Date(val.limit_date+' '+val.limit_hour);
            val.format_date = f.toLocaleString("es-ES", this.options);
            if (val.complete_date) {
                var f2 = new Date(val.complete_date);
                val.format_complete_date = f2.toLocaleString("es-ES", this.options);
            }

            if (val.status == 0) {
                val.statusText = 'Pendiente'; 
            }else{
                val.statusText = 'Superado'; 
            }
        });
        this.events.subscribe('editarObjeto',(/*parametro*/)=>{
            // this.userShaOb = parametro
            this.userShaOb = JSON.parse(localStorage.getItem('userShaOb'));
            $.each(this.userShaOb, (index, val)=> {
            var f = new Date(val.limit_date+' '+val.limit_hour);
            val.format_date = f.toLocaleString("es-ES", this.options);
            if (val.complete_date) {
                var f2 = new Date(val.complete_date);
                val.format_complete_date = f2.toLocaleString("es-ES", this.options);
            }

            if (val.status == 0) {
                val.statusText = 'Pendiente'; 
            }else{
                val.statusText = 'Superado'; 
            }
        });
        })
    }

  	ionViewDidLoad() { 
    	console.log('ionViewDidLoad SharedObPage');
  	}

    createSharedOb(){
        this.navCtrl.push(CreateSharedObjetivePage);
    }

    editSb(p){
        this.navCtrl.push(EditSharedObjetivePage , {
            s:p
        });
    }

    viewSb(p){
        this.navCtrl.push(DetailSharedObjetivePage , {
            s:p
        });
    }

    actBlock(){
        this.alertCtrl.create({
            title: 'Oops!',
            subTitle: 'Esta actividad esta reservada para usuarios mayores de edad',
            buttons: ['OK']
        }).present();
    }
}
