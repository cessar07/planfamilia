import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Events, LoadingController, AlertController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DetailNewPage }    from '../detail-new/detail-new';

import * as $ from 'jquery';

/**
 * Generated class for the BlogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-blog',
  templateUrl: 'blog.html',
        providers: [AuthServiceProvider]
})
export class BlogPage { 
	news : any;
    options:any;
    skip:any = 0;
    constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,public alertCtrl: AlertController, public auth: AuthServiceProvider) {
        this.options = {year: "numeric", month: "short", day: "numeric"};
        let loader : any;
        $.ajax({
            url: this.auth.url+'/searchBlog',
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
            localStorage.setItem('news' , JSON.stringify(data.news));
            this.news = JSON.parse(localStorage.getItem('news'));
            $.each(this.news, (index, val)=> {
                var f = new Date(val.created_at);
                val.format_date = f.toLocaleString("es-ES", this.options);
            });

            this.skip = 10;
            console.log(this.skip);
            setTimeout(()=>{
                loader.dismiss();
                $('.no_s').toggle();
            }, 1000)
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

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad BlogPage');
  	}

  	viewNew(p){
  		this.navCtrl.push(DetailNewPage , {
            n:p
        });
  	}

    showMore(){
        let loader : any;
        $.ajax({
            url: this.auth.url+'/showMoreBlog/'+this.skip,
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
            if (data.count < 1) {
                loader.dismiss();
                $('.no_s').hide();
                this.alertCtrl.create({
                    title: 'Oops!',
                    subTitle: 'No hay mas resultados para mostrar',
                    buttons: ['OK']
                }).present();
            }else{
                let news = JSON.parse(JSON.stringify(data.news));
                $.each(news, (index, val)=> {
                    var f = new Date(val.created_at);
                    val.format_date = f.toLocaleString("es-ES", this.options);
                    this.news.push(val);
                });
                this.skip = this.skip + 10;
                console.log(this.skip);
            }
            setTimeout(()=>{
                loader.dismiss();
            }, 1000)
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
}
