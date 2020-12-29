import express from 'express';
import * as Message from '../controllers/controller_msg';

let router = express.Router();

router.post('/', Message.publish);
router.get('/detail/:from/:to', Message.lookup);
router.get('/:from/:to', Message.contact)

module.exports = router;
