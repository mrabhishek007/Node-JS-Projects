const config = require('config'); //Node-config organizes hierarchical configurations for your app deployments.
const express = require('express');
const bodyparser = require("body-parser");//Parse incoming request bodies in a middleware before your handlers .
const logger = require('./middleware/logger');
const helmet = require('helmet'); //Helmet helps you secure your Express apps by setting various HTTP headers .
const morgan = require('morgan'); //logs http request
const courses = require('./routes/courses');
const homePage  = require('./routes/home')
const app = express();

 // pug is a templating engine used to generate dynamic html and return it to client (other alternatives are Mustache, EJS)
app.set('view engine', 'pug'); // internally export will import the pug (node need to load manually)
app.set('views', './views'); // [Optional] overriding default folder location for templates (html) (./views is default anyway)

// Setting JSON as Mime-type
app.use(bodyparser.json());
// It basically tells the system whether you want to use a simple algorithm for shallow parsing (i.e. false) or complex algorithm for deep parsing that can deal with nested objects (i.e. true).
app.use(bodyparser.urlencoded( {extended: true} ) ); 

app.use(express.static('./public'));
app.use(helmet());

app.use(logger); // using custom middleware

// setting up router (default url pattern is api/courses)
app.use('/api/courses', courses);

// setting home page router
app.use('/', homePage);

// Configuration 
console.log('Application Name : ' + config.get('name'));
console.log('Mail Server : ' + config.get('mail.name'));
console.log('Mail Password : ' + config.get('mail.password')); // set Mail Password using 'set app_password=000'

 if(app.get('env') === 'development'){   // returns the current project environmental variable status
    app.use(morgan('tiny'));  
    console.log('morgon enabled...')
}

const port = process.env.PORT || 3000;   // 'set PORT=PORT_NO' in cmd to set environmental variable
app.listen(port, () => console.log(`Server listening at port ${port}`));