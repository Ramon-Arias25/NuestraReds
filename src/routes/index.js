const express = require('express');
const router = express.Router();

const home = require('../controllers/home');
const image = require('../controllers/image');



module.exports = app => {
  //router.get('/', home.index);
    router.get('/', home.index);
    
    //router.get('/signinup', home.getSignUp);
    router.post('/signup', home.createUser);

    //router.get('/signin', home.getSignIn);
    router.post('/signin', home.login);

    router.get('/home', isAuthenticated, home.home);

    router.get('/logout', home.logout);

    router.get('/images/:image_id', isAuthenticated , image.index);
    router.post('/images', isAuthenticated, image.create);
    router.post('/images/:image_id/like', isAuthenticated, image.like);
    router.post('/images/:image_id/comment', isAuthenticated, image.comment);
    router.delete('/images/:image_id', isAuthenticated, image.remove);
    
    router.get('/profile', isAuthenticated, home.profile);   
    
    function isAuthenticated (req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }else {
            res.redirect('/')
        };
    };
    app.use(router);
};