const { User, validateUser } = require('./../models/user'); // object destructuring 
const _ = require('lodash'); // Lodash is a JavaScript library which provides utility functions for common programming tasks using the functional programming paradigm
const bcrypt = require('bcrypt');
const auth = require('./../middleware/auth'); // autherization => check whether user has permission to acess a resource or not
const admin = require('./../middleware/auth'); // admin autherization
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// first req will go to middleware to check whether token is provided in request header or not then validate it
router.get('/me', auth, async (req, res) => {
    // Getting the current logged in user
    const user  = await User.findById(req.user.id).select({password: 0}); //password excluded, // .select('-password') also valid
   res.send(user);
 });

router.post('/', async (req, res) => {
    
    const joiRes = validateUser(req.body);
    if(joiRes.error) return res.status(400).send(joiRes.error.details[0].message)

    // Check whether a User is already registered
    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send('User already registered..')

    /* user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }); */

    // Using lodash above code is similified like following
    user = new User(_.pick( req.body, [ 'name', 'email', 'password', 'isAdmin' ] ));
   
    // Hashing passwords using Bcrypt
    const salt =  await bcrypt.genSalt(10); 
    user.password =  await bcrypt.hash(user.password, salt); // encryption sucessfull

    user = await user.save();
    if(!user) return res.status(400).send('Error while creating user !');

    // Generating a token using jwt ( Javascript web token )
    const token = user.generateAuthToken();

    // Using lodash to create an object directly and send 
    // Also sending token as response header to the client
    res.header('x-auth-token', token).send(_.pick( user, [ '_id', 'name', 'email', 'isAdmin' ] ))
    
     // Normal approach
    /* res.send({
        name: user.name,
        email: user.email,
        password: '******'
    }); */
});

module.exports = router;