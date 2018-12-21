const { User } = require('./../models/user');
const Joi = require('joi'); 
const _  = require('lodash'); 
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

function validateUser(user) {
    const schema = {
        email: Joi.string().email().min(5).max(50).required(),
        password: Joi.string().min(5).max(50).required()
    }
    return Joi.validate(user, schema);
}

router.post('/', async (req, res) => {
   
    // Joi validation
    const joiRes = validateUser(req.body);
    if(joiRes.error) return res.status(400).send(joiRes.error.details[0].message)

    //  Check whether email is registered or not ?
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Username or password is incorrect')

    // Check plain password with hased password using 'bcrypt'
    const match = await bcrypt.compare(req.body.password, user.password); 
    if(!match) return res.status(400).send('Invalid password !');

    // Genrating token using jwt
    const token = user.generateAuthToken();
    res.send(token);
    console.log('JWT token : ', token);

});

module.exports = router;