const { Movie, validateMovie } = require('./../models/movie') ;
const { Genre } = require('./../models/genre') ;
const express = require('express');
const mongoose = require('mongoose');
const auth = require('./../middleware/auth');

const router = express.Router() ;

router.get('/', async (req, res) => {
   const moviesList =  await Movie.find().sort({ title: 1 }).select() ;
   res.send(moviesList);
});

router.get('/:id', async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);
        if(!movie) return res.status(400).send(`Movie with give id ${req.params.id} is not found...`)
        res.send(movie);
    }
    catch(e){
        res.status(400).send(e.message);
        console.log('Error : ', e.message)
    }
});

router.post('/', auth,  async (req, res) => {

   const joiRes = validateMovie(req.body);
   if(joiRes.error) return res.status(400).send(joiRes.error.details[0].message);
    
   try{
        const genre = await Genre.findById(req.body.genreId);
        if(!genre) return res.status(400).send('Invalid genre !');

        let movie = new Movie({
                title: req.body.title,
                genre: {
                    id: genre._id,
                    name: genre.name
                },
                numberInStock: req.body.numberInStock,
                dailyRentalRate: req.body.dailyRentalRate,     
            });
        movie = await movie.save();

        if(!movie) return res.status.status(400).send('Unable to save movie..');
        res.send(movie);
    }
    catch(e){
        res.status(400).send(e.message);
        console.log('Error : ', e.message);
    }
});

router.put('/:id', auth, async (req, res) => {

   try{
        const genre = await Genre.findById(req.body.genreId);
        if(!genre) return res.status(400).send('Invalid genre! Update Unsucessfull');
        // use find() instead findByIdAndUpdate() otherwise if a value is not passed through json that field can updated to null as a value
        const movie = await Movie.findByIdAndUpdate(req.params.id, {
            $set :{
                title: req.body.title,
                genre: {
                    id: genre._id,
                    name: genre.name
                },
                // numberInStock: req.body.numberInStock, //if we don't want to update this field
                // dailyRentalRate: req.body.dailyRentalRate, 
            }
        }, { new: true}) ;

        if(!movie) return res.status(400).send(`Movie with give id ${req.params.id} is not found...`)
        res.send(movie);
   }
   catch(e){
        res.status(400).send(e.message);
        console.log('Error : ', e.message); 
   }
});

router.delete('/:id',auth, async (req, res) => {
    try{
        const movie = await Movie.findOneAndRemove({
            _id: req.params.id
        });
        if(!movie) return res.status(400).send(`Movie with give id ${req.params.id} is not found...`);
        res.send(movie);
   }
   catch(e){
        res.status(400).send(e.message);
        console.log('Error : ', e.message); 
   }
});

module.exports = router;