import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
// 请假
const ExcusedSchema = new Schema({
    // 请假类型
    type: { type: String },
    // 请假人
    from: { type: ObjectId, ref: 'User' },
    // 开始时间
    start: { type: Date },
    // 结束时间
    end: { type: Date },
    // 请假天数
    days: { type: Number },
    // 请假事由
    reason: { type: String },
    // 审核人
    approval: { type: ObjectId, ref: 'User' },
});

const Excused = mongoose.model('Excused', ExcusedSchema);

export default Excused;


