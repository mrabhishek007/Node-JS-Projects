const winston = require('winston');
module.exports = function (err, req, res, next) {

    winston.error( err.message, err)
    // winston can perform following operations :: 
    // error
    // warn
    // info
    // verbose
    // debug
    // silly
 
    res.status(500).send('Connection to server failed...');
    console.log('Error : ', err.message);
}