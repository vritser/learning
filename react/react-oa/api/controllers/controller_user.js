import mongoose from 'mongoose';
const User = mongoose.model('User');

export const signUp = async (req, res) => {
    let {user} = req.body;
    let doc = await User.findOne({ phone: user.phone }).exec();
    doc && res.json('exists');
    user = await User.create(new User(user));
    return res.json(user);
}
export const addFriend = async (req, res) => {
    let {friendPhone, ownPhone} = req.body;
    let friend = await User.findOne({ phone: friendPhone }).exec();
    let own = await User.findOne({ phone: ownPhone }).exec();
    own.friends.push(friend._id);
    await own.save();
    return res.json('ok')
}
const mapSector = async ids => {
    let docs = [];
    for (let i = 0; i < ids.length; i++) {
        let doc = await User.model('Group').findById(ids[i])
            .populate('sector', '_id name childSector')
            .exec();
        docs.push(doc);
    }
    return docs;
}
// 获取用户所属部门
export const getSector = async (req, res) => {
    let { uid } = req.params;
    let user = await User.findById(uid)
        .populate('sector', '_id name childSector')
        .select('sector')
        .exec();
    let sectors = user.sector.childSector;
    let docs = [];
    if (sectors.length > 0) {
        for (let i = 0; i < sectors.length; i++) {
            let doc = await User.model('Group').findById(sectors[i])
                .populate('sector', '_id name childSector')
                .select('_id name')
                .exec();
            docs.push(doc);
        }
    }
    user.sector.childSector = docs;
    return res.json(user.sector);
}

export const edit = async (req, res) => {
    let doc = await User.findOne({ phone: '13303007025' }).exec();
    let liyi = await User.findOne({ phone: '123456' }).exec();
    // doc.mail = '1429594204@qq.com';
    liyi.friends.push(doc._id)
    liyi = await liyi.save();
    return res.json(liyi);
}

export const friends = async (req, res) => {
    let { uid } = req.params;
    let user = await User.findById(uid)
        .populate('friends', '-friends -password')
        .select('friends')
        .exec();
    return res.json(user.friends)
}

export const signIn = async (req, res) => {
    let { user } = req.body;
    let doc = await User.findOne({ phone: user.phone }).exec();
    if (doc && doc.password === user.password) {
        return res.json(doc);
    }
}