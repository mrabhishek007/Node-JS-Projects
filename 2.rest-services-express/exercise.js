const express = require('express');
const bodyparser = require('body-parser');
const Joi = require('joi');

const genres = [
    {id:1, name: 'action'},
    {id:2, name: 'drama'},
    {id:3, name: 'horror'},
]

const app = express();

//SET THE JSON as Mime-type
app.use(bodyparser.json());

//We are telling that we are sending JSON data instead of form data
app.use( bodyparser.urlencoded({extended:false})); // Use 'true' if we are sending form data

app.get('/', (req, res) => {
    res.send(`<h2>Welcome to movie Application...</h2>
              <p><a href="http://localhost:3000/api/lists">show genres list</a></p>  `);
});

app.get('/api/lists', (req, res) => {
    res.send(JSON.stringify(genres)) ;
});

app.get('/api/lists/:id', (req, res) => {
    const id = req.params.id;
    const genre = findGenres(id);
    if(!genre) return res.send(`The genres with given id ${id} is not found`) ; //code terminates if item not found
    res.send(genre);
});

app.post('/api/lists', (req, res) => {
    const result =  checkName(req.body);
    if(result.error){
          // Bad request 400
        return res.status(400).send(result.error.details[0].message) ; // terminates if error occurs
    }
    var newItem = {
        id : genres.length + 1,
        name : req.body.name
    }
    genres.push(newItem);
    res.send(newItem);
});

app.put('/api/lists/:id', (req, res) => {
      // Check whether id is valid
    const id = req.params.id;
    const genre = findGenres(id);
    if(!genre) return res.send(`The genres with given id ${id} is not found`) ; //code terminates if item not found

      // Check whether 'name is valid'
    const result = checkName(req.body);
    if(result.error){
        // Bad request 400
      return res.status(400).send(result.error.details[0].message) ; // terminates if error occurs
    } 

    genre.name = req.body.name ;
    res.send(genre);
});

app.delete('/api/lists/:id', (req, res) => {
    
     // Check whether id is valid
    const id = req.params.id;
    const genre = findGenres(id); // if valid returns matched array item else returns undefined
    if(!genre) return res.send(`The genres with given id ${id} is not found`) ; //code terminates if item not found

     //delete item
    const index = genres.indexOf(genre);
    genres.splice(index,1);
    res.send(JSON.stringify(genres));
   
})

function checkName(genresObj){
    // Setting joi to handle input validation
       const schema = {
        name: Joi.string().min(3).required() //checking name validation
    }
    return Joi.validate(genresObj, schema) ;
}


function findGenres(id){
   return  genres.find( (element) => element.id === parseInt(id) ) ; //if valid, returns matched element obj of array otherwise returns undefined
}

const port = process.env.PORT || 3000 ;
app.listen(port, () => console.log(`Server listening at port no ${port}....`))