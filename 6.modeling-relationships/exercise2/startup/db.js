const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function()  {
    // connecting MongoDb
    mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
    .then( result => winston.info('Connected to mongo....')  )
    .catch( err => winston.error('cann\'t connect to mongo....'));  
}

 
