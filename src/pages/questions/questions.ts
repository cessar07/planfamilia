import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Slides , ActionSheetController , Events, LoadingController , AlertController , ToastController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';

import * as $ from 'jquery';

/**
 * Generated class for the QuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
   providers: [AuthServiceProvider]
})
export class QuestionsPage {
	@ViewChild(Slides) slides: Slides;
	imageURI:any;
	imageFileName:any;
	userDetails:any;
	f:any;
  	constructor(public toastCtrl: ToastController,public alertCtrl: AlertController,public auth: AuthServiceProvider,public events: Events, public loadingCtrl: LoadingController,private transfer: FileTransfer,private camera: Camera,public actionSheetCtrl: ActionSheetController,public navCtrl: NavController, public navParams: NavParams) {
  		var data = JSON.parse(localStorage.getItem('userAuth'));
        this.userDetails = data;
        this.events.subscribe('editarObjeto' , ()=>{
        	this.userDetails = JSON.parse(localStorage.getItem('userAuth'));
        });
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad QuestionsPage');
    	this.slides.lockSwipes(true);
  	}

  	selectFiles(){
        this.actionSheetCtrl.create({
            title: 'Foto de perfil',
            buttons: [
                {
                    text: 'Tomar una Foto',
                    role: 'take',
                    handler: () => {
                        this.showFiles2();
                    }
                },
                {
                    text: 'Elegir una foto',
                    role: 'choce',
                    handler: () => {
                        this.showFiles();
                    }
                }
            ]
        }).present();
    }

    showFiles(){
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType:this.camera.PictureSourceType.PHOTOLIBRARY
        }

        this.camera.getPicture(options).then((imageData) => {
            // let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.imageURI = imageData;
            this.uploadFile();
        }, (err) => {
         // Handle error
        });
    }

    showFiles2(){
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
        }

        this.camera.getPicture(options).then((imageData) => {
            // let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.imageURI = imageData;
            this.uploadFile();
        }, (err) => {
         // Handle error
        });
    }

    uploadFile(){
        let loader = this.loadingCtrl.create({
            content: "Cargando"
        });
        let preview = document.getElementById('file_div');
        loader.present();
        const fileTransfer: FileTransferObject = this.transfer.create();

        let options: FileUploadOptions = {
            fileKey: 'ionfile',
            fileName: 'ionicfile.jpg',
            chunkedMode: false,    
            headers: {
                Connection: 'close'
            }
        }

        fileTransfer.upload(this.imageURI, this.auth.url+'/uploadAvatar/'+this.userDetails.id, options)
        .then((data) => {
            var dd = JSON.parse(data['response']);
            console.log(dd);
            this.imageFileName = dd.user.avatar;

            // localStorage.removeItem("userAuth");
            localStorage.setItem('userAuth' , JSON.stringify(dd.user));
            this.events.publish('editarObjeto'); 
            preview.style.backgroundColor = 'trasnparent';
            preview.style.backgroundImage = 'url("'+dd.user.avatar+'")';
            preview.style.backgroundSize  = 'cover';
            preview.style.backgroundPosition = 'center';
            preview.innerHTML = '+<br>Cambiar Foto';
            loader.dismiss();
            this.toastCtrl.create({
              message: 'Foto actualizada exitosamente',
              duration: 3000
            }).present();
            this.slides.lockSwipes(false);
            setTimeout(()=>{
	    	    this.slides.slideNext(1500);
            } , 2000);
        }, (err) => {
            loader.dismiss();
            this.alertCtrl.create({
                title: 'Error!',
                subTitle: 'Error al subir la foto, intente mas tarde',
                buttons: ['OK']
            }).present();
        });
    }

    editPersonalDatesNew(){
    	var url = this.auth.url+'/editPersonalOne/'+this.userDetails.id;
        let loader: any;
        var da = $('#f_e_p_d_n').serialize();
        $.ajax({
            url: url,
            type: 'GET',
            data: da,
            beforeSend: ()=>{
                loader = this.loadingCtrl.create({
                  content: "Actualizando datos",
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
        		localStorage.removeItem("userAuth");
	            localStorage.setItem('userAuth' , JSON.stringify(data.user));
	            this.events.publish('editarObjeto');
	            loader.dismiss();
	            this.toastCtrl.create({
	              message: 'Datos actualizados exitosamente',
	              duration: 3000
	            }).present();
	            this.slides.lockSwipes(false);
	            this.slides.slideNext(1500);
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
        .always(function() {
            console.log("complete");
        });
    }

    addFamilyNew(){
    	var url = this.auth.url+'/editPersonalTwo/'+this.userDetails.id;
        let loader: any;
        var da = $('#form_add_family_n').serialize();
        $.ajax({
            url: url,
            type: 'GET',
            data: da,
            beforeSend: ()=>{
                loader = this.loadingCtrl.create({
                  content: "Registrando familia",
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
				localStorage.setItem('userFamilies' , JSON.stringify(data.fam));
				localStorage.removeItem("userFamilyExt");
                localStorage.setItem('userFamilyExt' , JSON.stringify(data.family_ext));
                this.f = data.f
	            this.events.publish('editarObjeto');
	            loader.dismiss();
	            this.toastCtrl.create({
	              message: 'Familia registrada exitosamente',
	              duration: 3000
	            }).present();
	            this.slides.lockSwipes(false);
	            this.slides.slideNext(1500); 
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
        .always(function() {
            console.log("complete");
        });
    }

    sendInviN(){
    	var url = this.auth.url+'/sendInviNew';
        let loader: any;
        var da = $('#form-invi-n').serialize();
        $.ajax({
            url: url,
            type: 'POST',
            data: da,
            beforeSend: ()=>{
                loader = this.loadingCtrl.create({
                  content: "Enviando invitación",
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
	            this.events.publish('editarObjeto');
	            loader.dismiss();
	            this.toastCtrl.create({
	              message: 'Invitación enviada exitosamente',
	              duration: 3000
	            }).present();
	            this.slides.lockSwipes(false);
	            this.slides.slideNext(1500);
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
        .always(function() {
            console.log("complete");
        });
    }

    moveOn(){
    	this.slides.lockSwipes(false);
	    this.slides.slideNext(1500);
    }

    initApp(){
    	this.navCtrl.setRoot(HomePage);
    }
}
