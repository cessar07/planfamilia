// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
// @Injectable()
import * as $ from 'jquery';
export class AuthServiceProvider {
    srcIVerify : any;
	constructor(){
		// var ban = JSON.parse(localStorage.getItem('banner'));
  //       let banner = ban;
        // let url = 'http://localhost/plandefamilia/public/';
        let url = 'https://appfamilia.plandefamilia.es';
        // if (banner && banner.status == 1) {
        // 	document.querySelectorAll('ion-content');
        //     setTimeout(()=>{
        //         let h = document.querySelectorAll('ion-content #grid2');
        //         console.log(h)
        //         Array.from(h).forEach((e)=>{
        //             let p = e.childNodes[1].childNodes[3];
        //             let srcI = url+'/files/'+banner.file_name;
        //             let link = banner.link;
        //             (p as HTMLElement).innerHTML = banner.code;
        //             // (p as HTMLElement).innerHTML = '<a href="'+link+'" target="_blank"><img src="'+srcI+'" /></a>';
        //         })
        //     } , 200);
        // }
        $.ajax({
            method: "GET",
            url: url+'/getBannerFirst',
        }).done((data)=>{
            if (data.success == true) {
                let banner = data.banner;
                if (banner && banner.status == 1) {
                    this.srcIVerify = true;
                    setTimeout(()=>{
                        let h = document.querySelectorAll('ion-content #grid2');
                        Array.from(h).forEach((e)=>{
                            let p = e.childNodes[1].childNodes[3];
                            let srcI = url+'/files/'+banner.file_name;
                            let link = banner.link;
                            (p as HTMLElement).innerHTML = banner.code;
                            // (p as HTMLElement).innerHTML = '<a href="'+link+'" target="_blank"><img src="'+srcI+'" /></a>';
                        });
                        let srcI = url+'/files/'+banner.file_name;
                    } , 200);
                }else{
                    this.srcIVerify = null;
                    setTimeout(()=>{
                        let h = document.querySelectorAll('ion-content #grid2');
                        Array.from(h).forEach((e)=>{
                            let p = e.childNodes[1].childNodes[3];
                            // let srcI = this.auth.url+'/files/'+this.banner.file_name;
                            // let link = this.banner.link;
                            (p as HTMLElement).style.display = 'none';
                            // (p as HTMLElement).innerHTML = '<a href="'+link+'" target="_blank"><img src="'+srcI+'" /></a>';
                        });
                    } , 200);
                }
            }else{
                this.srcIVerify = true;
                setTimeout(()=>{
                    let h = document.querySelectorAll('ion-content #grid2');
                    Array.from(h).forEach((e)=>{
                        let p = e.childNodes[1].childNodes[3];
                        // let srcI = this.auth.url+'/files/'+this.banner.file_name;
                        // let link = this.banner.link;
                        (p as HTMLElement).style.display = 'none';
                        // (p as HTMLElement).innerHTML = '<a href="'+link+'" target="_blank"><img src="'+srcI+'" /></a>';
                    });
                } , 200);
            }
        }).fail((err)=>{
            console.log(err); 
        })
	}

  // url = 'http://localhost/plandefamilia/public/';
  url = 'https://appfamilia.plandefamilia.es';
}
