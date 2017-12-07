import {NgModule} from '@angular/core';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from '../user/auth-guard.service';

const appRoutes: Routes = [
  {
    path: 'quiz',
    canActivate: [ AuthGuardService ],
    loadChildren: 'app/quiz/quiz.module#QuizModule'
  },
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
