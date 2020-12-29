import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
// 群/部门
const GroupSchema = new Schema({
    // 群名称
    name: { type: String },
    // 群头像
    avatar: { type: String },
    // 公告
    notice: { type: String },
    // 成员
    members: [{
        type: ObjectId,
        ref: 'User'
    }],
    // 群图片
    pictures: [{
        picname: { type: String },
        picurl: { type: String }
    }],
    // 群文件
    files: [{
        filename: { type: String },
        fileurl: { type: String }
    }],
    // 二维码
    QRCode: { type: String },
    // 入群验证 
    verify: { type: Boolean, default: false },
    // 置顶
    top: { type: Boolean, default: false },
    // 免打扰
    nodisturb: { type: Boolean, default: false },
    // 主管
    supervisor: { type: ObjectId, ref: 'User' },
    // 上级部门
    preSector: { type: ObjectId, ref: 'Group' },
    // 子部门
    childSector: [{
        type: ObjectId,
        ref: 'Group'
    }],
    // 群主
    master: { type: ObjectId, ref: 'User' },
});

const Group = mongoose.model('Group', GroupSchema);

export default Group;