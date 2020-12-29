var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var BlogSchema = new Schema({
    title: String,
    content: String,
    category: {
        type: ObjectId,
        ref: 'Category'
    },
    author: {
        type: ObjectId,
        ref: 'User'
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

module.exports = BlogSchema;