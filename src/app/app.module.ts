import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { InterceptorProvider } from '../providers/interceptor/interceptor';
import { AuthProvider } from '../providers/auth/auth';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { AdsProvider } from '../providers/ads/ads';
import { CodesProvider } from '../providers/codes/codes';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BuyingProvider } from '../providers/buying/buying';
import { SurveyProvider } from '../providers/survey/survey';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InterceptorProvider,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true },
    AuthProvider,
    Camera,
    AdsProvider,
    CodesProvider,
    BarcodeScanner,
    BuyingProvider,
    SurveyProvider
  ]
})
export class AppModule {}
