export class ResultItem {
  private _questionId: string;
  private _answer: string;

  static fromJSON(json): ResultItem {
    return new ResultItem(json._questionId, json._answer);
  }

  constructor(questionId: string, answer: string) {
    this._questionId = questionId;
    this._answer = answer;
  }

  get questionId(): string {
    return this._questionId;
  }

  set questionId(value: string) {
    this._questionId = value;
  }

  get answer(): string {
    return this._answer;
  }

  set answer(value: string) {
    this._answer = value;
  }

  toJSON() {
    return {
      questionId: this._questionId,
      answer: this._answer
    };
  }
}
