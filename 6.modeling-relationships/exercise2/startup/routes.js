const bodyParser = require('body-parser');
const movies = require('./../routes/movies');
const genres = require('./../routes/genres');
const customers = require('./../routes/customers');
const rentals = require('./../routes/rentals');
const users = require('./../routes/users');
const auth = require('./../routes/auth');
const error = require('./../middleware/error'); // error handling

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/api/genres', genres);
    app.use('/api/movies' , movies);
    app.use('/api/customers', customers);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);  
    app.use(error); // if any exception occurs it will be handled in error module..
       
}
