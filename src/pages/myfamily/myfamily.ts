import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Events, LoadingController, AlertController} from 'ionic-angular';
import { CreateFamilyPage } from '../create-family/create-family';
import { DetailFamilyPage } from '../detail-family/detail-family';
import { InvitationsMyPage } from '../invitations-my/invitations-my';
import { MyInvitationsPage } from '../my-invitations/my-invitations';
import { CreateFamilyNewPage } from '../create-family-new/create-family-new';
import { DetailFamilyNewPage } from '../detail-family-new/detail-family-new';
import { DetailFamilyNoMinePage } from '../detail-family-no-mine/detail-family-no-mine';
import { YoungerInviPage } from '../younger-invi/younger-invi';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import * as $ from 'jquery';

/**
 * Generated class for the MyfamilyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myfamily',
  templateUrl: 'myfamily.html',
  providers: [AuthServiceProvider]
})
export class MyfamilyPage {
	userFamily:any;
    userFamilyExt:any;
    userFamilies:any;
    userDetails:any;
    constructor(public auth: AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController) {
  		var dat = JSON.parse(localStorage.getItem('userFamily'));
        var dat2 = JSON.parse(localStorage.getItem('userFamilyExt'));
        var fam = JSON.parse(localStorage.getItem('userFamilies'));
        var user = JSON.parse(localStorage.getItem('userAuth'));
  		this.userFamily = dat;
        this.userFamilyExt = dat2;
        this.userDetails = user;

        if (!fam) {
            var url = this.auth.url+'/searchFamilies/'+this.userDetails.id;
            let loader: any;
            $.ajax({
                url: url,
                type: 'GET',
                data: {},
                beforeSend: ()=>{
                    loader = this.loadingCtrl.create({
                      content: "Buscando",
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
                    localStorage.removeItem("userFamilies");
                    localStorage.setItem('userFamilies' , JSON.stringify(data.fam));
                    localStorage.setItem('userFamilyExt' , JSON.stringify(data.famExt));
                    this.events.publish('editarObjeto');
                    setTimeout(()=>{
                        loader.dismiss();
                    } , 1000)
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
        }else{
            this.userFamilies = JSON.parse(localStorage.getItem('userFamilies'));
        }
        this.events.subscribe('editarObjeto',()=>{
            this.userFamilyExt = JSON.parse(localStorage.getItem('userFamilyExt'));
            this.userFamilies = JSON.parse(localStorage.getItem('userFamilies'));
        })
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad MyfamilyPage');
  	}

    addFamily(){
        this.navCtrl.push(CreateFamilyPage);
    }

    viewFamily(f){
        this.navCtrl.push(DetailFamilyPage , {
            f:f
        }); 
    }

    myIn(){
        this.navCtrl.push(MyInvitationsPage);
    }

    inMy(){
        this.navCtrl.push(InvitationsMyPage);
    }

    addFamilyNew(){
        this.navCtrl.push(CreateFamilyNewPage);
    }

    viewFamilyNew(f){
        this.navCtrl.push(DetailFamilyNewPage , {
            f:f
        })
    }

    viewFamilyNewNoMine(f){
        this.navCtrl.push(DetailFamilyNoMinePage , {
            f:f
        })
    }

    youngerMy(){
        this.navCtrl.push(YoungerInviPage);
    }
}
