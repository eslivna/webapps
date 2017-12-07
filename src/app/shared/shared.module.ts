import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {NavigationComponent} from './navigation/navigation.component';
import {FooterComponent} from './footer/footer.component';
import {AuthenticationService} from '../user/authentication.service';
import {RouterModule} from '@angular/router';


@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    RouterModule
  ],
  declarations: [
    NavigationComponent,
    FooterComponent
  ],
  exports: [
    NavigationComponent,
    FooterComponent
  ],
  providers: [AuthenticationService]
})

export class SharedModule {
}
