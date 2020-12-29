import mongoose from 'mongoose';
const Group = mongoose.model('Group');

// 加入团队、部门
export const join = async (req, res) => {
    // let {uid, gid} = req.body;
    // let group = Group.findById(gid)
    //     .select('')
    //     .exec();

    // let group = await Group.findById('58071026adefb911b8f66a5f').exec();
    // let group2 = await Group.findOne({ name: '开发部' }).exec();
    let usr = await Group.model('User').findOne({ phone: '13303007025' }).exec();
    // let usr = await Group.model('User').findById(uid).exec();
    // usr.sector.push(group._id)
    // usr = await usr.save();
    // group.members.pop();
    // group.childSector.push(group2._id);
    // group2.preSector = group._id;
    // await group2.save();
    // group = await group.save();
    usr.sector = '58071026adefb911b8f66a5f';
    usr = await usr.save();
    return res.json(usr);
}
// 根据部门id获取成员和子部门
export const getMembers = async (req, res) => {
    let {sectorId} = req.params;
    // let gid = '58071026adefb911b8f66a5f';
    let group = await Group.findById(sectorId)
        .populate('members', '_id nickname')
        .select('members preSector childSector')
        .exec();
    return res.json(group);
}

// 添加子部门
export const create = async (req, res) => {
    // let {group} = req.body;
    let group = {
        name: '开发部',
        master: '57fd8e24608a7c32e08a4edd'
    }
    let doc = await Group.create(new Group(group));
    return res.json(doc);
}