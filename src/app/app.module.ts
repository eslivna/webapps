import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SharedModule} from './shared/shared.module';
import {PublicModule} from './public/public.module';
import {UserModule} from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    UserModule,
    PublicModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
