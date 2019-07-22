const User = require('../models/userSchema');

module.exports = (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies['session'];

  User
    .findByToken(token)
    .then(user => {
      if(!user) {
        const err = new Error('invalid token');
        err.status = 400;
        return next(err);
      }

      req.user = user;
      next();
    });
};
