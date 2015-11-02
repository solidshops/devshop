'use strict';

module.exports = function () {

    return function (req, res, next) {
        req.rawBody = '';
        //req.setEncoding('utf8');

        req.on('data', function (chunk) {
            req.rawBody += chunk;
        });

        next();
    };
};