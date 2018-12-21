const asyncMiddleware = require('./../middleware/async');
const { Genre, validateGenre } = require('./../models/genre'); // object destructuring 
const auth = require('./../middleware/auth');
const adminAuth = require('./../middleware/admin');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', asyncMiddleware(async (req, res) => {

 // Handlng exception in a seperate function 'asyncMiddleware()'
    const genera = await Genre.find().sort({ name: 1 });
    res.send(genera);
}));

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const genre = await Genre.findById(id);
        if(!genre) return res.send(`The genres with given id ${id} is not found`) ;
        res.send(genre);
    }
    catch(e){
        console.log('Error : ', e.message);
    }
});

router.post('/', auth,  async (req, res) => { // auth is a middleware function here
    const result =  validateGenre(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message) ;

    let genera = new Genre({
        name : req.body.name,
    })
    
    try{
        genera = await genera.save();
        res.send(genera);   
    }
    catch(e){
        console.log('Error : ', e.message);
    }
});

router.put('/:id', auth, async (req, res) => {
    const result = validateGenre(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message) ;
    
    try{
        const genre = await Genre.findByIdAndUpdate(req.params.id, {
            $set:{ name: req.body.name }
        }, { new: true });
    
        if(!genre) return res.send(`The genres with given id ${req.params.id} is not found`) ;
        res.send(genre);
    }
    catch(e){
        console.log('Error : ', e.message);
    }
});

// Only admin can delete this section
router.delete('/:id', [auth, adminAuth], async (req, res) => {    //first check user, then check admin
    try{
        const id = req.params.id;
        const genre = await Genre.findByIdAndRemove(id);
        if(!genre) return res.send(`The genres with given id ${id} is not found`) ; //code terminates if item not found
        res.send(genre);
    }
    catch(e){
        console.log('Error : ', e.message);
    }
});
module.exports = router;