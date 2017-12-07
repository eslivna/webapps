import {Component, OnInit} from '@angular/core';
import {Quiz} from '../quiz.model';
import {ActivatedRoute} from '@angular/router';
import {Question} from '../question.model';

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
    private _quiz: Quiz;

    constructor(private _route: ActivatedRoute) {
    }

    get quiz() {
        return this._quiz;
    }

    ngOnInit() {
        this._route.data.subscribe(item => this._quiz = item['quiz']);
    }

    /**
     *  Calculate the amount of times a question was selected
     * @param {string} questionId The Id of the question
     * @param {string} answer The answer of the question
     * @returns {number} The number of times people selected this answer
     */
    getNumberOfAnswers(questionId: string, answer: string): number {
        let num = 0;
        this._quiz.results.forEach(result => {
            result.results.forEach(item => {
                if (item.questionId === questionId && item.answer === answer) {
                    num++;
                }
            });
        });
        return num;
    }

}



