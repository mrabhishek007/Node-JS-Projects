// 'Debug' is a tiny JavaScript debugging utility modelled after Node.js core's debugging technique. Works in Node.js and web browsers.

const startUpDebugger = require('debug')('app:startup'); // run 'set DEBUG=app:startup' OR 'set DEBUG=app:*' to load this debugging
const dbDebugger = require('debug')('app:db'); // run 'set DEBUG=app:db' OR 'set DEBUG=app:*' to use this debugging
const morgan = require('morgan'); // logs http request
const express = require('express');
const app = express();

//  console.log("Node ENV : " + process.env.NODE_ENV); // inbuilt node func to check environmental variable
//  console.log("Node ENV : "+ app.get('env') ); //another way to check using express
// To enable production/developement mode run 'set NODE_ENV=production/development' in cmd

if(app.get('env') === 'development'){  
    app.use(morgan('tiny'));  
    startUpDebugger('morgon enabled...');  //enables startUpDebugger debugging  (console.log() alternative)
}

// Database Work...
dbDebugger('Connected to the database....');   //enables database debugging

const port = process.env.PORT || 3000;   // 'set PORT = PORT_NO' in cmd to set environmental variable
app.listen(port, () => console.log(`Server listening at port ${port}`));