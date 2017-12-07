let mongoose = require('mongoose');

let QuestionSchema = new mongoose.Schema({
    question: String,
    answerOne: String,
    answerTwo: String,
    answerThree: String,
    answerFour: String

});

QuestionSchema.pre('remove', function (next) {
   this.model('Quiz').update({}, {$pull: {questions: this._id}}, {safe: true, multi: true}, next);
    this.model('Result').update({}, {$pull: {questionId: this._id}}, {safe: true, multi: true}, next);
});



mongoose.model('Question', QuestionSchema);