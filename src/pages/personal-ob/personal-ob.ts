import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Events } from 'ionic-angular';
import { CreatePersonalObPage }    from '../create-personal-ob/create-personal-ob';
import { DetailPErsonalObPage }    from '../detail-p-ersonal-ob/detail-p-ersonal-ob';
import { EditPersonalObPage }    from '../edit-personal-ob/edit-personal-ob';

import * as $ from 'jquery';

/**
 * Generated class for the PersonalObPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-ob',
  templateUrl: 'personal-ob.html',
})
export class PersonalObPage {
	userDetails : any;
	userPerOb : any;
    options:any;
  	constructor(public navCtrl: NavController, public navParams: NavParams , public events: Events) {
  		var data = JSON.parse(localStorage.getItem('userAuth'));
        var obs = JSON.parse(localStorage.getItem('userPerOb'));
        this.userDetails = data;
        this.userPerOb = obs;
        this.options = {year: "numeric", month: "short", day: "numeric"};
        $.each(this.userPerOb, (index, val)=> {
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
            // this.userPerOb = parametro
            this.userPerOb = JSON.parse(localStorage.getItem('userPerOb'));
            $.each(this.userPerOb, (index, val)=> {
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
    	console.log('ionViewDidLoad PersonalObPage');
  	}

  	createPersonalOb(){
  		this.navCtrl.push(CreatePersonalObPage);
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
}
