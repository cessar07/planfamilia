import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Events, LoadingController, AlertController} from 'ionic-angular';
import { CreateNotePage } from '../create-note/create-note';
import { EditNotePage } from '../edit-note/edit-note';
import { EditlistnotePage }    from '../editlistnote/editlistnote';
import { DetailNotePage }    from '../detail-note/detail-note';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import * as $ from 'jquery';



/**
 * Generated class for the NotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
      providers: [AuthServiceProvider]
})
export class NotesPage {
	userDetails : any;
	userNotes : any;
    userListNotes : any;
    options:any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController, public auth: AuthServiceProvider) {
  		var data = JSON.parse(localStorage.getItem('userAuth'));
        var not = JSON.parse(localStorage.getItem('userNotes'));
        this.userDetails = data;
        this.options = {year: "numeric", month: "short", day: "numeric"};

        if (!not) {
            let loader : any;
            $.ajax({
                url: this.auth.url+'/searchNotes/'+this.userDetails.id,
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
                localStorage.setItem('userNotes' , JSON.stringify(data.not));
                this.userNotes = JSON.parse(localStorage.getItem('userNotes'));
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
            this.userNotes = not;
            $.each(this.userNotes, (index, val)=> {
                var f = new Date(val.created_at);
                val.format_date = f.toLocaleString("es-ES", this.options);
            });
        }
        this.events.subscribe('editarObjeto',()=>{
            this.userNotes = JSON.parse(localStorage.getItem('userNotes'));

            $.each(this.userNotes, (index, val)=> {
                var f = new Date(val.created_at);
                val.format_date = f.toLocaleString("es-ES", this.options);
            });
        });
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad NotesPage');
  	}

    createNote(){
        this.navCtrl.push(CreateNotePage);
    }

    editNote(p){
        this.navCtrl.push(EditNotePage , {
            n:p,
        });
    }

    viewNote(p){
        this.navCtrl.push(DetailNotePage , {
            n:p,
        });
    }
}
