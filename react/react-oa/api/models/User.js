import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const UserSchema = new Schema({
    name: { type: String },
    nickname: { type: String },
    password: { type: String },
    birthday: { type: Date },
    avatar: { type: String },
    //所属部门
    sector: { type: ObjectId, ref: 'Group' },
    mail: { type: String },
    phone: { type: String },
    friends: [{ type: ObjectId, ref: 'User' }],
    meta: {
        createAt: { type: Date, default: new Date().toISOString() },
        updateAt: { type: Date, default: new Date().toISOString() }
    }
});

const User = mongoose.model('User', UserSchema);

export default User;