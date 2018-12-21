// creatng a middleware function where next() is used to pass the control to next middleware.
function log(req, res, next){
    console.log('Logging......')
    next(); // mandatory otherwise response will stuck here and page will never finish loaading
}
module.exports = log;