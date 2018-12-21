/*     VALID IMPORT
const log = require('./logger');
log.log(' Hey there! '); //valid
*/

const Logger = require('./logger');
const logger = new Logger();

//Register a listener
logger.addListener("msg-emitter", function(eventArgs){     // emitter.on() is exactly same as emitter.addListener() {Use any between these two}
    console.log("Msg Event is called") ;
    console.log("Data : " + eventArgs) ;
});

logger.log();




