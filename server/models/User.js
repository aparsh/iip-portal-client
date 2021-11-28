var mongoose = require('mongoose')
//require('mongoose-type-email');
var bcrypt = require('bcrypt')
const saltRounds = 10;
var Schema = mongoose.Schema;

const AccountType = {
    STUDENT:"STUDENT",
    TEACHER:"TEACHER",
    ADMIN:"ADMIN"
}
exports.AccountType = AccountType;

var User = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: AccountType.STUDENT
    },
    classes: [],

});

exports.passwordCheck = (textPassword, hash)=>{
    return bcrypt.compareSync(textPassword, hash);
}

exports.passwordHash = (textPassword)=>{
    return bcrypt.hashSync(textPassword, saltRounds);
}

exports.User = mongoose.model('User', User);