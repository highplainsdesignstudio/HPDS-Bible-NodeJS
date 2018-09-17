var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');

/* POST users listing. */
router.post('/',[
  check('username', 'username must be a valid email address').isEmail(),
  check('password', 'password must be at least 5 characters long').isLength({min: 5})
], function(req, res, next) {
  // res.append('Access-Control-Allow-Origin', '*');
  const errors = validationResult(req);
  // res.locals.errors = errors.array();
  res.send({ errors: errors.array()});
  // res.render('login', {errors: errors.array()});
  // res.redirect('/');
});

module.exports = router;
