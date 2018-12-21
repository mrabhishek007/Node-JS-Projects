/* Internally node executes every module like this : 
      ( function(exports, require, module, __filename,  __dirname){
              business logic.................
        } 
      )
 */

const EventEmitter = require('events');

class Logger extends EventEmitter{
    log(){
        this.emit('msg-emitter', {id: 1, "url": 'https://www.google.com'}) ;
    }
}

// module.exports.log = log ;  // VALID EXPORT

module.exports = Logger;


