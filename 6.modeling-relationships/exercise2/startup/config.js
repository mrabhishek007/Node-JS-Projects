const config = require('config');

module.exports = function () {
        
    // Set vidly_jwtPrivateKey=mySecureKey before starting this application where mySecureKey is the key
    if(!config.get('jwtPrivateKey')){
        console.error('FATAL ERROR : jwtPrivateKey is not defined...');
        process.exit(1); // exit the app
    }

}