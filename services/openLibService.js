// const { body,validationResult } = require('express-validator/check');
// const { sanitizeBody } = require('express-validator/filter');
const constants = require('../utils/constants');
const request = require('request');
const utilities = require('../utils/utilities');


exports.getBook = function (title, authorname, data_result) {

    return new Promise((resolve, reject) => {

        let url = utilities.getUrl(constants.OPEN_LIBRARY_URL_IDN, title, authorname);
        request.get(url , function(err, res)  {
            if(err || res.statusCode == 400) { 
                let error = err ? err : res.body
                reject (`error in fetching data: ${error}`);
            }
            if(!data_result.apiData) {
                let bookData = JSON.parse(res.body);
                let apiData = [];

                bookData.docs.map(info => {
                    apiData.push(
                        {
                            title: info.title || '',
                            author_name: info.author_name[0] || '',
                            isbn: info.isbn.slice(0, 5) || '',
                            publish_year: info.first_publish_year || '', 
                            publisher: info.publisher[0] || '',
                        }
                    )

                    let key =  info.key;
                })

                data_result.apiData = apiData;
            }
            resolve(data_result);
    })
    });
}
