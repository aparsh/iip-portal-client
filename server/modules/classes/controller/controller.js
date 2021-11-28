const respStatus = require("../../../global/responseStatus");
const { getToken, verifyJwt } = require("../../../global/jwt");
const { passwordCheck, passwordHash, User, AccountType } = require("../../../models/User");
const { Class } = require("../../../models/Class");
const { message, status, statusCode, response } = require("../../../global/response");
/**
 * 
 * @param {email, password} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getMyClasses = async (req, res, next) => {
    try {
        // let user = await User.findById(req.userId)
        let user = req.user;
        let classes = await Class.find({class_code: {$in : user.classes}});;

        let data = {
            classes: classes
        }
        res = response(res, status.Successful, null, data, statusCode.StatusOk)
        return;
    }
    catch (e) {
        console.log(e);
        res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusInternalServerError)
        return
    }
}

exports.getAllClasses = async (req, res, next) => {
    try {
        // let user = await User.findById(req.userId)
        let user = req.user;
        let all_classes = await Class.find({});

        let user_classes = new Set(user.classes);
        let classes_data = []

        for (let i = 0; i < all_classes.length; i++) {
            let classData = {
                class_code: all_classes[i].class_code,
                name: all_classes[i].name,
                description: all_classes[i].description,
                joined: user_classes.has(all_classes[i].class_code),
            }

            classes_data.push(classData)
        }

        let data = {
            classes: classes_data
        }
        res = response(res, status.Successful, null, data, statusCode.StatusOk)
        return;
    }
    catch (e) {
        console.log(e);
        res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusInternalServerError)
    }
}


exports.createClass = async (req, res, next) => {
    try {
        // let user = await User.findById(req.userId)
        let user = req.user;

        // if (user.type !== AccountType.TEACHER) {
        //     res = response(res, status.Failed, message.Unauthorised, null, statusCode.StatusUnauthorized)
        //     return;
        // }

        let newClass = new Class({
            class_code: req.body.class_code,
            name: req.body.name,
            description: req.body.description || "",
            teacher_id: user._id
        })

        const savedClass = await newClass.save();

        if (savedClass === undefined || savedClass === null) {
            res = response(res, status.Failed, message.ServeError, null, statusCode.StatusInternalServerError)
            return;
        }

        user.classes.push(savedClass.class_code);

        const savedUser = user.save();

        if (savedUser === undefined || savedUser === null) {
            res = response(res, status.Failed, message.ServeError, null, statusCode.StatusInternalServerError)
            return;
        }

        let data = {
            class: savedClass
        }

        res = response(res, status.Successful, null, data, statusCode.StatusOk)
        return;
    }
    catch (e) {
        console.log(e);
        res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusInternalServerError)
    }
}


exports.joinClass = async (req, res, next) => {
    try {
        const class_code = req.params.classCode;
        // let user = await User.findById(req.userId)
        let user = req.user;
        let newClass = await Class.findOne({ class_code: class_code });

        if ((user === null || user === undefined) || (newClass === null || newClass === undefined)) {
            res = response(res, status.Failed, message.EntityNotFound, null, statusCode.StatusInternalServerError)
            return;
        }

        user.classes.push(newClass.class_code);

        const savedUser = user.save();

        if (savedUser === undefined || savedUser === null) {
            res = response(res, status.Failed, message.ServeError, null, statusCode.StatusInternalServerError)
            return;
        }

        let data = {
            class: newClass
        }

        res = response(res, status.Successful, null, null, statusCode.StatusOk)
        return;
    }
    catch (e) {
        console.log(e);
        res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusInternalServerError)
    }
}
