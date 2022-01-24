require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const loadLoginPage = (req,res) => {
    const error = req.query.error;
    res.render('login', {error}); 
};

const loadRegisterPage = (req,res) => {
    const error = req.query.error;
    res.render('register', {error});
};

const handleRegister = (req,res) => {
    let error = '';
    const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // validate the informations
    if (req.body.username.length < 6 || req.body.username.length > 20) {
        error = 'username must be between 6 and 20 characters';
    }else if (!req.body.email.toLowerCase().match(email_regex)) {
        error = 'invalid email format';
    }else if (req.body.password.length < 6 || req.body.password.length > 30) {
        error = 'password must be between 6 and 30 characters';
    }else if (req.body.password !== req.body.repeated_password) {
        error = 'passwords are not Identical';
    }
    // checking for errors
    if (error) {
        res.redirect(`/register?error=${error}`);
    }else {
        try{
            (async () =>{
                await User.create({username: req.body.username , email: req.body.email, password: req.body.password});
                res.redirect(`/login`);
            })();
        }catch(err) {
            console.log(err.message);
        }
    }
}

const handleLogin = (req,res) => {
    let error = '';

    (async () =>{
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            error = 'email is not found';
            res.redirect(`/login?error=${error}`);
        }else if(req.body.password < 6){
            error = 'password is incorrect';
            res.redirect(`/login?error=${error}`);
        }else{
            await user.comparePasswords(req.body.password).then((result) => {
                if (!result) {
                    error = 'password is incorrect';
                    res.redirect(`/login?error=${error}`);
                }else{
                    console.log(user);
                    const userToken = jwt.sign(user.toJSON(),process.env.JWT_ACCESS_SECRET);
                    console.log(userToken);
                    res.redirect('/home');
                }
            }).catch((err) => console.log(err.message))
        }  
    })();

}

module.exports = {
    loadLoginPage,
    loadRegisterPage,
    handleRegister,
    handleLogin
}