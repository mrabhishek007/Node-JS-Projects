 // _id: 5b8c2cf7f208ea336c362711

 // 12 bytes
    // 4 bytes : timestamp
    // 3 bytes : machine identifier
    // 2 bytes : process identifier
    // 3 bytes : counter

// 1 byte = 8 bytes
// 2 ^ 8  = 256 char
// 2 ^ 24 = 16M char

// Object id is created by MongoDb Driver 

const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId();
console.log('Mongo Id : ',id); // unique id is generated

const timestamp = id.getTimestamp();
console.log('Id genration time : ', timestamp);

const isIdValid = mongoose.Types.ObjectId.isValid('5b8c2cf7f208ea336c362711') 
console.log(isIdValid); // true