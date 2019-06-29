import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePageModule } from '../pages/home/home.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePageModule } from '../pages/welcome/welcome.module';
import { LoginPageModule } from '../pages/login/login.module';
import { SignupPageModule } from '../pages/signup/signup.module';

import { HttpModule } from '@angular/http';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { PersonalObPageModule } from '../pages/personal-ob/personal-ob.module';
import { CreatePersonalObPageModule } from '../pages/create-personal-ob/create-personal-ob.module';
import { DetailPErsonalObPageModule } from '../pages/detail-p-ersonal-ob/detail-p-ersonal-ob.module';
import { EditPersonalObPageModule } from '../pages/edit-personal-ob/edit-personal-ob.module';
import { NotesPageModule } from '../pages/notes/notes.module';
import { CreateNotePageModule } from '../pages/create-note/create-note.module';
import { EditNotePageModule } from '../pages/edit-note/edit-note.module';
import { BlogPageModule } from '../pages/blog/blog.module';
import { DetailNewPageModule } from '../pages/detail-new/detail-new.module';
import { AbourPageModule } from '../pages/abour/abour.module';
import { ConditionsPageModule } from '../pages/conditions/conditions.module';
import { PrivacyPageModule } from '../pages/privacy/privacy.module';
import { Calendar } from '@ionic-native/calendar';
import { EmailComposer } from '@ionic-native/email-composer';
import { VerifycodePageModule } from '../pages/verifycode/verifycode.module';
import { CalendarPageModule } from '../pages/calendar/calendar.module';
import { SharedObPageModule } from '../pages/shared-ob/shared-ob.module';
import { NotificationsPageModule } from '../pages/notifications/notifications.module';
import { MyfamilyPageModule } from '../pages/myfamily/myfamily.module';
import { MyperfilPageModule } from '../pages/myperfil/myperfil.module';
import { CretelistnotePageModule }    from '../pages/cretelistnote/cretelistnote.module';
import { EditlistnotePageModule }    from '../pages/editlistnote/editlistnote.module';
import { CreateFamilyPageModule }    from '../pages/create-family/create-family.module';
import { CreateSharedObjetivePageModule }    from '../pages/create-shared-objetive/create-shared-objetive.module';
import { EditSharedObjetivePageModule }    from '../pages/edit-shared-objetive/edit-shared-objetive.module';
import { DetailSharedObjetivePageModule }    from '../pages/detail-shared-objetive/detail-shared-objetive.module';
import { CreateActivityPageModule }    from '../pages/create-activity/create-activity.module';
import { ViewActivitiesPageModule }    from '../pages/view-activities/view-activities.module';
import { EditActivityPageModule }    from '../pages/edit-activity/edit-activity.module';
import { DetailActivityPageModule }    from '../pages/detail-activity/detail-activity.module';
import { DetailFamilyPageModule }    from '../pages/detail-family/detail-family.module';
import { EditFamilyPageModule }    from '../pages/edit-family/edit-family.module';
import { SendPasswordPageModule }    from '../pages/send-password/send-password.module';
import { ResetPasswordPageModule }    from '../pages/reset-password/reset-password.module';
import { SelectUserPageModule }    from '../pages/select-user/select-user.module';
import { NoteListsPageModule }    from '../pages/note-lists/note-lists.module';
import { DetailCalendarPageModule }    from '../pages/detail-calendar/detail-calendar.module';
import { DetailHourPageModule }    from '../pages/detail-hour/detail-hour.module';
import { CreateFamilyNewPageModule }    from '../pages/create-family-new/create-family-new.module';
import { PipesModule }    from '../pipes/pipes.module';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SendInvitationPageModule } from '../pages/send-invitation/send-invitation.module';
import { InfoSendPageModule } from '../pages/info-send/info-send.module';
import { MyInvitationsPageModule } from '../pages/my-invitations/my-invitations.module';
import { DetailFamilyNewPageModule } from '../pages/detail-family-new/detail-family-new.module';
import { QuestionsPageModule } from '../pages/questions/questions.module';
import { DetailFamilyNoMinePageModule } from '../pages/detail-family-no-mine/detail-family-no-mine.module';
import { InvitationsMyPageModule } from '../pages/invitations-my/invitations-my.module';
import { FoodCalendarPageModule } from '../pages/food-calendar/food-calendar.module';
import { YoungerInviPageModule } from '../pages/younger-invi/younger-invi.module';
import { DetailNotePageModule } from '../pages/detail-note/detail-note.module';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera } from '@ionic-native/camera';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MyApp),
    HomePageModule,
    WelcomePageModule,
    LoginPageModule,
    SignupPageModule,
    PersonalObPageModule,
    CreatePersonalObPageModule,
    DetailPErsonalObPageModule,
    EditPersonalObPageModule,
    NotesPageModule,
    CreateNotePageModule,
    EditNotePageModule,
    BlogPageModule,
    DetailNewPageModule,
    AbourPageModule,
    ConditionsPageModule,
    PrivacyPageModule,
    VerifycodePageModule,CalendarPageModule,SharedObPageModule,NotificationsPageModule,MyperfilPageModule,MyfamilyPageModule,
    CretelistnotePageModule,EditlistnotePageModule,CreateFamilyPageModule,CreateSharedObjetivePageModule,EditSharedObjetivePageModule,
    DetailSharedObjetivePageModule,CreateActivityPageModule,ViewActivitiesPageModule,EditActivityPageModule,DetailActivityPageModule,
    DetailFamilyPageModule,EditFamilyPageModule,SendPasswordPageModule,ResetPasswordPageModule,SelectUserPageModule,PipesModule,NoteListsPageModule,
    SendInvitationPageModule,InfoSendPageModule,MyInvitationsPageModule,InvitationsMyPageModule,DetailHourPageModule,DetailCalendarPageModule,
    CreateFamilyNewPageModule,DetailFamilyNewPageModule,DetailFamilyNoMinePageModule,QuestionsPageModule,FoodCalendarPageModule,YoungerInviPageModule,
    DetailNotePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // HomePage,
    // ListPage,
    // WelcomePage,
    // LoginPage,
    // SignupPage,
    // PersonalObPage,
    // CreatePersonalObPage,
    // DetailPErsonalObPage,
    // EditPersonalObPage,
    // NotesPage,
    // CreateNotePage,
    // EditNotePage,
    // BlogPage,
    // DetailNewPage,
    // AbourPage,
    // ConditionsPage,
    // PrivacyPage,
    // VerifycodePage,CalendarPage,SharedObPage,NotificationsPage,MyperfilPage,MyfamilyPage,
    // CretelistnotePage,EditlistnotePage,CreateFamilyPage,CreateSharedObjetivePage,EditSharedObjetivePage,
    // DetailSharedObjetivePage,CreateActivityPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,Calendar,EmailComposer,InAppBrowser,FileTransfer,FileTransferObject,Camera
  ]
})
export class AppModule {
    
}
