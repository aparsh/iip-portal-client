var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var File = new Schema({
    name: {
        type:  String
    },
    file:
    {
        buffer: Buffer,
        contentType: String
    }
});


exports.File = mongoose.model('File', File);