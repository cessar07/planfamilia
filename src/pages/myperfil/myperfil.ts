import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, AlertController, ActionSheetController , ToastController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as $ from 'jquery';
/**
 * Generated class for the MyperfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myperfil',
  templateUrl: 'myperfil.html',
    providers: [AuthServiceProvider]

})
export class MyperfilPage {
	userDetails:any;
    imageURI:any;
    imageFileName:any;
  	constructor(public toastCtrl: ToastController,private transfer: FileTransfer,private camera: Camera,public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public auth: AuthServiceProvider) {
  		var data = JSON.parse(localStorage.getItem('userAuth'));
        this.userDetails = data;
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad MyperfilPage');
        // var fi_in = document.getElementById('input_file');
        var preview = document.getElementById('file_div');

        if (this.userDetails.avatar) {
            preview.style.backgroundColor = 'trasnparent';
            preview.style.backgroundImage = 'url("'+this.userDetails.avatar+'")';
            preview.style.backgroundSize  = 'cover';
            preview.style.backgroundPosition = 'center';
            preview.innerHTML = '+<br>Cambiar Foto';
        }

        // fi_in.addEventListener('change' , (e)=>{
        //     var file    = fi_in.files[0];
        //     var reader  = new FileReader();

        //     reader.onloadend = function () {
        //         preview.style.backgroundColor = 'trasnparent';
        //         preview.style.backgroundImage = 'url("'+reader.result+'")';
        //         preview.style.backgroundSize  = 'cover';
        //         preview.style.backgroundPosition = 'center';
        //         preview.innerHTML = '+<br>Cambiar Foto';
        //     }

        //     if (file) {
        //         reader.readAsDataURL(file);
        //     } else {
        //         preview.style.backgroundColor = 'trasnparent';
        //         preview.style.backgroundImage = 'url("'+this.userDetails.avatar+'")';
        //         preview.style.backgroundSize  = 'cover';
        //         preview.style.backgroundPosition = 'center';
        //         preview.innerHTML = '+<br>Cambiar Foto';
        //     }
        // });
  	}

  	editPersonalDates(){
  		var dat = $('#f_e_p_d').serialize();
        // var dat = new FormData($('#f_e_p_d')[0]);
  		let loader: any;
  		$.ajax({
			url: this.auth.url+'/editPersoalDates',
			type: 'POST',
			data: dat,
			beforeSend: ()=>{
                loader = this.loadingCtrl.create({
                  content: "Procesando",
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
				localStorage.removeItem("userAuth");
				localStorage.setItem('userAuth' , JSON.stringify(data.user));
				this.events.publish('editarObjeto');
				loader.dismiss();
                this.toastCtrl.create({
                  message: data.msj,
                  duration: 3000
                }).present();
				this.navCtrl.pop();
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

            localStorage.removeItem("userAuth");
            localStorage.setItem('userAuth' , JSON.stringify(dd.user));
            this.events.publish('editarObjeto');
            preview.style.backgroundColor = 'trasnparent';
            preview.style.backgroundImage = 'url("'+dd.user.avatar+'")';
            preview.style.backgroundSize  = 'cover';
            preview.style.backgroundPosition = 'center';
            preview.innerHTML = '+<br>Cambiar Foto';
            loader.dismiss();
        }, (err) => {
            loader.dismiss();
            this.alertCtrl.create({
                title: 'Error!',
                subTitle: 'Error al subir la foto, intente mas tarde',
                buttons: ['OK']
            }).present();
        });
    }
}
