let Request = require("request");

describe("Server", () => {
    let server;
    let quizId;
    beforeAll(() => {
        server = require("../app");
    });
    afterAll(() => {
    });
    describe("POST /API/quizzes", () => {
        let data = {};
        // add a new quiz to our database
        beforeAll((done) => {
            Request({
                method: 'POST',
                uri: 'http://localhost:3000/API/quizzes',
                json: true,
                body: [{
                    name: 'test',
                    userId: process.env.TEST_USER_ID,
                    questions:
                        [{
                            question: 'testQuestion',
                            answerOne: 'testAnswerOne',
                            answerTwo: 'testAnswerTwo',
                            answerThree: 'testAnswerThree',
                            answerFour: 'testAnswerFour'
                        }],
                    results: []
                }]
            }, (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            }).auth(null, null, true, process.env.TEST_VALID_TOKEN);
        });
        it("status 200", () => {
            expect(data.status).toBe(200);
        });
        it("check body", () => {
            expect(data.body.name).toBe("test");
            expect(data.body.userId).toBe(process.env.TEST_USER_ID);
            expect(data.body.questions.length).toBe(1);
            expect(data.body.results.length).toBe(0);
            expect(data.body._id).toBeDefined();
            quizId = data.body._id;
        });
    });

    describe("GET /API/quizzes", () => {
        let data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3000/API/quizzes", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
            }).auth(null, null, true, process.env.TEST_VALID_TOKEN);
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            expect(data.body.length).toBe(1);
            let quiz = data.body[0];
            expect(quiz.name).toBe("test");
            expect(quiz.questions.length).toBe(1);
            expect(quiz.results.length).toBe(0);
        });
    });
    describe("DELETE /API/quiz", () => {
        let data = {};
        beforeAll((done) => {
            Request.delete(`http://localhost:3000/API/quiz/${quizId}`, (error, response, body) => {
                data.status = response.statusCode;
                done();
            }).auth(null, null, true, process.env.TEST_VALID_TOKEN);
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });

    });
    describe("GET /API/quizzes", () => {
        let data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3000/API/quizzes", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
            }).auth(null, null, true, process.env.TEST_VALID_TOKEN);
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            expect(data.body.length).toBe(0);
        });
    });
});
