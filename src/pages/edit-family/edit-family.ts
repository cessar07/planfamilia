import { Component , ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams , Events, LoadingController, AlertController , Slides , ToastController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';

import * as $ from 'jquery'; 

/**
 * Generated class for the EditFamilyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-family',
  templateUrl: 'edit-family.html',
  providers: [AuthServiceProvider]
})
export class EditFamilyPage {
	userDetails: any;
	searchQuery: any = '';
  	items: any = [];
  	items2: any = [];
  	userFamilyNoYounger: any = []; 
  	school_id : any;
  	school_name : any;
  	t_s_n : any;
  	menor_age: any;
  	userFamily:any;
  	userFamilyExt:any;
  	myDate : any;
  	public f;
  	public fa;
  	@ViewChild(Slides) slides: Slides;
  	avatar_item : any = 'avatar0.png';
  	constructor(public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController, public auth: AuthServiceProvider) {
  		var data = JSON.parse(localStorage.getItem('userAuth'));
  		var fami = JSON.parse(localStorage.getItem('userFamilies'));
  		var fami2 = JSON.parse(localStorage.getItem('userFamilyExt'));
  		this.userDetails = data;
  		this.userFamily = fami;
  		this.userFamilyExt = fami2;
  		this.initializeItems();
  		this.f = navParams.get('f');
  		this.fa = navParams.get('fa');
  		this.school_id = this.fa.school_id;
	    this.items2 = JSON.parse(localStorage.getItem('schools'));
	    $.each(this.items2, (index, val)=> {
	    	if (val.id == this.fa.school_id) {
	    		this.t_s_n = val.name;
	    	}
		});
  	}

  	initializeItems() {
	    this.items = JSON.parse(localStorage.getItem('schools'));
	}

	myChange(){
		$('.no_s').toggle();
		$('.si_s').toggle();
		if (this.menor_age != true) {
			// this.t_s_n = '';
			// this.school_id = '';
			// $('.itemSc').css('background' , 'white');
			// $('.searchbar-input').click();
			// $('.searchbar-clear-icon').click();
		}
	}

	getItems(ev: any) {
	    // Reset items back to all of the items
	    this.initializeItems();

	    // set val to the value of the searchbar
	    const val = ev.target.value;

	    // if the value is an empty string don't filter the items
	    if (val && val.trim() != '') {
	      this.items = this.items.filter((item) => {
	        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1); 
	      })
	    }
	}

	addSchoolId(item){
		this.school_id = item.id;
		this.t_s_n = item.name;

		$('.item-radio-checked-2').removeClass('item-radio-checked-2');
		$('.itemSc').css('background' , 'white');
		$('#scholl_'+item.id).css('background' , '#999');
	}
	
	slideChanged(){
		let currentIndex = this.slides.getActiveIndex();
		this.avatar_item = 'avatar'+currentIndex+'.png';

		console.log(this.avatar_item);
	}

	editFamily(){
		var url = this.auth.url+'/editFamily';
  		var dat = $('#form_edit_family').serialize();
  		// var dat = new FormData($('#form_edit_family')[0]);
  		let loader: any;
  		$.ajax({
			url: url,
			type: 'POST',
			data: dat,
			beforeSend: ()=>{
                loader = this.loadingCtrl.create({
                  content: "Editando",
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
				localStorage.removeItem("userFamilies");
				localStorage.setItem('userFamilies' , JSON.stringify(data.family));
				localStorage.removeItem("userActivity");
				this.events.publish('editarObjeto');
				loader.dismiss();
    			this.toastCtrl.create({
                  message: 'Familiar editado exitosamente',
                  duration: 3000
                }).present();
				this.navCtrl.setRoot(HomePage);
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

	showFiles(){
		$('#input_file').click();
	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad EditFamilyPage');

  //   	var fi_in = document.getElementById('input_file');
  // 		var preview = document.getElementById('file_div');

  // 		preview.style.backgroundColor = 'trasnparent';
		// preview.style.backgroundImage = 'url("'+this.f.avatar+'")';
		// preview.style.backgroundSize  = 'cover';
		// preview.style.backgroundPosition = 'center';
		// preview.innerHTML = '+<br>Cambiar Foto';

  // 		fi_in.addEventListener('change' , (e)=>{
		// 	var file    = fi_in.files[0];
		// 	var reader  = new FileReader();

		// 	reader.onloadend = function () {
		// 		preview.style.backgroundColor = 'trasnparent';
		// 		preview.style.backgroundImage = 'url("'+reader.result+'")';
		// 		preview.style.backgroundSize  = 'cover';
		// 		preview.style.backgroundPosition = 'center';
		// 		preview.innerHTML = '+<br>Cambiar Foto';
		// 	}

		// 	if (file) {
		// 	    reader.readAsDataURL(file);
		// 	} else {
		// 	    preview.style.backgroundColor = 'trasnparent';
		// 		preview.style.backgroundImage = 'url("'+this.f.avatar+'")';
		// 		preview.style.backgroundSize  = 'cover';
		// 		preview.style.backgroundPosition = 'center';
		// 		preview.innerHTML = '+<br>Cambiar Foto';
		// 	}
  // 		});
  	}

}
