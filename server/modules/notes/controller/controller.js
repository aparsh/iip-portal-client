
const respStatus = require("../../../global/responseStatus");
const { getToken, verifyJwt } = require("../../../global/jwt");
const { Notes } = require("../../../models/Notes");
const { User, AccountType } = require("../../../models/User");
const { message, status, statusCode, response } = require("../../../global/response");
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getClassNotes = async (req, res, next) => {
    try {
        const classCode = req.params.classCode;
        // let user = await User.findById(req.userId);
        let user = req.user;
        let current_class = user.classes.filter(code => code === classCode);

        if (current_class.length == 0) {
            res = response(res, status.Failed, message.Unauthorised, null, statusCode.StatusUnauthorized)
            return;
        }

        let notes = await Notes.find({ class_code: classCode }, { _id: 1, name: 1, description: 1, uploaded_on: 1 });

        if (notes === undefined || notes === null) {
            res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusBadRequest)
            return;
        }

        const data = { notes: notes }
        res = response(res, status.Successful, null, data, statusCode.StatusOk)
        return;
    }
    catch (e) {
        console.log(e);
        res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusInternalServerError)
    }
}


exports.getTeacherNotes = async (req, res, next) => {
    try {
        const teacherId = req.params.teacherId;
        let notes = await Notes.find({ teacher_id: teacherId }, { _id: 1, name: 1, description: 1, uploaded_on: 1 });

        if (notes === undefined || notes === null) {
            res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusBadRequest)
            return;
        }

        const data = { notes: notes }
        res = response(res, status.Successful, null, data, statusCode.StatusOk)
        return;
    }
    catch (e) {
        console.log(e);
        res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusInternalServerError)
    }
}

exports.downloadNotes = async (req, res, next) => {
    try {
        const notesId = req.params.notesId;
        let notes = await Notes.findById(notesId);

        if (notes === undefined || notes === null) {
            res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusBadRequest)
            return;
        }

        const data = { file: notes.file }
        res = response(res, status.Successful, null, data, statusCode.StatusOk)
        return;
    }
    catch (e) {
        console.log(e);
        res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusInternalServerError)
    }
}

exports.uploadNotes = async (req, res, next) => {
    try {
        const userId = req.userId;
        // const user = await User.findById(userId);
        let user = req.user;
        console.log(user)
        
        // if (user.type !== AccountType.TEACHER) {
        //     res = response(res, status.Failed, message.Unauthorised, null, statusCode.StatusUnauthorized)
        //     return;
        // }

        let notes = new Notes({
            teacher_id: userId,
            class_code: req.body.class_code,
            name: req.body.name || "",
            description: req.body.description || "",
            file: {
                buffer: req.file.buffer,
                contentType: req.file.mimetype
            }
        })

        const savedNotes = await notes.save()

        if (savedNotes === undefined || savedNotes === null) {
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