const respStatus = require("../../../global/responseStatus");
const {getToken, verifyJwt} = require("../../../global/jwt");
const {passwordCheck, passwordHash, User, AccountType} = require("../../../models/User");
const {message, status, statusCode, response} = require("../../../global/response");
/**
 * 
 * @param {email, password} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.login = async (req, res, next) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let user = await User.findOne({email:email});
        if(!user){
            res = response(res, status.Failed, message.EntityNotFound, null, statusCode.StatusNotFound)
            next()
        }
        if(!passwordCheck(password,user.password)){
            res = response(res, status.Successful, message.WrongPassword, null, statusCode.StatusOk)
            next()
        }
        let data = {
            username: user.username,
            token: await getToken({_id : user._id})
        }
        res = response(res, status.Successful, null, data, statusCode.StatusOk)
        next()
    }
    catch (e) {
        console.log(e);
        res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusInternalServerError)
        return;
    }
}


/**
 * 
 * @param {username, password, email, AccountType} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.register = async (req, res, next) => {
    try {
        let oldUser = await User.findOne({$or:[{email: req.body.email},{username: req.body.username}]});
        if(oldUser){
            console.log(oldUser)
            if(oldUser.email === req.body.email)
                res = response(res, status.Failed, message.EmailExists, null, statusCode.StatusOk)
            else
                res = response(res, status.Failed, message.UsernameExists, null, statusCode.StatusOk)
            return;
        }

        let user = new User({
            username: req.body.username,
            password: passwordHash(req.body.password),
            email: req.body.email,
            type: req.body.type
        });

        let savedUser = await user.save();

        // let user = await User.create(user);

        if(!savedUser){
            res = response(res, status.Failed, message.EntityNotSaved, null, statusCode.StatusInternalServerError)
            return;
        }

        let data = {
            username: savedUser.username,
            token: await getToken({_id : savedUser._id})
        }

        res = response(res, status.Successful, null, data, statusCode.StatusOk)
    }
    catch (e) {
        console.log(e);
        res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusInternalServerError)
    }
}

