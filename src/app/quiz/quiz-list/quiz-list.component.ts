import {Component, OnInit} from '@angular/core';
import {QuizDataService} from '../quiz-data.service';
import {Quiz} from '../quiz.model';
import {ActivatedRouteSnapshot} from "@angular/router";
import {AuthenticationService} from "../../user/authentication.service";

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css'],
  providers: [QuizDataService]
})
export class QuizListComponent implements OnInit {
  private _quizzes: Quiz[];

  constructor(private _quizDataService: QuizDataService,
              private _authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this._quizDataService.getQuizzes(this._authenticationService.id).subscribe(items => this._quizzes = items);
  }

  get quizzes() {
    return this._quizzes;
  }

  removeQuiz(quiz: Quiz) {
    this._quizDataService.removeQuiz(quiz).subscribe(item =>
      this._quizzes = this._quizzes.filter(val => item.id !== val.id));
  }

}
