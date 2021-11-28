const jwt = require("jsonwebtoken")
const { User, AccountType } = require("../models/User")
const { response, status, statusCode, message } = require("./response");
const respStatus = require("./responseStatus");


exports.getToken = async (payloadObject) => {
    let token = jwt.sign(payloadObject, process.env.SECRET_KEY);
    return token;
}

exports.verifyJwt = async (req, res, next) => {
    let authHeader = req.headers["authorization"];
    let token = authHeader.split(" ")[1];
    if (token == null) {
        res = response(res, status.Failed, message.AuthenticationFailed, null, statusCode.StatusUnauthorized)
        return;
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
        if (err) {
            res = response(res, status.Failed, message.AuthenticationFailed, null, statusCode.StatusUnauthorized)
            return;
        }

        const checkUser = await User.findById(user._id);

        if (!checkUser) {
            res = response(res, status.Failed, message.EntityNotFound, null, statusCode.StatusNotFound)
            return;
        }

        req.userId = user._id;
        req.user = checkUser;
        next();
    })
}

exports.verifyTeacher = (req, res, next) => {
    let user = req.user;

    if (user.type !== AccountType.TEACHER) {
        res = response(res, status.Failed, message.Unauthorised, null, statusCode.StatusUnauthorized)
        return;
    }

    next();
}