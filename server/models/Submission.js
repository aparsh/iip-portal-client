var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var Submission = new Schema({
    assignment_id: {
        type: String,
        required: true
    },
    student_id:{
        type: String,
        required: true
    },
    submission_time: {
        type: Date,
        default: new Date()
    },
    marks_obtained: {
        type: Number
    },
    file:
    {
        data: Buffer,
        contentType: String
    },
    remarks: {
        type: String
    }
});


exports.Submission = mongoose.model('Submission', Submission);