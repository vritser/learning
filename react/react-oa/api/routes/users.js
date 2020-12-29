import express from 'express';
import * as User from '../controllers/controller_user';
import * as Group from '../controllers/controller_group';

let router = express.Router();

/* GET users listing. */
router.get('/', User.edit);
router.get('/friends/:uid', User.friends);
router.post('/signup', User.signUp);
router.post('/signin', User.signIn);
router.post('/friends', User.addFriend)
router.get('/sector/:uid', User.getSector)
// router.get('/groups', Group.create);
router.get('/join', Group.join);
router.get('/:sectorId/members', Group.getMembers);

module.exports = router;
