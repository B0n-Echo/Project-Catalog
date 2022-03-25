const express = require('express');
const router = express.Router();
const path = require('path')

// var author_controller = require('../controllers/authorController');
var book_controller = require('../controllers/bookController');

/// BOOK ROUTES ///
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

router.get([`/books/:search`, `/books/author/:authorname`],  book_controller.getBooksBySearch);
// router.get(,  book_controller.getBooksBySearch);
  
module.exports = router;