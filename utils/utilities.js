const constants = require('./constants'); 

exports.getUrl = function (apiName, search = '', authorname = '') {
    let url = '';
    if(apiName === 'GOOGLE') {
        https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=${yourAPIKey}
        url = `${constants.GOOGLE_BOOKS_URL}${search}` + `&key=${constants.GOOGLE_API_KEY}&limit=10`;
    } else {
        if(search) {
            //?  http://openlibrary.org/search.json?q=the+lord+of+the+rings
            url = `${constants.OPEN_LIBRARY_URL}q=${search}&limit=10`;
        } else {
            //? http://openlibrary.org/search.json?author=tolkien
            url = `${constants.OPEN_LIBRARY_URL}author=${authorname}&limit=10`;
        }
    }

return url;
}

exports.analyseSearchInput = function (search) {

    const regex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/gm;

    return (regex.test(search));

}