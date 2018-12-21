const winston = require('winston'); // winston is a simple and universal logging library which creates a log file (.txt)
require('winston-mongodb'); // logging library for mongo db saves the log msgs in mongodb database directly in 'log' collection(table)


module.exports = function () {

/*******************  Handles any Uncaught exception in the application   ********************/

// inbuilt mechanism (node engine provides) to handle the any uncaughtexception in application 
// we should use this bcz we are only handling exceptions those occures during express so we can handle those exceptions which occurs outside the context of express 
    
        // Called when Synchronous Errors occurs
   
    /*  process.on('uncaughtException', (exc) => {
            winston.error(exc.message, exc);
            process.exit(1); // exit the app
        });
    */
       
    // OR use winston to catch any unhandled exception
     
    winston.handleExceptions(
        new winston.transports.Console({colorize: true, preetyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' }));
        

    // Called when Asynchronous Exception occurs ( Subscribing Rejected Unhandled Promises ) 
    process.on('unhandledRejection', (exc) => {
        winston.error(exc.message, exc);
        process.exit(1); // exit the app    
    });
    
    /*************************************************************************************************/
    
        // Setting Up winston 
    winston.add(winston.transports.File, { filename: 'logfile.log' });
    winston.add(winston.transports.MongoDB, { 
        db: 'mongodb://localhost/vidly',
        level: 'error' // user error| info| verbose etc
    });

}