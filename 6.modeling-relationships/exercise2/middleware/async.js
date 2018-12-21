
// A way to remove try catch block from our main logic and handle it here
module.exports = function (handler) { // 'handler' is a function which contains logic of routing different routes
    return async (req, res, next) => {    // returning a function structure so that express will pass 'req, res, next' as a parameter 
        try{
            await handler(req, res);
        }
        catch(exc){
            next(exc); // control going to index.js where it will be handled..
        }
    }; 
}

/* Same functionality can be achieved by using 'express-async-errors' ( node library ). Just load it at
  starting of app (index.js) & it will take care of try & catch block. No need to write any extra code other than that */