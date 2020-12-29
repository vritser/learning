var mongoose = require('mongoose')
var config = require('./config')

module.exports = function(){
    var db = mongoose.connect(config.mongodb)

    require('../app/models/user')
    require('../app/models/category')    
    require('../app/models/blog')

    return db;
}