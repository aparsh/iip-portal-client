
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
exports.getDetails = async (req, res, next) => {
    try {
        // let user = await User.findById(req.userId);
        let user = req.user;

        if((user === null || user === undefined)){
            res = response(res, status.Failed, message.EntityNotFound, null, statusCode.StatusBadRequest)
            return;
        }

        const data = {
            user: user
        }

        res = response(res, status.Successful, null, data, statusCode.StatusOk)
        return;
    }
    catch (e) {
        console.log(e);
        res = response(res, status.Failed, message.SomethingWentWrong, null, statusCode.StatusInternalServerError)
    }
}