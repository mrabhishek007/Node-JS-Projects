const express = require('express');
const app = express();

app.get('/', (req, res) =>{
   res.send('Hello World..!')
});

app.get('/api/courses', (req, res)=> {
    res.send([1, 2, 3]);
});

// Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys.
app.get('/api/posts/:year/:month', (req, res)=> {
           
            // Route Params

    // res.send(req.params); //sends JSON data
    // res.send(`year = ${req.params.year}, month = ${req.params.month}`)

           // QueryString
    res.send(req.query);   // denoted by ?sortBy=name

});

var port = process.env.PORT || 3000;   // 'set PORT=PORT_NO' in cmd to set environmental variable
app.listen(port, () => console.log(`Server listening at port ${port}`));