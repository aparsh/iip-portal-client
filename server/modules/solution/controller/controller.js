
const respStatus = require("../../../global/responseStatus");
const { getToken, verifyJwt } = require("../../../global/jwt");
const { Notes } = require("../../../models/Notes");
const { Submission } = require("../../../models/Submission");
const { User, AccountType } = require("../../../models/User");
const { message, status, statusCode, response } = require("../../../global/response");
const { Assignment } = require("../../../models/Assignment");
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.submitSolution = async (req, res, next) => {
    try {
        const assignmentId = req.params.assignmentId;
        let assignmet = await Assignment.findById(assignmentId);
        // let user = await User.findById(req.userId);
        let user = req.user;



        if((user === null || user === undefined) || (assignmet === null || assignmet === undefined)){
            res = response(res, status.Failed, message.EntityNotFound, null, statusCode.StatusBadRequest)
            return;
        }

        if(user.type !== AccountType.STUDENT){
            res = response(res, status.Failed, message.Unauthorised, null, statusCode.StatusUnauthorized)
            return;
        }

        const previousSubmission = await Submission.deleteMany({assignment_id: assignmentId, student_id: user._id});

        let submission = new Submission({
            assignment_id: assignmentId,
            student_id: user._id,
            teacher_id: assignmet.teacher_id,
            file: {
                buffer: req.file.buffer,
                contentType: req.file.mimetype
            }
        })

        console.log(submission)

        let savedSubmission = await submission.save();

        if (savedSubmission === undefined || savedSubmission === null) {
            res = response(res, status.Failed, message.ServeError, null, statusCode.StatusInternalServerError)
            return;
        }

        res = response(res, status.Successful, null, null, statusCode.StatusOk)
        return;
    }
    catch (e) {
        console.log(e);
        res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusInternalServerError)
    }
}

exports.allSubmissions = async (req, res, next) => {
    try {
        const assignmentId = req.param.assignmentId;
        let assignmet = await Assignment.findById(assignmentId);
        // let user = await User.findById(req.userId);
        let user = req.user;

        if((user === null || user === undefined) || (assignmet === null || assignmet === undefined)){
            res = response(res, status.Failed, message.EntityNotFound, null, statusCode.StatusBadRequest)
            return;
        }

        if(user.type !== AccountType.TEACHER){
            res = response(res, status.Failed, message.Unauthorised, null, statusCode.StatusUnauthorized)
            return;
        }

        const submissions = await Submission.find(
            {assignment_id: assignmentId},
            {assignment_id:1,student_id:1,submission_time:1,marks_obtained:1,remarks:1});

        if (submissions === undefined || submissions === null) {
            res = response(res, status.Failed, message.EntityNotFound, null, statusCode.StatusInternalServerError)
            return;
        }
        const data = {
            submissions : submissions
        }
        res = response(res, status.Successful, null, data, statusCode.StatusOk)
        return;
    }
    catch (e) {
        console.log(e);
        res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusInternalServerError)
    }
}

exports.downloadSubmission = async (req, res, next) => {
    try {
        const submissionId = req.params.submissionId;
        let submission = await Submission.findById(submissionId);

        if (submission === undefined || submission === null) {
            res = response(res, status.Failed, message.EntityNotFound, null, statusCode.StatusBadRequest)
            return;
        }

        const data = { file: submission.file }
        res = response(res, status.Successful, null, data, statusCode.StatusOk)
        return;
    }
    catch (e) {
        console.log(e);
        res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusInternalServerError)
    }
}

exports.gradeSubmission = async (req, res, next) => {
    try {
        const submissionId = req.params.submissionId;
        let submission = await Submission.findById(submissionId);

        if (submission === undefined || submission === null) {
            res = response(res, status.Failed, message.EntityNotFound, null, statusCode.StatusBadRequest)
            return;
        }

        submission.marks_obtained = req.body.marks_obtained;
        const savedSubmission = await submission.save();

        res = response(res, status.Successful, null, null, statusCode.StatusOk)
        return;
    }
    catch (e) {
        console.log(e);
        res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusInternalServerError)
    }
}