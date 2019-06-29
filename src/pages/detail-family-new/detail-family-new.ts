import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Events, LoadingController, AlertController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { SendInvitationPage } from '../../pages/send-invitation/send-invitation';
import { MyInvitationsPage } from '../../pages/my-invitations/my-invitations';
import { CreateFamilyPage } from '../create-family/create-family';
import { EditFamilyPage } from '../edit-family/edit-family';
import { DetailFamilyPage } from '../detail-family/detail-family';

import * as $ from 'jquery';
/**
 * Generated class for the DetailFamilyNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-family-new',
  templateUrl: 'detail-family-new.html',
  providers: [AuthServiceProvider]
})
export class DetailFamilyNewPage {
	public f;
    familyInvi:any;
    userDetails:any;
    userFamily:any;
    family:any = [];
    familyOther:any = [];
    constructor(public auth: AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController) {
  		this.f = this.navParams.get('f');
        var data = JSON.parse(localStorage.getItem('userAuth'));
        this.userDetails = data;
        this.events.subscribe('editarObjeto2',()=>{
            // this.userFamily = JSON.parse(localStorage.getItem('userFamilies'));
            // $.each(this.userFamily, (index, val)=> {
            //     if (val.id == this.f.id){
            //         this.f.family = val.family;
            //         this.f.familyOther = val.familyOther;
            //     }
            // });
            var url = this.auth.url+'/searchFamily/'+this.f.id+'/'+this.userDetails.id;  
            let loader: any;
            $.ajax({
                url: url,
                type: 'GET',
                data: {},
                beforeSend: ()=>{
                    loader = this.loadingCtrl.create({
                      content: "Actualizando familiares",
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
                    this.family = data.family;
                    this.familyOther = data.familyOther;
                    localStorage.removeItem("userFamilies");
                    localStorage.removeItem("userFamilyExt");
                    localStorage.setItem('userFamilies' , JSON.stringify(data.fam));
                    localStorage.setItem('userFamilyExt' , JSON.stringify(data.famExt));
                this.events.publish('editarObjeto');
                    setTimeout(()=>{
                        $.each(this.family, (index, val)=> {
                            var preview = document.getElementById('avat_u'+val.userInfo.id);
                            if (val.userInfo.avatar) {
                                preview.style.backgroundImage = 'url("'+val.userInfo.avatar+'")';
                                preview.style.backgroundSize  = 'cover';
                                preview.style.borderRadius = '100%';
                                preview.style.backgroundPosition = 'center center';
                                preview.style.width = '80px';
                                preview.style.height = '80px';
                                preview.style.backgroundRepeat = 'no-repeat';
                                preview.style.marginLeft = '25%';
                            }else{
                                preview.style.backgroundImage = 'url("../assets/imgs/avatar0.png")';
                                preview.style.borderRadius = '100%';
                                preview.style.backgroundSize  = 'cover';
                                preview.style.backgroundPosition = 'center center';
                                preview.style.width = '80px';
                                preview.style.height = '80px';
                                preview.style.backgroundRepeat = 'no-repeat';
                                preview.style.marginLeft = '25%';
                            }
                        });

                        $.each(this.familyOther, (index, val)=> {
                            var preview2 = document.getElementById('avat_u'+val.id);
                            if (val.avatar) {
                                preview2.style.backgroundImage = 'url("'+val.avatar+'")';
                                preview2.style.backgroundSize  = 'cover';
                                preview2.style.borderRadius = '100%';
                                preview2.style.backgroundPosition = 'center center';
                                preview2.style.width = '80px';
                                preview2.style.height = '80px';
                                preview2.style.backgroundRepeat = 'no-repeat';
                                preview2.style.marginLeft = '25%';
                            }else{
                                preview2.style.backgroundImage = 'url("../assets/imgs/avatar0.png")';
                                preview2.style.borderRadius = '100%';
                                preview2.style.backgroundSize  = 'cover';
                                preview2.style.backgroundPosition = 'center center';
                                preview2.style.width = '80px';
                                preview2.style.height = '80px';
                                preview2.style.backgroundRepeat = 'no-repeat';
                                preview2.style.marginLeft = '25%';
                            }
                        });
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
        }); 
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad DetailFamilyNewPage');
        var preview = document.getElementById('avat_u');
        if (this.userDetails.avatar) {
            preview.style.backgroundImage = 'url("'+this.userDetails.avatar+'")';
            preview.style.backgroundSize  = 'cover';
            preview.style.borderRadius = '100%';
            preview.style.backgroundPosition = 'center center';
            preview.style.width = '80px';
            preview.style.height = '80px';
            preview.style.backgroundRepeat = 'no-repeat';
            preview.style.marginLeft = '25%';
        }else{
            preview.style.backgroundImage = 'url("../assets/imgs/avatar0.png")'; 
            preview.style.borderRadius = '100%';
            preview.style.backgroundSize  = 'cover';
            preview.style.backgroundPosition = 'center center';
            preview.style.width = '80px';
            preview.style.height = '80px';
            preview.style.backgroundRepeat = 'no-repeat';
            preview.style.marginLeft = '25%';
        }

        var url = this.auth.url+'/searchFamily/'+this.f.id+'/'+this.userDetails.id; 
        let loader: any;
        $.ajax({
            url: url,
            type: 'GET',
            data: {},
            beforeSend: ()=>{
                loader = this.loadingCtrl.create({
                  content: "Buscando familiares",
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
                this.family = data.family;
                this.familyOther = data.familyOther;
                localStorage.removeItem("userFamilies");
                localStorage.removeItem("userFamilyExt");
                localStorage.setItem('userFamilies' , JSON.stringify(data.fam));
                localStorage.setItem('userFamilyExt' , JSON.stringify(data.famExt));
                this.events.publish('editarObjeto');
                setTimeout(()=>{
                    $.each(this.family, (index, val)=> {
                        var preview = document.getElementById('avat_u'+val.userInfo.id);
                        if (val.userInfo.avatar) {
                            preview.style.backgroundImage = 'url("'+val.userInfo.avatar+'")';
                            preview.style.backgroundSize  = 'cover';
                            preview.style.borderRadius = '100%';
                            preview.style.backgroundPosition = 'center center';
                            preview.style.width = '80px';
                            preview.style.height = '80px';
                            preview.style.backgroundRepeat = 'no-repeat';
                            preview.style.marginLeft = '25%';
                        }else{
                            preview.style.backgroundImage = 'url("../assets/imgs/avatar0.png")';
                            preview.style.borderRadius = '100%';
                            preview.style.backgroundSize  = 'cover';
                            preview.style.backgroundPosition = 'center center';
                            preview.style.width = '80px';
                            preview.style.height = '80px';
                            preview.style.backgroundRepeat = 'no-repeat'; 
                            preview.style.marginLeft = '25%';
                        }
                    });

                    $.each(this.familyOther, (index, val)=> {
                        var preview2 = document.getElementById('avat_u'+val.id);
                        if (val.avatar) {
                            preview2.style.backgroundImage = 'url("'+val.avatar+'")';
                            preview2.style.backgroundSize  = 'cover';
                            preview2.style.borderRadius = '100%';
                            preview2.style.backgroundPosition = 'center center';
                            preview2.style.width = '80px';
                            preview2.style.height = '80px';
                            preview2.style.backgroundRepeat = 'no-repeat';
                            preview2.style.marginLeft = '25%';
                        }else{
                            preview2.style.backgroundImage = 'url("../assets/imgs/avatar0.png")';
                            preview2.style.borderRadius = '100%';
                            preview2.style.backgroundSize  = 'cover';
                            preview2.style.backgroundPosition = 'center center';
                            preview2.style.width = '80px';
                            preview2.style.height = '80px';
                            preview2.style.backgroundRepeat = 'no-repeat';
                            preview2.style.marginLeft = '25%';
                        }
                    });
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
  	}

  	sendInv(){
  		this.navCtrl.push(SendInvitationPage , {
  			f:this.f
  		})
  	}

    searchInvi(){
        this.navCtrl.push(MyInvitationsPage , {
            f:this.f
        });
    }

    addFamiliarNew(){
        this.navCtrl.push(CreateFamilyPage, {
            f:this.f
        });
    }

    editFamiliar(fa , f){
        this.navCtrl.push(EditFamilyPage , {
            fa:fa,
            f:f
        })
    }

    viewFamiliar(fa , f){
        this.navCtrl.push(DetailFamilyPage , {
            fa:fa,
            f:f
        })
    }
}
