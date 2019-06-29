import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Events, LoadingController, AlertController} from 'ionic-angular';
import { CretelistnotePage }    from '../cretelistnote/cretelistnote';
import { EditlistnotePage }    from '../editlistnote/editlistnote';
import { DetailNotePage }    from '../detail-note/detail-note';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import * as $ from 'jquery';
/**
 * Generated class for the NoteListsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  	selector: 'page-note-lists',
 	templateUrl: 'note-lists.html',
    providers: [AuthServiceProvider]
})
export class NoteListsPage {
	userDetails : any;
	userNotes : any;
    userListNotes : any;
    options:any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController, public auth: AuthServiceProvider) {
  		var data = JSON.parse(localStorage.getItem('userAuth'));
  		var list = JSON.parse(localStorage.getItem('userListNotes'));
  		this.userDetails = data;
  		if (!list) {
            let loader : any;
            $.ajax({
                url: this.auth.url+'/searchNoteslists/'+this.userDetails.id,
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
                localStorage.setItem('userListNotes' , JSON.stringify(data.not_lists));
                this.userListNotes = JSON.parse(localStorage.getItem('userListNotes'));
                this.events.publish('editarObjeto');
                loader.dismiss();
            })
            .fail(()=> {
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
            this.userListNotes = list;
            $.each(this.userListNotes, (index, val)=> {
                var f = new Date(val.created_at);
                val.format_date = f.toLocaleString("es-ES", this.options);
            });
        }

        this.events.subscribe('editarObjeto',()=>{
            this.userListNotes = JSON.parse(localStorage.getItem('userListNotes'));

            $.each(this.userListNotes, (index, val)=> {
                var f = new Date(val.created_at);
                val.format_date = f.toLocaleString("es-ES", this.options);
            });
        });
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad NoteListsPage');
  	}

  	createListNote(){
        this.navCtrl.push(CretelistnotePage);
    }

    editNoteList(p){
        this.navCtrl.push(EditlistnotePage , {
            n:p,
        });
    }

    viewNoteList(p){
        this.navCtrl.push(DetailNotePage , {
            n:p,
        });
    }
}
