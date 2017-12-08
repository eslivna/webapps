var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let jwt = require('express-jwt');

let Quiz = mongoose.model('Quiz');
let Question = mongoose.model('Question');
let Result = mongoose.model('Result');

let auth = jwt({secret: process.env.BACKEND_SECRET, userProperty: 'payload'});

/* GET home page. */
router.get('/API/quizzes/', auth, function (req, res, next) {
    let query = Quiz.find().populate('questions').populate("results");
    query.exec(function (err, quizzes) {
        if (err) return next(err);
        res.json(quizzes);
    })
});

router.get('/API/quizzes/:userId', auth, function (req, res, next) {
    let query = Quiz.find({'userId': req.params.userId}).populate('questions').populate("results");
    query.exec(function (err, quizzes) {
        if (err) return next(err);
        res.json(quizzes);
    })
});

router.post('/API/quizzes/', auth, function (req, res, next) {
    let quiz = new Quiz({name: req.body.name, userId: req.body.userId});
    for (var i = 0; i < req.body.questions.length; i++) {
        let question = new Question(req.body.questions[i]);
        question.save(function (err, post) {
                if (err) return err;
                question.id = post._id;
                quiz.questions.push(question);
                quiz.save(function (err, post) {
                    if (err) return next(err);
                    res.json(post);
                });
            }
        );
    }
});


router.param('quiz', function (req, res, next, id) {
    let query = Quiz.findById(id);
    query.exec(function (err, quiz) {
        if (err) return next(err);
        if (!quiz) return next(new Error('not found ' + id));
        req.quiz = quiz;
        return next();
    });
});

router.get('/API/quiz/:quiz', function (req, res) {
    req.quiz.populate('questions').populate('results', function (err, quiz) {
        if (err) return next(err);
        res.json(quiz);
    });


});

router.delete('/API/quiz/:quiz', function (req, res, next) {
    Question.remove({_id: {$in: req.quiz.questions}}, function (err) {
        if (err) return next(err);
        req.quiz.remove(function (err) {
            if (err) return next(err);
            res.json(req.quiz);
        });
    });
});

router.delete('/API/question/:id', function (req, res, next) {
    // Result.find({'results.questionId': req.params.id}, function (err, results) {
    //     if(err) return next(err);
    //     results.forEach(result =>{
    //         console.log('GVD');
    //         console.log(result);
    //     })
    // });


    Question.remove({_id: req.params.id}, function (err, deletedQuestion) {
        if (err) return next(err);
        res.json(deletedQuestion);
    });

});


router.post('/API/quiz/:quiz/results', function (req, res, next) {
    for (var i = 0; i < req.body.length; i++) {
        let result = new Result(req.body[i]);
        result.save(function (err, post) {
                if (err) return err;
                result._id = post._id;
                req.quiz.results.push(result);
                req.quiz.save(function (err, post) {
                    if (err) return next(err);
                });
            }
        );
    }
    return res.json(req.quiz);
});

router.post('/API/quiz/:quiz/question', function (req, res, next) {
    let question = new Question(req.body);
    question.save(function (err, post) {
            if (err) return err;
            question.id = post._id;
            req.quiz.questions.push(question);
            req.quiz.save(function (err, post) {
                if (err) return next(err);
            });
        }
    );
    return res.json(req.quiz);
});

router.put('/API/question/:id', function (req, res) {
    Question.findByIdAndUpdate(req.params.id,
        {$set: req.body}, {new: true},
        function (err, updatedQuestion) {
            if (err) return err;
            res.json(updatedQuestion);
        }
    )
})
;
module.exports = router;
