import mongoose from 'mongoose';
const Blog = mongoose.model('Blog')
const Category = mongoose.model('Category')
const User = mongoose.model('User')
import EventProxy from 'eventproxy';
import redis from 'redis';
import bluebird from 'bluebird';

const client = redis.createClient();
bluebird.promisifyAll(redis.RedisClient.prototype);
// bluebird.promisifyAll(redis.Multi.prototype);

client.on('error', err => {
    console.log('redis error:', err);
})

mongoose.Promise = Promise;

export const create = async (req, res) => {
    const categories = await Category.find({}).exec();
    return res.render('admin', {
        categories: categories,
        blog: {}
    });
}

export const save = async (req, res) => {
    let blog = new Blog(req.body.blog);
    let doc = await Blog.create(blog);
    let cate = await Category.findOne({ _id: blog.category }).exec();
    cate.blogs.push(doc._id);
    cate.save();
    return res.json(doc);
}

export const list = async (req, res) => {
    let { page } = req.query;
    page = parseInt(page, 10) || 1;
    let size = 2;
    let blogs = await client.getAsync('blogs_page_' + page)
    if (blogs) {
        return res.json(JSON.parse(blogs));
    } else {
        blogs = await Blog.find().skip((page - 1) * size).limit(size).exec();
        client.set('blogs_page_' + page, JSON.stringify(blogs), redis.print);
        client.expire('blogs_page_' + page, 10);
        return res.json(blogs);
    }
}

export const detail = async (req, res, next) => {
    let { id } = req.params;

    let blog = await Blog.findOne({ _id: id }).exec();
    const author = await User.findById(blog.author);
    const category = await Category.findOne({ _id: blog.category }).exec();

    blog = {...blog._doc, author, category }

    return res.render('detail', {
        blog: blog,
    });
}
