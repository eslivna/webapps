import {QuizDataService} from './quiz-data.service';
import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Quiz} from './quiz.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class QuizResolver implements Resolve<Quiz> {
  constructor(private _quizDataService: QuizDataService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Quiz> {
    return this._quizDataService.getQuiz(route.params['id']);
  }
}
