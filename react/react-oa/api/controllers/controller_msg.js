import mongoose from 'mongoose';
import moment from 'moment';
const Message = mongoose.model('Message');
const User = mongoose.model('User');

mongoose.Promise = Promise;

export const publish = async (req, res) => {
    let { msg } = req.body;
    let doc = await Message.create(new Message(msg));
    return res.json(doc);
}

export const lookup = async (req, res) => {
    let { from, to } = req.params;
    let docs = await Message.find({ '$or': [{ from: to, to: from }, { from, to }] })
        .populate('from to', '_id nickname')
        .exec();
    docs = docs.map(doc => {
        doc.publishTime = moment(doc.publishTime).format('HH:mm');
        return doc;
    })
    return res.json(docs);
}

export const contact = async (req, res) => {
    let {from, to} = req.params;
    let doc = await Message.findOne({ from, to })
        .populate('from', '_id nickname')
        .select('-to')
        .sort('-publishTime')
        .exec();
    if (doc)
        doc.publishTime = moment(doc.publishTime).format('HH:mm');
    else {
        let usr = await User.findById(from).exec();
        doc = { _id: usr._id, from: { _id: usr._id, nickname: usr.nickname }, publishTime: new Date(), content: '' }
    }
    return res.json(doc);
}