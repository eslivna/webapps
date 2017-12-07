import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quiz} from '../quiz.model';
import {QuizDataService} from '../quiz-data.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {

  @Input() public quiz: Quiz;
  @Output() public deleteQuiz = new EventEmitter<Quiz>();

  removeQuiz() {
    this.deleteQuiz.emit(this.quiz);
  }

}
