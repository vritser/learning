//   EventProxy 使用demo
    // var proxy = new EventProxy();
    // var events = ['blog', 'author', 'category'];
    // try {
    //     proxy.all(events, async (blog, author, category) => {
    //         blog.author = author;
    //         blog.category = category;
    //         await res.render('detail', {
    //             blog: blog,
    //         });
    //     })
    // } catch (err) {
    //     console.log(err);
    //     return next(err);
    // }
    // Blog.findOne({ _id: id }, proxy.done(function (blog) {
    //     if (!blog) {
    //         proxy.unbind();
    //         return;
    //     }
    //     proxy.emit('blog', blog);
    //     User.findById(blog.author, proxy.done(function (author) {
    //         if (!author) {
    //             proxy.unbind();
    //             return;
    //         }
    //         proxy.emit('author', author);
    //     }));
    //     Category.findOne({ _id: blog.category }, proxy.done(function (category) {
    //         if (!category) {
    //             return proxy.unbind();
    //         }
    //         proxy.emit('category', category);
    //     }));
    // }));