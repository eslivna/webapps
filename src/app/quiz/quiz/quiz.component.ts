import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quiz} from '../quiz.model';
import {PlatformLocation} from '@angular/common';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

    @Input() public quiz: Quiz;
    @Output() public deleteQuiz = new EventEmitter<Quiz>();

    constructor( public location: PlatformLocation) {
    }

    ngOnInit() {
    }

    removeQuiz() {
        this.deleteQuiz.emit(this.quiz);
    }

    get url(){
        return (this.location as any).location;

    }

}
