import {Injectable} from '@angular/core';
import {Quiz} from './quiz.model';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Question} from './question.model';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../user/authentication.service';
import {Result} from './result.model';


@Injectable()
export class QuizDataService {
  private _appUrl = 'http://localhost:4200/API';

  constructor(private http: Http, private auth: AuthenticationService) {
  }

  get quizzes(): Observable<Quiz[]> {
    return this.http.get(`${this._appUrl}/quizzes`, {headers: new Headers({Authorization: `Bearer ${this.auth.token}`})})
      .map(response => response.json().map(item => Quiz.fromJSON(item)));

  }

  getQuizzes(userId): Observable<Quiz[]> {
    return this.http.get(`${this._appUrl}/quizzes/${userId}`, {headers: new Headers({Authorization: `Bearer ${this.auth.token}`})})
      .map(response => response.json().map(item => Quiz.fromJSON(item)));

  }


  getQuiz(id): Observable<Quiz> {
    return this.http.get(`${this._appUrl}/quiz/${id}`)
      .map(response => response.json()).map(item => Quiz.fromJSON(item));
  }

  addNewQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post(`${this._appUrl}/quizzes`, quiz.toJSON(), {headers: new Headers({Authorization: `Bearer ${this.auth.token}`})})
      .map(res => res.json()).map(item => Quiz.fromJSON(item));
  }

  addNewResults(quiz: Quiz, result: Result[]): Observable<Result> {
    return this.http.post(`${this._appUrl}/quiz/${quiz.id}/results`, result,
      {headers: new Headers({Authorization: `Bearer ${this.auth.token}`})})
      .map(res => res.json()).map(item => Result.fromJSON(item));
  }

  addNewQuestion(quiz: Quiz, question: Question): Observable<Question> {
    return this.http.post(`${this._appUrl}/quiz/${quiz.id}/question`, question,
      {headers: new Headers({Authorization: `Bearer ${this.auth.token}`})})
      .map(res => res.json()).map(item => Question.fromJSON(item));
  }

  updateQuestion(question: Question): Observable<Question> {
    return this.http.put(`${this._appUrl}/question/${question.id}`, question)
      .map(res => res.json()).map(item => Question.fromJSON(item));
  }

  removeQuestion( question: Question): Observable<Question> {
    return this.http.delete(`${this._appUrl}/question/${question.id}`, question)
      .map(res => res.json()).map(item => Question.fromJSON(item));
  }

  removeQuiz(quiz) {
    return this.http.delete(`${this._appUrl}/quiz/${quiz.id}`).map(res => res.json()).map(item => Quiz.fromJSON(item));
  }


}
