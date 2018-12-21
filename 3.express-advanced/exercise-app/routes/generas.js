const express = require('express');
const Joi = require('joi');
const router = express.Router();

const genres = [
    {id:1, name: 'action'},
    {id:2, name: 'drama'},
    {id:3, name: 'horror'},
];

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

router.get('/', (req, res) => {
    res.send(JSON.stringify(genres)) ;
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const genre = findGenres(id);
    if(!genre) return res.send(`The genres with given id ${id} is not found`) ; //code terminates if item not found
    res.send(genre);
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {

    // Check whether id is valid
    const id = req.params.id;
    const genre = findGenres(id); // if valid returns matched array item else returns undefined
    if(!genre) return res.send(`The genres with given id ${id} is not found`) ; //code terminates if item not found

    //delete item
    const index = genres.indexOf(genre);
    genres.splice(index,1);
    res.send(JSON.stringify(genres));

});

module.exports = router;