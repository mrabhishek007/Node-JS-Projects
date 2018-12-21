const winston = require('winston');
const app = require('express')();

require('./startup/config')(); // checking jwt private key setup 
require('./startup/logging')(); // handles any exception
require('./startup/db')(); // connecting mongodb
require('./startup/routes')(app); // Module to handle all routes
require('./startup/joi-validation')();
require('./startup/prod')(app);

const PORT = process.env.PORT || 3000 ;
app.listen(3000, winston.info(`Server listening at port ${PORT}......`));