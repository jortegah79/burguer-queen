import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';


import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NgxsModule } from '@ngxs/store';
import { CategoriesState } from 'state/categories/categories.state';
import { ProductsState } from 'state/products/products.state';
import { AuthState } from 'state/auth/auth.state';
import { LoginComponent } from './shared/login/login.component';
import { UsersState } from 'state/users/users.state';
import { StripeState } from 'state/stripe/stripe.state';

export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http,'./assets/i18n/','.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
     IonicModule.forRoot(),
     AppRoutingModule,
     HttpClientModule,
     TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps:[HttpClient]
      }
     }),
     NgxsModule.forRoot([
      CategoriesState,ProductsState,AuthState,UsersState,StripeState
     ]),
     ToolbarComponent,
     FooterComponent,
    //  LoginComponent

    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },NavParams],
  bootstrap: [AppComponent],
})
export class AppModule {}
