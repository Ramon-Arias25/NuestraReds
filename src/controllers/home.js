const ctrl = {};
const { Image, User } =require ('../models/index');
const sidebar = require('../helpers/sidebar');
const passport = require('passport');

ctrl.index = (req,res, next) => {
    res.render('signinup');
};

ctrl.home = async (req,res) => {
    const images = await Image.find().sort({timestamp: -1});
    let viewModel = { images: []};
    viewModel.images = images;
    if (images){
            viewModel = await sidebar(viewModel);
    }
    viewModel.user = req.user
    res.render('home' , viewModel);
};

ctrl.createUser = (passport.authenticate('local-signup' , {
    successFlash: '/home',
    failureRedirect: '/',
    passReqToCallback: true
})); 

ctrl.getSignIn = (req,res, next) =>{
    res.render('signin');
};

ctrl.login = passport.authenticate('local-signin',{
    successRedirect: '/home',
    failureRedirect: '/',
    passReqToCallback: true
});

ctrl.logout = (req, res, next) => {
    req.logOut();
    res.redirect('/');
};

ctrl.profile =  (req,res, next) =>{
    res.render('profile');
};

module.exports = ctrl;