import mongoose from 'mongoose';
import config from './config';

export default () => {
    const db = mongoose.connect(config.mongodb)

    require('../models/User');
    require('../models/Group');
    require('../models/Message');
    require('../models/Excused');

    return db;
}
