import { Component, ViewChild , enableProdMode } from '@angular/core';
import { Nav, Platform , Events , AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage }       from '../pages/home/home';
import { WelcomePage }    from '../pages/welcome/welcome';
import { PersonalObPage } from '../pages/personal-ob/personal-ob';
import { NotesPage } from '../pages/notes/notes';
import { BlogPage } from '../pages/blog/blog';
import { AbourPage } from '../pages/abour/abour';
import { ConditionsPage } from '../pages/conditions/conditions';
import { PrivacyPage } from '../pages/privacy/privacy';
import { LoginPage } from '../pages/login/login';
import { CalendarPage } from '../pages/calendar/calendar';
import { SharedObPage } from '../pages/shared-ob/shared-ob';
import { NotificationsPage } from '../pages/notifications/notifications';
import { NoteListsPage } from '../pages/note-lists/note-lists';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { OneSignal } from '@ionic-native/onesignal'; 
import { EmailComposer } from '@ionic-native/email-composer';
import { InvitationsMyPage } from '../pages/invitations-my/invitations-my';
import { MyInvitationsPage } from '../pages/my-invitations/my-invitations';
import { DetailFamilyNewPage } from '../pages/detail-family-new/detail-family-new';
import { MyfamilyPage } from '../pages/myfamily/myfamily';
import { YoungerInviPage } from '../pages/younger-invi/younger-invi';
import { DetailPErsonalObPage }    from '../pages/detail-p-ersonal-ob/detail-p-ersonal-ob';


import * as $ from 'jquery';
enableProdMode();

