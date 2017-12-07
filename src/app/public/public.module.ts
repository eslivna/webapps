import {HomeComponent} from './home/home.component';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {QuizResolver} from '../quiz/quiz-resolver.service';
import {GameComponent} from './game/game.component';
import {QuizDataService} from '../quiz/quiz-data.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes = [
  {path: 'home', component: HomeComponent},
  {
    path: ':id', component: GameComponent,
    resolve: {quiz: QuizResolver}
  }

];

@NgModule({
  declarations: [
    HomeComponent,
    GameComponent,
  ],
  imports: [
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    QuizResolver,
    QuizDataService],
  exports: [
    HomeComponent,
    GameComponent
  ]
})

export class PublicModule {
}
