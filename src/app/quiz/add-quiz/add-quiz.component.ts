import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuizDataService} from '../quiz-data.service';
import {Router} from '@angular/router';
import {Quiz} from '../quiz.model';
import {Question} from '../question.model';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from "../../user/authentication.service";

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})

/**
 * https://stackoverflow.com/questions/43520010/angular-4-form-formarray-add-a-button-to-add-or-delete-a-form-input-row
 */

export class AddQuizComponent implements OnInit {
  /**
   * A link to the form
   */
  public quiz: FormGroup;

  /**
   *
   * @param {FormBuilder} _fb The formbuilder to use.
   * @param {QuizDataService} _quizDataService The service to load the quiz with
   * @param {Router} _router To set the rout to the next component
   * @param {AuthenticationService} _authService The service to get the id of the logged in user.
   */
  constructor(private _fb: FormBuilder, private _quizDataService: QuizDataService, private _router: Router,
              private _authService: AuthenticationService) {
  }

  ngOnInit() {
    this.quiz = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      questions: this._fb.array([this.initItemRows()])
    });
  }

  initItemRows() {
    return this._fb.group({
      question: [''],
      answerOne: [''],
      answerTwo: [''],
      answerThree: [''],
      answerFour: ['']
    });
  }

  addNewRow() {
    const control = <FormArray>this.quiz.controls['questions'];
    // add new formgroup
    control.push(this.initItemRows());
  }

  deleteRow(index: number) {
    const control = <FormArray>this.quiz.controls['questions'];
    // remove the chosen row
    control.removeAt(index);
  }

  onSubmit() {
    const quiz = new Quiz(this.quiz.value.name, this._authService.id);

    for (const q of this.quiz.value.questions) {
      const question = new Question(q.question, q.answerOne, q.answerTwo, q.answerThree, q.answerFour);
      quiz.addQuestion(question);
    }
    console.log(quiz);
    this._quizDataService.addNewQuiz(quiz).subscribe(item => {
      if (item) {
        this._router.navigate(['quiz/dashboard']);
      }
    });
  }

}
