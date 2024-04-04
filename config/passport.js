const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const {user}=require('../models')
const customFields = {
    usernameField: 'email',
    passwordField: 'pass'
};

const verifyCallback = (email, pass, done) => {
   
    user.findOne({where:{email}})
        .then((user) => {

            if (!user) { return done(null, false,{ message: 'Incorrect Email.' }) }
            
            bcrypt.compare(pass, user.dataValues.pass, async(err, result)=> {
                console.log("Result: "+result);
                if (result) {
                    return done(null, user.dataValues);
                } else {
                    return done(null, false,{ message: 'Incorrect Password.' });
                }
            });               
        })
        .catch((err) => {   
            done(err);
        });

}

const strategy  = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

//serialize sets the userID to req.session.passport.user
passport.serializeUser((user, done) => {
    done(null, user.email);
});

//just after that userID is retrieved from req.session.passport.user and user is set to req.user

passport.deserializeUser((email, done) => {

    user.findOne({where:{email}})
        .then((user) => {
            const {email,name} = user;

            done(null, {email,name});
        })
        .catch(err => done(err))
});

