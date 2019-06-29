import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController , AlertController } from 'ionic-angular';
import { CreateActivityPage }    from '../create-activity/create-activity';
import { ViewActivitiesPage }    from '../view-activities/view-activities';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DetailActivityPage } from '../../pages/detail-activity/detail-activity';

import * as $ from 'jquery';

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
        providers: [AuthServiceProvider]

})
export class CalendarPage {
    userActivity :any;
    userDetails: any;
    myDate: any;
    userFamily: any;
    family_r: any = [];
    constructor(public alertCtrl: AlertController,public loadingCtrl: LoadingController,public auth: AuthServiceProvider,public navCtrl: NavController,public navParams: NavParams, public events: Events) {
        var data = JSON.parse(localStorage.getItem('userAuth'));
        var dat = JSON.parse(localStorage.getItem('userFamily'));
        this.userFamily = dat;
        this.userDetails = data;
        this.events.subscribe('editarObjeto',()=>{
            // this.userPerOb = parametro
            this.userActivity = JSON.parse(localStorage.getItem('userActivity'));
        })
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad CalendarPage');
        let loader: any;
        $.ajax({
            url: this.auth.url+'/calendar/'+this.userDetails.id,
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
            console.log(r);
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

    createActivity(){
        this.navCtrl.push(CreateActivityPage);
    }

    viewActivity(act){
        this.navCtrl.push(DetailActivityPage , {
            a:act
        })
    }
}
