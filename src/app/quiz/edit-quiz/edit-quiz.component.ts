import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Quiz} from '../quiz.model';
import {Question} from '../question.model';
import {QuizDataService} from '../quiz-data.service';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css']
})
export class EditQuizComponent implements OnInit {

  public form: FormGroup;
  private _quiz: Quiz;
  private questionsToDelete: string[] = [];

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,
              private _quizDataService: QuizDataService, private _router: Router) {
  }

  get quiz() {
    return this._quiz;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      questions: this.formBuilder.array([])
    });

    this.route.data.subscribe(item => {
      this._quiz = item['quiz'];
      this.form.get('name').setValue(item['quiz'].name);
      this._quiz.questions.forEach(question => {
        (this.form.get('questions') as FormArray).push(this.createOption(question));
      });

    });
  }

  createOption(question: Question): FormGroup {
    return this.formBuilder.group({
      questionId: question.id,
      question: question.question,
      answerOne: question.answerOne,
      answerTwo: question.answerTwo,
      answerThree: question.answerThree,
      answerFour: question.answerFour
    });
  }

  initItemRows() {
    return this.formBuilder.group({
      questionId: [''],
      question: [''],
      answerOne: [''],
      answerTwo: [''],
      answerThree: [''],
      answerFour: ['']
    });
  }

  addNewRow() {
    const control = <FormArray>this.form.controls['questions'];
    // add new formgroup
    control.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.questionsToDelete.push(this.form.value.questions[index].questionId);
    const control = <FormArray>this.form.controls['questions'];
    // remove the chosen row
    control.removeAt(index);
  }

  onSubmit() {
    this.quiz.name = this.form.value.name;
    for (const q of this.form.value.questions) {
      if (this.quiz.containsQuestion(q.questionId)) {
        const qes = this.quiz.getQuestion(q.questionId);
        qes.question = q.question;
        qes.answerOne = q.answerOne;
        qes.answerTwo = q.answerTwo;
        qes.answerThree = q.answerThree;
        qes.answerFour = q.answerFour;
        this._quizDataService.updateQuestion(qes).subscribe(item => {
          if (item) {
            return true;
          }
        });
      } else {
        const question = new Question(q.question, q.answerOne, q.answerTwo, q.answerThree, q.answerFour);
        this.quiz.addQuestion(question);
        this._quizDataService.addNewQuestion(this.quiz, question).subscribe(item => {
          if (item) {
            return true;
          }
        });
      }
    }

    for (const id of this.questionsToDelete) {
      this._quizDataService.removeQuestion(this.quiz.getQuestion(id)).subscribe(item => {
        if (item) {
          return true;
        }
      });
    }
    this._router.navigate(['quiz/dashboard']);
  }
}
