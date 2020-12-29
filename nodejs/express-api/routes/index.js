var express = require('express');
var router = express.Router();
// var user = require('../app/controllers/user');

/* GET home page. */
router.get('/', function(req,res) {
    res.render('ejs',{
        names : ['1','2','3']
    });
});

module.exports = router;