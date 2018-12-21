const express = require('express');
const bodyparser = require('body-parser');
const generas = require('./routes/generas')
const homePage = require('./routes/home')

const app = express();

//SET THE JSON as Mime-type
app.use(bodyparser.json());
app.use( bodyparser.urlencoded({extended: false}));

// setting up routing
app.use('/api/lists', generas);
app.use('/', homePage);

const port = process.env.PORT || 3000 ;
app.listen(port, () => console.log(`Server listening at port no ${port}....`));