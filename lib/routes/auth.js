const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()

.post('/signup', (req, res, next) => {

})

  .post('/signin', (req, res, next) => {
    const {
        email,
        password
    } = req.body,

    User 
    .findOne({ email })
    .then(user => {
        const isValidPassword = user.compare(password);
        if(isValidPassword) {
            // set the session cookie
            //send user
            const token = user.authToken();
            res.cookie('session', token);
            res.send(user);
        } else {
            //set status code to 401
            //invoke next with error
            const err = new Error('invalid email/password');
            err.status = 401;
            next(err)
        }
    });
})

    .get('/verify', ensureAuth, (req, res, next) => {
        res.send(req.user);
    });


