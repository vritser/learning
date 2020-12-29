import mongoose from 'mongoose';
import jwt from 'jwt-simple';
// import { v4 } from 'node-uuid';
const User = mongoose.model('User');
const SECRET = 'SECRET';
// const tokens = new Map();
export const showSignin = (req, res) => {
    res.render('login');
}
export const showSignup = (req, res) => {
    res.render('signup');
}
export const signUp = async (req, res) => {
    // const { loginName, password, name} = req.body;
    let user = req.body.user;
    const doc = await User.findOne({ loginName: user.loginName }).exec();
    doc && res.json('exists');
    user = await User.create(new User(user));
    return res.json(user);
}

export const signIn = async (req, res) => {
    const { loginName, password } = req.body;
    const user = await User.findOne({ loginName }).exec();
    if (user && user.password === password) {
        req.flash('info', 'flash is redirect to index')
        // const token = v4();
        // tokens.set(token, user);
        // let exp = new Date(Date.now).setSeconds(30);
        let token = jwt.encode({
            iss: user,
        }, SECRET);
        return res.json({
            user,
            token,
        });
    }
    res.json('failed')
}

export const logout = (req, res) => {
    // tokens.delete(req.query.token);
    delete jwt.decode(req.query.token,SECRET);
    return res.json('ok')
}

//midware for user
export const signInRequired = (req, res, next) => {
    // var user = req.session.loginUser;


    if (!tokens.has('token')) {
        res.send('not login from signIn');
    }

    next();
}

export const check = (req, res) => {
    let { token } = req.query;
    // if (tokens.has(token)) {
    //     let user = tokens.get(token);
    //     return res.json(user)
    // }
    if (token) {
        let user = jwt.decode(token, SECRET).iss;
        return res.json(user);
    }  
    res.end();
}