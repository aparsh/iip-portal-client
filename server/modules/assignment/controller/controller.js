const respStatus = require("../../../global/responseStatus");
const { getToken, verifyJwt } = require("../../../global/jwt");
const { User, AccountType } = require("../../../models/User");
const { Assignment } = require("../../../models/Assignment");
const { Submission } = require("../../../models/Submission");
const { message, status, statusCode, response } = require("../../../global/response");

/**
 * 
 * @param {email, password} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.dueAssignments = async (req, res, next) => {
    try {
        let userId = req.userId;
        // let user = await User.findById(userId);
        let user = req.user;

        if (!user) {
            res = response(res, status.Failed, message.EntityNotFound, null, statusCode.StatusNotFound)
            next()
        }

        let assignments = await Assignment.find(
            { class_code: { $in: user.classes } },
            { teacher_id: 1, name: 1, description: 1, start_time: 1, end_time: 1, total_marks: 1, class_code: 1 },
            { sort: { start_time: 1 } });

        if (assignments === undefined || assignments === null) {
            res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusBadRequest)
            return;
        }

        let dueAssignments = []

        for (let i = 0; i < assignments.length; i++) {
            let assignment = assignments[i];
            let sub = await (Submission.exists({ assignment_id: assignment._id, student_id: userId }))
            if(sub){
                dueAssignments.push(assignment)
            }
        }

        let data = {
            assignments: dueAssignments
        }
        res = response(res, status.Successful, null, data, statusCode.StatusOk)
        return
    }
    catch (e) {
        console.log(e);
        res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusInternalServerError)
    }
}

/**
 * 
 * @param {email, password} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.dueAssignmentsByClass = async (req, res, next) => {
    try {
        let userId = req.userId;
        const class_code = req.params.classCode
        // let user = await User.findById(userId);
        let user = req.user;

        if (!user) {
            res = response(res, status.Failed, message.EntityNotFound, null, statusCode.StatusNotFound)
            next()
        }

        let assignments = await Assignment.find(
            { class_code: class_code },
            { teacher_id: 1, name: 1, description: 1, start_time: 1, end_time: 1, total_marks: 1, class_code: 1 },
            { sort: { start_time: 1 } });

        if (assignments === undefined || assignments === null) {
            res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusBadRequest)
            return;
        }

        let dueAssignments = []

        for (let i = 0; i < assignments.length; i++) {
            let assignment = assignments[i];
            let sub = await (Submission.exists({ assignment_id: assignment._id, student_id: userId }))
            if(!sub){
                dueAssignments.push(assignment)
            }
        }

        let data = {
            assignments: dueAssignments
        }
        res = response(res, status.Successful, null, data, statusCode.StatusOk)
        return
    }
    catch (e) {
        console.log(e);
        res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusInternalServerError)
    }
}

/**
 * 
 * @param {email, password} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.pastAssignments = async (req, res, next) => {
    try {
        let userId = req.userId;
        // let user = await User.findById(userId);
        let user = req.user;

        if (!user) {
            res = response(res, status.Failed, message.EntityNotFound, null, statusCode.StatusNotFound)
            next()
        }

        let assignments = await Assignment.find(
            { class_code: { $in: user.classes } },
            { teacher_id: 1, name: 1, description: 1, start_time: 1, end_time: 1, total_marks: 1, class_code: 1 },
            { sort: { start_time: 1 } });

        if (assignments === undefined || assignments === null) {
            res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusBadRequest)
            return;
        }

        let pastAssignments = []

        for (let i = 0; i < assignments.length; i++) {
            let assignment = assignments[i];
            let sub = await (Submission.exists({ assignment_id: assignment._id, student_id: userId }))
            if(sub){
                pastAssignments.push(assignment)
            }
        }

        let data = {
            assignments: pastAssignments
        }
        res = response(res, status.Successful, null, data, statusCode.StatusOk)
        return
    }
    catch (e) {
        console.log(e);
        res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusInternalServerError)
    }
}

/**
 * 
 * @param {email, password} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.pastAssignmentsByClass = async (req, res, next) => {
    try {
        let userId = req.userId;
        const class_code = req.params.classCode
        // let user = await User.findById(userId);
        let user = req.user;

        if (!user) {
            res = response(res, status.Failed, message.EntityNotFound, null, statusCode.StatusNotFound)
            next()
        }

        let assignments = await Assignment.find(
            { class_code: class_code },
            { teacher_id: 1, name: 1, description: 1, start_time: 1, end_time: 1, total_marks: 1, class_code: 1 },
            { sort: { start_time: 1 } });

        if (assignments === undefined || assignments === null) {
            res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusBadRequest)
            return;
        }

        let pastAssignments = []

        for (let i = 0; i < assignments.length; i++) {
            let assignment = assignments[i];
            let sub = await (Submission.exists({ assignment_id: assignment._id, student_id: userId }))
            if(sub){
                pastAssignments.push(assignment)
            }
        }

        let data = {
            assignments: pastAssignments
        }
        res = response(res, status.Successful, null, data, statusCode.StatusOk)
        return
    }
    catch (e) {
        console.log(e);
        res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusInternalServerError)
    }
}


/**
 * 
 * @param {email, password} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.allAssignmentsByClass = async (req, res, next) => {
    try {
        let userId = req.userId;
        const class_code = req.params.classCode
        // let user = await User.findById(userId);
        let user = req.user;

        if (!user) {
            res = response(res, status.Failed, message.EntityNotFound, null, statusCode.StatusNotFound)
            next()
        }

        let assignments = await Assignment.find(
            { class_code: class_code },
            { teacher_id: 1, name: 1, description: 1, start_time: 1, end_time: 1, total_marks: 1, class_code: 1 },
            { sort: { start_time: 1 } });

        

        let data = {
            assignments: assignments
        }
        
        res = response(res, status.Successful, null, data, statusCode.StatusOk)
        return
    }
    catch (e) {
        console.log(e);
        res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusInternalServerError)
    }
}


exports.downloadAssinment = async (req, res, next) => {
    try {
        const assignmentId = req.params.assignmentId;
        let assignmet = await Assignment.findById(assignmentId);

        if (assignmet === undefined || assignmet === null) {
            res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusBadRequest)
            return;
        }

        const data = { file: assignmet.file }
        res = response(res, status.Successful, null, data, statusCode.StatusOk)
        return;
    }
    catch (e) {
        console.log(e);
        res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusInternalServerError)
    }
}


exports.uploadAssignment = async (req, res, next) => {
    try {
        const userId = req.userId;
        // const user = await User.findById(userId);
        let user = req.user;
        console.log(user)

        // if (user.type !== AccountType.TEACHER) {
        //     res = response(res, status.Failed, message.Unauthorised, null, statusCode.StatusUnauthorized)
        //     return;
        // }

        let assignment = new Assignment({
            teacher_id: userId,
            class_code: req.body.class_code,
            name: req.body.name,
            description: req.body.description || "",
            file: {
                buffer: req.file.buffer,
                contentType: req.file.mimetype
            },
            start_time: req.body.startTime || new Date(),
            end_time: req.body.startTime || new Date(),
        })

        const savedAssignment = await assignment.save()

        if (savedAssignment === undefined || savedAssignment === null) {
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