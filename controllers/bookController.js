// let  Book = require('../models/book');
// const { body,validationResult } = require('express-validator/check');
// const { sanitizeBody } = require('express-validator/filter');
const mongoose = require('mongoose');
const async = require('async');
// const googleBookSrvc = require('../services/googleBooksService');
// const openLibBookSrvc = require('../services/openLibService');
// const utilities = require('../utils/utilities');


exports.getBooksBySearch = function(req, res) {
    // try {
    //     let data_result = {};
    //     let search = req.params.search;
    //     let isISBNSearch =  utilities.analyseSearchInput(search);



    //     Promise.all([
    //         isISBNSearch ? '' : googleBookSrvc.getBook(search,data_result ),
    //         openLibBookSrvc.getBook(search, data_result)
    //     ]).then(() => {
    //         if (data_result) {
    //             res.status(200).json(data_result);
    //           }
              
    //         //   return { error: 'No book' };
    //     }).catch(err => {
    //         res.send(createError(400,err));
    //     })
    //   } catch (err) {
    //     // if the search returns nothing, the Open Library server throws a 500 error!
    //     return { error: err };
    //   }
};