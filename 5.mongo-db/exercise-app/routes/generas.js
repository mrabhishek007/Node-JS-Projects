const { checkName, Genres } = require('../model/generaModel');  //object destruturing [intead .checkname we are dirctly using this feature]
const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const genera = await Genres.find().sort({ name: 1 });
        res.send(genera);
    }
    catch(e){
        console.log('Error : ', e.message);
    }

});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const genre = await Genres.findById(id);
        if(!genre) return res.send(`The genres with given id ${id} is not found`) ;
        res.send(genre);
    }
    catch(e){
        console.log('Error : ', e.message);
    }
});

router.post('/', async (req, res) => {
    const result =  checkName(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message) ;

    let genera = new Genres({
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

router.put('/:id', async (req, res) => {
    const result = checkName(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message) ;
    
    try{
        const genre = await Genres.findByIdAndUpdate(req.params.id, {
            $set:{ name: req.body.name }
        }, { new: true });
    
        if(!genre) return res.send(`The genres with given id ${req.params.id} is not found`) ;
        res.send(genre);
    }
    catch(e){
        console.log('Error : ', e.message);
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const genre = await Genres.findByIdAndRemove(id);
        if(!genre) return res.send(`The genres with given id ${id} is not found`) ; //code terminates if item not found
        res.send(genre);
    }
    catch(e){
        console.log('Error : ', e.message);
    }
});
module.exports = router;