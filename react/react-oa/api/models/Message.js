import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const MessageSchema = new Schema({
    // 消息类型 ：text,img,audio,file etc.
    msgType: { type: String },
    // 消息来源
    from: { type: ObjectId, ref: 'User' },
    // 个体消息去处
    to: { type: ObjectId, ref: 'User' },
    // 群组消息去处
    toGroup: { type: ObjectId, ref: 'Group' },
    // 消息内容
    content: { type: String },
    // 发送时间
    publishTime: { type: Date, default: Date.now() }
});

const Message = mongoose.model('Message', MessageSchema);

export default Message;

// 消息组件：msgType if personal from title