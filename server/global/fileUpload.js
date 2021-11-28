var multer = require('multer');
var fs = require('fs');
var path = require('path');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        console.log(path.join(__dirname + '/uploads/'))
        console.log(file.fieldname);
        console.log(file.mimetype);
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
exports.upload = multer({ storage: storage });


exports.getFileObject = async() => {
    
    const file = {
        data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
        contentType: 'application/pdf'
    }
    return file;
}