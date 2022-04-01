const constants = require('../utils/constants');
const request = require('request');
const utilities = require('../utils/utilities');

exports.getQuote = function (req) {
    return new Promise((resolve, reject) => {

          let options = {
            method: 'GET',
            url:constants.QUOTES_URL,                      //'https://api.quotable.io/random?',
            params: {tags: 'technology,famous-quotes'},
          };

          request.get(options, function(err, response) {
            if(err || response.statusCode == 400) { 
                let error = err ? err : response.body
                console.log("🚀 ~ file: quoteController.js ~ line 23 ~ request.get ~ error", error)
                reject (createError(`error in fetching data: ${error}`));
            }

            let {author, content} = JSON.parse(response.body);
            resolve( {author, content} );
          })

        // resolve({ author: 'Nelson Mandela',
        // content:
        //  'If you talk to a man in a language he understands, that goes to his head. If you talk to him in his language, that goes to his heart.' }
    //   )
    })
}