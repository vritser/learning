var mongoose = require('mongoose');
// var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
// var saltRounds = 10;

var UserSchema = new Schema({
    name: { type: String },
    loginName: { type: String },
    password: { type: String },
    meta: {
        createAt: { type: Date, default: Date.now() },
        updateAt: { type: Date, default: Date.now() }
    }
})
// UserSchema.pre('save',function(next){
//     var user = this;

//     if(this.isNew){
//         this.meta.createAt = this.meta.updateAt = Date.now();
//     }else{
//         this.meta.updateAt = Date.now();
//     }
//     密码加盐
//     bcrypt.genSalt(saltRounds,function(err,salt){
//         if(err){return next(err);}
//         bcrypt.hash(user.password,salt,function(err,hash){
//             if(err){ return next(err); }
//             user.password = hash;
//             next();
//         });
//     });
// });

UserSchema.methods = {
    //验证密码
    // comparePassword:function(_password,cb){
    //     bcrypt.compare(_password,this.password,function(err,isMatch){
    //         if(err){ return cb(err); }
    //         cb(null,isMatch);
    //     })
    // }
}

UserSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById: function (id) {
        return this
            .findOne({ _id: id })
            .exec();
    }
}

module.exports = UserSchema;
