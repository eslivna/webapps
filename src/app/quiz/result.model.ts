import {ResultItem} from './result-item.model';

export class Result {
  private _results: ResultItem[];

  static fromJSON(json): Result {
    return new Result(json._results);
  }


  constructor(result?: ResultItem[]) {
    this._results = result || [];
  }


  get results(): ResultItem[] {
    return this._results;
  }

  set results(value: ResultItem[]) {
    this._results = value;
  }

  addResult(questionId: string, answer: string) {
    this._results.push(new ResultItem(questionId, answer));
  }


  toJSON() {
    return {
      results: this._results
    };
  }
}
