var express = require('express');
var router = express.Router();

var Bible = require('../bin/Bible.js');

/* GET book chapter. */
router.get('/:version/:book/:chapter', Bible.getBible, function(req, res, next) {
  res.append('Access-Control-Allow-Origin', '*');
  res.send({bible: res.locals.bibleJSON, chapterCount: res.locals.chapterCount});
});

/* GET versions, */
router.get('/getDetails', [Bible.getVersions, Bible.getBooks, Bible.getChapterCount], function(req, res, next) {
  var versions = res.locals.versions;
  var books = res.locals.books;
  var chapterCount = res.locals.chapterCount;
  res.append('Access-Control-Allow-Origin', '*');
  res.send({versions: versions, books: books, chapterCount: chapterCount});
});



module.exports = router;