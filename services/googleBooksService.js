// const { body,validationResult } = require('express-validator/check');
// const { sanitizeBody } = require('express-validator/filter');
const request = require('request');
const constants = require('../utils/constants');
const utilities = require('../utils/utilities');
const createError = require('http-errors');

exports.getBook = function (title, data_result) {
    return new Promise((resolve, reject) => {
        let url = utilities.getUrl(constants.GOOGLE_BOOKS_URL_IDN, title);
        request.get(url , function(err, res)  {
            if(err || res.statusCode == 400) { 
                let error = err ? err : res.body
                reject (createError(`error in fetching data: ${error}`));
            }

            if(!data_result.apiData) {
                let bookData = JSON.parse(res.body);
                let apiData = [];

                bookData.items.map(info => {
                    let isbn = [];
                    info.volumeInfo.industryIdentifiers.map(idn => {
                       isbn.push( idn.identifier);
                    });
                    apiData.push(
                        {
                            title: info.volumeInfo.title || '',
                            author_name: info.volumeInfo.authors[0] || '',
                            isbn: isbn.slice(0, 5) || '',
                            publish_year: info.volumeInfo.publishedDate.slice(0,4) || '', 
                            publisher: info.volumeInfo.publisher || '',
                        }
                    )
                })
                
                data_result.apiData = apiData;
            }
            resolve(data_result);
        });
    })
}