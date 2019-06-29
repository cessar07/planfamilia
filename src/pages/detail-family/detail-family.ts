import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, AlertController, ActionSheetController , ToastController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { EditFamilyPage } from '../edit-family/edit-family';
import { DetailHourPage } from '../detail-hour/detail-hour';
import { DetailCalendarPage } from '../detail-calendar/detail-calendar';
import { FoodCalendarPage } from '../food-calendar/food-calendar';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HomePage } from '../home/home';

import * as $ from 'jquery';
 

/**
 * Generated class for the DetailFamilyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({ 
    selector: 'page-detail-family',
    templateUrl: 'detail-family.html',
    providers: [AuthServiceProvider]
})
export class DetailFamilyPage {
	public f;
    public fa;
	hour:any = '';
	userDetails:any;
    userFamily:any;
    userFamilyExt:any;
    imageURI:any;
    imageFileName:any;
  	constructor(public toastCtrl: ToastController,private transfer: FileTransfer,private camera: Camera,public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController,public auth: AuthServiceProvider) {
  		var data = JSON.parse(localStorage.getItem('userAuth'));
        var data2 = JSON.parse(localStorage.getItem('userFamilyExt'));
        var data3 = JSON.parse(localStorage.getItem('userFamilies'));
  		this.userDetails = data;
        this.userFamilyExt = data2;
        this.userFamily = data3;
  		this.f = navParams.get('f');
        this.fa = navParams.get('fa');

        $.each(this.f.family, (index, val)=> {
            if (val.userInfo.id == this.fa.responsable_in_id){
                this.fa.res_in = val;
            }

            if (val.userInfo.id == this.fa.responsable_out_id){
                this.fa.res_out = val;
            }
        });


        this.events.subscribe('editarObjeto',()=>{
            this.userFamily = JSON.parse(localStorage.getItem('userFamilies'));
            $.each(this.userFamily, (index, val)=> {
                $.each(val.familyOther, (index2, val2)=> {
                    if (val2.id == this.fa.id){
                        this.fa = val2; 
                    }
                });
            });
        });
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad DetailFamilyPage');

        var preview = document.getElementById('div_avat');
        if (this.fa.avatar) {
            preview.style.backgroundImage = 'url("'+this.fa.avatar+'")';
            preview.style.backgroundSize  = 'cover';
            preview.style.borderRadius = '100%';
            preview.style.backgroundPosition = 'center center';
            preview.style.width = '100px';
            preview.style.height = '100px';
            preview.style.backgroundRepeat = 'no-repeat';
            preview.style.marginLeft = '36%';
        }else{
            preview.style.backgroundImage = 'url("../assets/imgs/avatar0.png")';
            preview.style.borderRadius = '100%';
            preview.style.backgroundSize  = 'cover';
            preview.style.backgroundPosition = 'center center';
            preview.style.width = '100px';
            preview.style.height = '100px';
            preview.style.backgroundRepeat = 'no-repeat';
            preview.style.marginLeft = '36%';
        }
  	}

  	editFamily(){
  		this.navCtrl.push(EditFamilyPage, { 
  			fa:this.fa,
            f:this.f
  		})
  	}

  	deleteFamily(){
        var url = this.auth.url+'/deleteFamily/'+this.fa.id;
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
                localStorage.removeItem("userFamilies");
                localStorage.removeItem("userActivity");
                localStorage.setItem('userFamilies' , JSON.stringify(data.fam));
                this.events.publish('editarObjeto');
                loader.dismiss();
                this.toastCtrl.create({
                  message: 'Familiar eliminado exitosamente',
                  duration: 3000
                }).present();
                this.navCtrl.setRoot(HomePage);
                // this.navCtrl.pop();
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

  	deleteFam(){
  		this.actionSheetCtrl.create({
            title: 'Seguro de eliminar este familiar?',
            buttons: [
                {
                    text: 'Confirmar',
                    role: 'destructive',
                    handler: () => {
                        this.deleteFamily();
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

    viewHour(){
        // this.alertCtrl.create({
        //   title: 'Oops!',
        //   subTitle: 'Funcionalidad aun en desarrollo',
        //   buttons: ['OK']
        // }).present();

        this.navCtrl.push(DetailHourPage , {
            f:this.fa,
        })
    }

    viewCalendar(f){
        // this.alertCtrl.create({
        //   title: 'Oops!',
        //   subTitle: 'Funcionalidad aun en desarrollo',
        //   buttons: ['OK']
        // }).present();
        this.navCtrl.push(DetailCalendarPage , {
            f:this.fa,
        })
    }
    viewCalendarFood(){
        this.navCtrl.push(FoodCalendarPage , {
            f:this.fa,
        })
    }
}
