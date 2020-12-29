import mongoose from 'mongoose';
const Category = mongoose.model('Category');
const Blog = mongoose.model('Blog');

export const create = async (req,res) => {
    await res.render('category');
}
export const save = async (req,res,next) => {
    var cate = new Category({
        name:req.body.cateName
    });
    try {
        await Category.create(cate);
    } catch (err) {
        return next(err);
    }
    res.redirect('/');
}
export const list = async (req,res) => {
    const docs = await Category.find({}).exec()
    
    let results = docs.map(doc => ({
        id: doc._id,
        name: doc.name,
    }));

    await res.json(results);
}

export const cateBlogs = async (req,res) => {
    let { id }= req.params;
    // let cate = await Category.findOne({_id: id}).exec();
    const blogs = await Blog.find({category: id}).exec();
    await res.json(blogs);
}