@Component({
  templateUrl: 'app.html',
  providers: [OneSignal, AuthServiceProvider]
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = WelcomePage;

    pages: Array<{title: string, component: any}>;

    userDetails : any = [];

    banner : any;
    srcI : any;
    srcIVerify : any = null;
    urlBanner : any;
    constructor(public alertCtrl: AlertController,public events: Events,private emailComposer: EmailComposer,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private oneSignal: OneSignal, public auth: AuthServiceProvider) {
        this.initializeApp();
        var data = JSON.parse(localStorage.getItem('userAuth'));
        if (data) {
            this.userDetails = data;
        }
        this.pages = [
            { title: 'Home', component: HomePage },
            { title: 'Personal', component: PersonalObPage } 
        ];

        this.events.subscribe('editarObjeto',()=>{
            this.userDetails  = JSON.parse(localStorage.getItem('userAuth'));
            this.handlerNotifications();
        })

        this.events.subscribe('reloadBanners',()=>{
            // var ban = JSON.parse(localStorage.getItem('banner'));
            // this.banner = ban;
            $.ajax({
                method: "GET",
                url: this.auth.url+'/getBannerFirst',
            }).done((data)=>{
                if (data.success == true) {
                    this.banner = data.banner;
                    if (this.banner && this.banner.status == 1) {
                        this.srcIVerify = true;
                        setTimeout(()=>{
                            let h = document.querySelectorAll('ion-content #grid2');
                            Array.from(h).forEach((e)=>{
                                let p = e.childNodes[1].childNodes[3];
                                let srcI = this.auth.url+'/files/'+this.banner.file_name;
                                let link = this.banner.link;
                                (p as HTMLElement).innerHTML = this.banner.code;
                                // (p as HTMLElement).innerHTML = '<a href="'+link+'" target="_blank"><img src="'+srcI+'" /></a>';
                            });
                            this.srcI = this.auth.url+'/files/'+this.banner.file_name;
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
            }).fail((err)=>{
                console.log(err); 
            })
        })
    }

  initializeApp() { 
    this.platform.ready().then(() => {
      this.handlerNotifications();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
      this.statusBar.show();

        // if (this.banner && this.banner.status == 1) {
        //     this.srcIVerify = true;
        //     setTimeout(()=>{
        //         let h = document.querySelectorAll('ion-content #grid2');
        //         console.log(h);
        //         Array.from(h).forEach((e)=>{
        //             let p = e.childNodes[1].childNodes[3];
        //             let srcI = this.auth.url+'/files/'+this.banner.file_name;
        //             let link = this.banner.link;
        //             (p as HTMLElement).innerHTML = this.banner.code;
        //             // (p as HTMLElement).innerHTML = '<a href="'+link+'" target="_blank"><img src="'+srcI+'" /></a>';
        //         });
        //         this.srcI = this.auth.url+'/files/'+this.banner.file_name;
        //     } , 200);
        // }

        $.ajax({
            method: "GET",
            url: this.auth.url+'/getBannerFirst',
        }).done((data)=>{
            if (data.success == true) {
                this.banner = data.banner;
                if (this.banner && this.banner.status == 1) {
                    if (localStorage.getItem('userAuth')) {
                        this.srcIVerify = true;
                    }
                    setTimeout(()=>{
                        let h = document.querySelectorAll('ion-content #grid2');
                        Array.from(h).forEach((e)=>{
                            let p = e.childNodes[1].childNodes[3];
                            let srcI = this.auth.url+'/files/'+this.banner.file_name;
                            let link = this.banner.link;
                            (p as HTMLElement).innerHTML = this.banner.code;
                            // (p as HTMLElement).innerHTML = '<a href="'+link+'" target="_blank"><img src="'+srcI+'" /></a>';
                        });
                        this.srcI = this.auth.url+'/files/'+this.banner.file_name;
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
        }).fail((err)=>{
            console.log(err); 
        })

        if (localStorage.getItem('userAuth')) {
            this.srcIVerify = true;
        }else{
            this.srcIVerify = null;
        }
    });
  }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }

    removeAdd(){
        // $('#las_pu_fixed').remove();
        this.srcIVerify = null;
    }

    backToWelcome(){
        this.nav.setRoot(WelcomePage);
    }

    logout(){
        this.srcIVerify = null;
        localStorage.clear();
        setTimeout(() => this.backToWelcome(), 50);
    }

    personalOb(){
        this.nav.push(PersonalObPage);
    }

    blog(){
        this.nav.push(BlogPage);
    }

    notes(){
        this.nav.push(NotesPage);
    }

    about(){
        this.nav.push(AbourPage);
    }

    privacy(){
        this.nav.push(PrivacyPage);
    }

    conditions(){
        this.nav.push(ConditionsPage);
    }

    calendar(){
        this.nav.push(CalendarPage);
    }

    sharedOb(){
        this.nav.push(SharedObPage);
    }

    notifications(){
        this.nav.push(NotificationsPage);
    }

    lists(){
        this.nav.push(NoteListsPage);
    }

    help(){
        let email = {
          to: 'lauraparicio@hotmail.com',
          cc: this.userDetails.email,
          subject: 'Soporte técnico',
          body: 'Describenos tu problema!',
          isHtml: true
        };

        this.emailComposer.open(email);
    }

    actBlock(){
        this.alertCtrl.create({
            title: 'Oops!',
            subTitle: 'Esta actividad esta reservada para usuarios mayores de edad',
            buttons: ['OK']
        }).present();
    }

    actBlock2(){
        this.alertCtrl.create({
            title: 'Oops!',
            subTitle: 'Para cerrar sesion en la aplicacion, selecciona nuevamente tu perfil como mayor de edad',
            buttons: ['OK']
        }).present();
    }

    private handlerNotifications(){
        if (this.platform.is('cordova')) {
            this.oneSignal.startInit('1a293554-ae60-4471-9f6b-2b64b56933b0', '852798236448');
            this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
            this.oneSignal.handleNotificationReceived()
              .subscribe(()=>{
            });
            this.oneSignal.handleNotificationOpened() 
            .subscribe(jsonData => {
                let data = jsonData.notification.payload.additionalData;
                localStorage.removeItem('userNotifications');
                // localStorage.setItem('userNotifications' , JSON.stringify(data.notifications));
                this.events.publish('editarObjeto'); 
                if (data.type == "inviToMe") {
                    localStorage.removeItem("InvitationMy");
                    this.events.publish('editarObjeto');
                    this.nav.push(InvitationsMyPage);
                }

                if (data.type == "inviMineR") {
                    this.nav.push(MyInvitationsPage , { 
                        f:data.family
                    });
                }

                if (data.type == "inviMineA") {
                    localStorage.removeItem("userFamilies"); 
                    this.events.publish('editarObjeto');
                    this.events.publish('editarObjeto3');
                    this.nav.push(MyfamilyPage);
                }

                if (data.type == "actNew") {
                    localStorage.removeItem("userActivity"); 
                    this.events.publish('editarObjeto');
                    this.nav.setRoot(HomePage);
                }

                if (data.type == "shaNew") {
                    localStorage.removeItem("userShaOb"); 
                    this.events.publish('editarObjeto');
                    this.nav.setRoot(HomePage);
                }

                if (data.type == "objClose") {
                    this.nav.push(DetailPErsonalObPage , {
                        p:data.p
                    });
                }

                if (data.type == "newYoung") {
                    localStorage.removeItem("InvitationYounger");
                    this.nav.push(YoungerInviPage);
                }

                if (data.type == "newYoungChang") {
                    localStorage.removeItem("InvitationYounger");
                    localStorage.removeItem("userActivity"); 
                    this.nav.setRoot(HomePage);
                }

                if (data.type == "newYoungRech") {
                    this.nav.setRoot(HomePage);
                }

                if (data.type == "newYoungAcep") {
                    this.nav.setRoot(HomePage);
                }

                if (data.type == "noteNew") {
                    localStorage.removeItem("userNotes");
                    this.nav.push(NotesPage);
                }

                if (data.type == "listNew") {
                    localStorage.removeItem("userListNotes");
                    this.nav.push(NoteListsPage);
                }

                if (data.type == "actView") {
                    localStorage.removeItem("userActivity"); 
                    this.nav.setRoot(HomePage);
                }

                if (data.type == "hourView") {
                    localStorage.removeItem("userActivity"); 
                    this.nav.setRoot(HomePage);
                }

                if (data.type == "shaView") {
                    localStorage.removeItem("userShaOb"); 
                    this.nav.setRoot(HomePage);
                }

                if (data.type == "foodView") {
                    localStorage.removeItem("userActivity"); 
                    this.nav.setRoot(HomePage);
                }
            });
            this.oneSignal.endInit();

            this.oneSignal.getIds().then((ids)=> {
                localStorage.setItem('oneSignalIdFamilia',ids.userId);
                let onesignalId = localStorage.getItem('oneSignalIdFamilia');
                let user = localStorage.getItem('userAuth');

                if (user) {
                    $.ajax({
                        method: "POST",
                        url: this.auth.url+'/saveOnesignalId',
                        data: {user_id:JSON.parse(user).id,onesignal_id:onesignalId},
                    }).done((suc)=>{
                        console.log(suc);
                    }).fail((err)=>{
                        console.log(err); 
                    })
                }
            });
        }
    }
}
