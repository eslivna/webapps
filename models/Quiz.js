let mongoose = require('mongoose');

let QuizSchema = new mongoose.Schema({
    name: String,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
    results: [{type:mongoose.Schema.Types.ObjectId, ref: "Result"}]
});



mongoose.model('Quiz', QuizSchema);