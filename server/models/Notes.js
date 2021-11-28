var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var Notes = new Schema({
    uploaded_on: {
        type: Date,
        default: new Date()
    },
    teacher_id:
    {
        type: String,
        required: true
    },
    class_code: {
        type: String,
        required: true
    },
    name: {
        type:  String
    },
    description: {
        type: String
    },
    file:
    {
        buffer: Buffer,
        contentType: String
    }
});


exports.Notes = mongoose.model('Notes', Notes);