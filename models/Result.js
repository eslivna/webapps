let mongoose = require('mongoose');

let ResultSchema = new mongoose.Schema({
    results: [{
        questionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'},
        answer: String
    }]
});

ResultSchema.pre('remove', function (next) {
    this.model('Quiz').update({}, {$pull: {results: this._id}}, {safe: true, multi: true}, next);
});

mongoose.model('Result', ResultSchema);
