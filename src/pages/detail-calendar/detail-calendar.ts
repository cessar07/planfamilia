import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController , AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ViewActivitiesPage }    from '../view-activities/view-activities';


import * as $ from 'jquery';
/**
 * Generated class for the DetailCalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-calendar', 
  templateUrl: 'detail-calendar.html',
  providers: [AuthServiceProvider]
})
export class DetailCalendarPage {
	userDetails: any;
	public f;
    constructor(public alertCtrl: AlertController,public loadingCtrl: LoadingController,public auth: AuthServiceProvider,public navCtrl: NavController,public navParams: NavParams, public events: Events) {
  		var data = JSON.parse(localStorage.getItem('userAuth'));
  		this.userDetails = data;
  		this.f = navParams.get('f');
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad DetailCalendarPage');
    	let loader: any;
        $.ajax({
            url: this.auth.url+'/calendar/'+this.userDetails.id+'/'+this.f.id,
            type: 'GET',
            data: {},
            beforeSend: ()=>{
                loader = this.loadingCtrl.create({
                  content: "Buscando",
                });
                loader.present();
            }
        })
        .done((data)=> {
            // console.log(data);
            $('#calendar').html(data);
            loader.dismiss();

            let toggles = document.getElementsByClassName('changeMonth');
            for (let i = 0; i < toggles.length; i++) {
                let toggle = toggles[i];
                toggles[i].addEventListener('click',()=>{
                  this.changeMonth(toggle.getAttribute('data-month'),toggle.getAttribute('data-action'));
                })
            }

            let toggles2 = document.getElementsByClassName('span_day');
            for (let i = 0; i < toggles2.length; i++) {
                let toggle2 = toggles2[i];
                toggles2[i].addEventListener('click',()=>{
                    this.viewActivities(toggle2.getAttribute('data-act'),toggle2.getAttribute('data-date'));
                    console.log(toggle2.getAttribute('data-act'));
                })
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

  	changeMonth(month, action){
        let loader:any;
        $.ajax({
            url: this.auth.url+'/changeMonth',
            type: 'POST',
            data: {month:month,action:action,id:this.userDetails.id},
            beforeSend: ()=>{
                loader = this.loadingCtrl.create({
                  content: "Buscando",
                });
                loader.present();
            }
        })
        .done((data)=> {
            // console.log(data);
            $('#calendar').html(data);
            loader.dismiss();

            let toggles = document.getElementsByClassName('changeMonth');
            for (let i = 0; i < toggles.length; i++) {
                let toggle = toggles[i];
                toggles[i].addEventListener('click',()=>{
                  this.changeMonth(toggle.getAttribute('data-month'),toggle.getAttribute('data-action'));
                })
            }

            let toggles2 = document.getElementsByClassName('span_day');
            for (let i = 0; i < toggles2.length; i++) {
                let toggle2 = toggles2[i];
                toggles2[i].addEventListener('click',()=>{
                  this.viewActivities(toggle2.getAttribute('data-act'),toggle2.getAttribute('data-date'));
                })
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

    viewActivities(act , day){
        this.navCtrl.push(ViewActivitiesPage, {
            act:act,
            day:day
        })
    }
}
