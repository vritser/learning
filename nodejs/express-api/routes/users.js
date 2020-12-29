import express from 'express';
import * as User from '../app/controllers/user';
import * as Blog from '../app/controllers/blog';
import * as Category from '../app/controllers/category';
const Upload = require('../app/controllers/upload')
import co from 'co'
import fs from 'fs';

var router = express.Router();

// promise化
const promisify = (fn, receiver) => (...args) => new Promise((resolve, reject) => {
  fn.apply(receiver, [...args, (err, res) => err ? reject(err) : resolve(res)]);
});


let doAsync = () => {
  // return co(()=>{
  //   return new Error('from co')
  // })
  let read = promisify(fs.readFile, fs);
  return read('./package.json', 'utf8').then(data => data)
}
//{}
router.get('/async', async (req, res, next) => {
  try {
    let result = await doAsync();
    return res.render('index', {
      message: result
    })
  } catch (err) {
    console.log(err);
    next(err);
  }
});

/* GET Users listing. */
router.get('/', function (req, res, next) {
  res.render('index', {
    message: req.flash('info')
  });
});
router.get('/login', User.showSignin)
router.get('/register', User.showSignup)
router.post('/user/signIn', User.signIn)
router.post('/user/signUp', User.signUp)
router.get('/user/logout', User.logout)
router.get('/user/check', User.check);

router.get('/admin/blog/new', Blog.create)
router.post('/blog/save', Blog.save)
router.get('/list', Blog.list)
router.get('/blog/detail/:id', Blog.detail)

router.get('/category', Category.list);
router.get('/admin/category/new', User.signInRequired, Category.create);
router.get('/category/blogs',Category.cateBlogs)
router.post('/admin/category', User.signInRequired, Category.save);

router.get('/admin/upload', Upload.uploadView);
router.post('/upload', Upload.upload);

module.exports = router;
