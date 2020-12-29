var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})

var upload = multer({ storage: storage }).single('upfile');

exports.uploadView = (req, res) => {
    res.render('upload');
}

exports.upload = (req, res) => {
    upload(req, res, function (err) {
        if(err) console.log('er:',err);
        res.write('/'+req.file.filename);
        res.end();
    })
}