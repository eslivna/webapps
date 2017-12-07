export class Question {
  private _id: string;
  private _question: string;
  private _answerOne: string;
  private _answerTwo: string;
  private _answerThree: string;
  private _answerFour: string;

  static fromJSON(json): Question {
    const question = new Question(json.question, json.answerOne, json.answerTwo, json.answerThree, json.answerFour);
    question._id = json._id;
    return question;
  }

  constructor(question: string, answersOne: string, answersTwo: string, answersThree: string, answersFour: string) {
    this._question = question;
    this._answerOne = answersOne;
    this._answerTwo = answersTwo;
    this._answerThree = answersThree;
    this._answerFour = answersFour;
  }

  get question(): string {
    return this._question;
  }

  set question(value: string) {
    this._question = value;
  }

  get answerOne(): string {
    return this._answerOne;
  }

  set answerOne(value: string) {
    this._answerOne = value;
  }

  get answerTwo(): string {
    return this._answerTwo;
  }

  set answerTwo(value: string) {
    this._answerTwo = value;
  }

  get answerThree(): string {
    return this._answerThree;
  }

  set answerThree(value: string) {
    this._answerThree = value;
  }

  get answerFour(): string {
    return this._answerFour;
  }

  set answerFour(value: string) {
    this._answerFour = value;
  }


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  toJSON() {
    return {
      _id: this._id,
      question: this._question,
      answerOne:
      this._answerOne,
      answerTwo:
      this._answerTwo,
      answerThree:
      this._answerThree,
      answerFour:
      this._answerFour
    };
  }
}
