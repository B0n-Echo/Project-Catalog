const constants = require('../utils/constants');
const request = require('request');
const utilities = require('../utils/utilities');

exports.getBestSellers = function () {
    return new Promise(function (resolve, reject) {
        const options = {
            url: `${constants.NYTIMES_URL}list=paperback-nonfiction&api-key=${constants.NYTIMES_API_KEY}`,
            method: "GET",
            headers: {
              Accept: "application/json"
            }
          };

          request.get(options, function(err, response) {
            if(err || response.statusCode == 400) { 
                let error = err ? err : response.body
                console.log("🚀 ~ file: quoteController.js ~ line 23 ~ request.get ~ error", error)
                reject (createError(response.statusCode,`error in fetching data: ${error}`));
            }

            let xyz = JSON.parse(response.body);
            resolve( xyz.results);
          })


    })
}