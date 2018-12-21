const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const  jwt = require('jsonwebtoken'); // JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties

    // Schema
const userSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 50
    },
    password: {  // password will be hashed
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024 
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}); 

userSchema.methods.generateAuthToken = function () {  // Geneartes a method attached to Model. It can be acessed outside like 'user.generateAuthToken()' where user is reference
    // Generating a token using jwt ( Javascript web token )
    const token = jwt.sign({ id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey')); // Never hardcode private key. Use env varibles to set private keys
    return token;
}

    // Model 
const User = mongoose.model('users', userSchema);

function validateUser(user) {
    const schema =  {
        name : Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(255).required(),
        isAdmin: Joi.boolean()
    } 
    return Joi.validate(user, schema);
}

module.exports.validateUser = validateUser;
module.exports.User = User;