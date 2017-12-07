import {Question} from './question.model';
import {Result} from './result.model';

export class Quiz {
  private _id: string;
  private _name: string;
  private _userId: string;
  private _questions: Question[];
  private _results: Result[];

  static fromJSON(json): Quiz {
    const quiz = new Quiz(json.name, json._userId, json.questions.map(question => Question.fromJSON(question)), json.results);
    quiz._id = json._id;
    return quiz;
  }

  constructor(name: string, userId: string, questions?: Question[], results?: Result[]) {
    this._name = name;
    this._userId = userId;
    this._questions = questions || [];
    this._results = results || [];
  }

  get id(): string {
    return this._id;
  }

  get questions(): Question[] {
    return this._questions;
  }

  get name(): string {
    return this._name;
  }

  addQuestion(q: Question) {
    this._questions.push(q);
  }

  addResult(r: Result) {
    this._results.push(r);
  }

  set id(value: string) {
    this._id = value;
  }

  set name(value: string) {
    this._name = value;
  }

  set questions(value: Question[]) {
    this._questions = value;
  }

  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }


  get results(): Result[] {
    return this._results;
  }

  set results(value: Result[]) {
    this._results = value;
  }

  containsQuestion(questionId: string): boolean {
    let result = false;
    this._questions.forEach(question => {
      if (question.id === questionId) {
        result = true;
      }
    });
    return result;
  }

  getQuestion(questionId: string): Question {
    let result = null;
    this._questions.forEach(question => {
      if (question.id === questionId) {
        result = question;
      }
    });
    return result;
  }

  toJSON() {
    return {
      _id: this._id,
      name: this._name,
      userId: this._userId,
      questions: this._questions.map(question => question.toJSON()),
      results: this._results.map(result => result.toJSON())
    };
  }
}
