import express from 'express';
import * as Work from '../controllers/controller_work';

let router = express.Router();

router.post('/submit', Work.saveWork)
router.get('/detail',Work.getInstDetail)

module.exports = router;