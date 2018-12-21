const mongoose =  require('mongoose');
const bodyparser = require('body-parser');
const express = require('express');
const customers = require('./routes/customers');

mongoose.connect('mongodb://localhost/customers', { useNewUrlParser: true })
    .then( result => console.log('Connected to mongo......'))
    .catch( err => console.log( 'Error : ', err.message ));

 var app = express();

app.use( bodyparser.json() );
app.use( bodyparser.urlencoded({ extended: false }) );

app.use('/api/customers', customers);

const port = process.env.PORT || 3000 ;
app.listen(port, () => console.log(`Server listening at port no ${port}....`));







