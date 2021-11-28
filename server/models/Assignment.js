var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var Assignment = new Schema({
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
    teacher_id: {
        type: String,
        required: true
    },
    file:
    {
        buffer: Buffer,
        contentType: String
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    total_marks: {
        type: Number,
    }
});


exports.Assignment = mongoose.model('Assignment', Assignment);