import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule, Routes} from '@angular/router';
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';

import {QuizComponent} from './quiz/quiz.component';
import {QuestionComponent} from './question/question.component';
import {QuizDataService} from './quiz-data.service';
import {AddQuizComponent} from './add-quiz/add-quiz.component';
import {ResultComponent} from './result/result.component';
import {QuizResolver} from './quiz-resolver.service';
import {QuizListComponent} from './quiz-list/quiz-list.component';
import {ChartComponent} from './chart/chart.component';
import {ChartsModule} from 'ng2-charts';
import {AuthenticationService} from '../user/authentication.service';
import {EditQuizComponent} from './edit-quiz/edit-quiz.component';

const routes = [
  {path: 'create', component: AddQuizComponent},
  {path: 'dashboard', component: QuizListComponent},
  {
    path: 'result/:id', component: ResultComponent,
    resolve: {quiz: QuizResolver}
  },
  {
    path: 'edit/:id', component: EditQuizComponent,
    resolve: {quiz: QuizResolver}
  }
];


@NgModule({
  declarations: [
    QuizComponent,
    QuestionComponent,
    AddQuizComponent,
    ResultComponent,
    QuizListComponent,
    ChartComponent,
    EditQuizComponent
  ],
  imports: [
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    AuthenticationService,
    QuizDataService,
    QuizResolver
  ]
})
export class QuizModule {
}
