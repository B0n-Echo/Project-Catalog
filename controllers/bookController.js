// let  Book = require('../models/book');
// const { body,validationResult } = require('express-validator/check');
// const { sanitizeBody } = require('express-validator/filter');
const mongoose = require('mongoose');
const async = require('async');
const googleBookSrvc = require('../services/googleBooksService');
const openLibBookSrvc = require('../services/openLibService');
const nytimesService = require('../services/nytimesService');
const utilities = require('../utils/utilities');
const createError = require('http-errors');

exports.getBooksBySearch = function(req, res) {
    try {
        let data_result = {};
        let search = req.params.search;
        let authorname = req.params.authorname;
        let isISBNSearch =  utilities.analyseSearchInput(search);

        Promise.all([
            isISBNSearch ? '' : (authorname ? '' : googleBookSrvc.getBook(search, data_result )),
            openLibBookSrvc.getBook(search, authorname,  data_result)
        ]).then(() => {
            if (data_result) {
                res.status(200).json(data_result);
              }
              
            //   return { error: 'No book' };
        }).catch(err => {
            res.send(createError(400,err));
        })
      } catch (err) {
        // if the search returns nothing, the Open Library server throws a 500 error!
        res.send(createError(400,err));
      }
};

exports.getbestsellers = function(req, res) {
  try {

    nytimesService.getBestSellers()
    .then(response => {
    console.log("🚀 ~ file: bookController.js ~ line 42 ~ response", response)
      res.send(response);
    })
    .catch(err => {
      res.send(createError(400,err));
    }) 
    
  } catch (error) {
  console.log("🚀 ~ file: bookController.js ~ line 40 ~ error", error)
    thrrow(createError(400,err));
  }
}