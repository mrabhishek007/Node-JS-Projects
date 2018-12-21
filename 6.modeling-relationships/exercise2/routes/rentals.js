const { Rental, validateRental } = require('./../models/rental');
const { Customer } = require('./../models/customer');
const { Movie } = require('./../models/movie');
const mongoose = require('mongoose');
const auth = require('./../middleware/auth');
const router = require('express').Router();
// Promise based Library for transactions in MongoDB
const Fawn = require('fawn'); // Implements 'TWO PHASE COMMITS IN MONGODB' (Similar to 'transitions' in DBMS)

Fawn.init(mongoose);

router.get('/', async (req, res) => {
    try{
      const rentals =  await Rental.find().sort({ dateOut: -1 });
      if(rentals.length === 0) return res.status(400).send('No rentals found..');
      res.send(rentals);
    }
    catch(e){
        res.status(400).send(e.message);
        console.log('Error : ', e.message);
    }
});

router.get('/:id', async (req, res) => {
    try{
        const rental = await Rental.findById(req.params.id);
        if(!rental) return res.status(400).send(`Rental with given id ${req.params.id} not found`);
        res.send(rental);
    }
    catch(e){
        res.status(400).send(e.message);
        console.log('Error : ', e.message);
    }
});

router.post('/', auth, async (req, res) => {

        //Joi Validation
    const joiResult = validateRental(req.body);
    if(joiResult.error) return res.status(400).send(`Bad Request : ${joiResult.error.details[0].message}`);

    try{
        const customer = await Customer.findById(req.body.customerId);
        if(!customer) return res.status(400).send(`Customer with given id ${req.body.customerId} not found`);
        
        const movie = await Movie.findById(req.body.movieId);
        if(!movie) return res.status(400).send(`Movie with given id ${req.body.movieId} not found`);

        if(movie.numberInStock===0) return res.status(400).send('movie not in stock');

        let rental = new Rental({
            customer: {
                _id: customer._id,
                name: customer.name,
                isGold: customer.isGold,
                phone: customer.phone
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            }
        });

        // setting up Two phase commit using Fawn
        Fawn.Task()
          .save('rentals', rental) // 1st argument => collection name
          .update('movies', { _id: movie._id }, {
              $inc: { numberInStock: -1 } //decrementing
          })
          // .remove() // for remove operation using fawn
          .run(); //to commit transition    
       
        res.send(rental);
    }
    catch(e){
        res.status(500).send(e.message);   // Internal Server Error
        console.log('Error : ', e.message);
    }
});

router.put('/:id', auth, async (req, res) => {
    try{
        const rental = await Rental.findByIdAndUpdate(req.params.id, {
            $set: {
                dateReturmed: Date.now,
                rentalfee: res.body.rentalfee
            }
        }, { new: true });
        if(!rental) return res.status(400).send(`rental with given id ${req.params.id} not found`);
        res.send(rental);
    }
    catch(e){
        res.status(400).send(e.message);
        console.log('Error : ', e.message);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try{
        const rental = await Rental.findOneAndRemove({_id: req.params.id})
        if(!rental) return res.status(400).send(`rental with given id ${req.params.id} not found`);
        res.send(rental);
    }
    catch(e){
        res.status(400).send(e.message);
        console.log('Error : ', e.message);
    }
});

module.exports = router;


