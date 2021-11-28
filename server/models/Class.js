var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var Class = new Schema({
    class_code: {
        type: String,
        required: true
    },
    name: {
        type:  String,
        required: true
    },
    description: {
        type: String
    },
    teacher_id:
    {
        type: String,
        required: true
    }
});


exports.Class = mongoose.model('Class', Class);