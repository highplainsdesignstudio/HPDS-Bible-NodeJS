var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');

/* GET home page. */
router.get('/', function(req, res, next) {
  var session = req.session;
  session.loggedIn = true;
  session.sessionID = req.sessionID;

  res.render('index', { title: 'HPDS Bible', session: session });
  // if (session.loggedIn) {
  //   session.save(function() {
  //     res.render('index', { title: 'HPDS Bible', session: session });
  //   });
  // } else {
  //   res.redirect(302, '/login');
  // }
});

router.get('/createAccount', function(req, res, next) {
  res.send({msg: 'you made it.'});
});

router.get('/login', function(req, res, next) {
  if (res.locals.errors) {
    var errors = res.locals.errors;
  } else {
    var errors = null;
  }
  res.render('login', {errors: errors});
});

router.post('/login', [
  check('username', 'username must be a valid email address').isEmail(),
  check('password', 'password must be at least 5 characters long').isLength({min: 5})
], function(req, res, next) {
  const errors = validationResult(req);
  res.render('login', {errors: errors.array()});
});

module.exports = router;
