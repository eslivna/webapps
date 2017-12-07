import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {QuizDataService} from '../../quiz/quiz-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Quiz} from '../../quiz/quiz.model';
import {Question} from '../../quiz/question.model';
import {Result} from '../../quiz/result.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  private _quiz: Quiz;
  public game: FormGroup;

  constructor(private _fb: FormBuilder, private _quizDataService: QuizDataService, private _route: ActivatedRoute,
              private _router: Router) {
  }

  get quiz() {
    return this._quiz;
  }

  ngOnInit() {
    this.game = this._fb.group({
      results: this._fb.array([])
    });

    this._route.data.subscribe(item => this._quiz = item['quiz']);
    this._quiz.questions.forEach(question => {
      console.log(question);
      (this.game.get('results') as FormArray).push(this.createResult(question));
    });
  }

  createResult(question: Question): FormGroup {
    return this._fb.group({
      question: [question],
      answer: new FormControl([]),
    });
  }

  onSubmit() {
    const res = new Result();
    for (const r of this.game.value.results) {
      res.addResult(r.question.id, r.answer);
    }
    this._quiz.addResult(res);
    this._quizDataService.addNewResults(this.quiz, this._quiz.results).subscribe(item => {
      if (item) {
        this._router.navigate(['']);
      }
    });
  }

}
