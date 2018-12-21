const mongoose = require('mongoose');
const Joi = require('joi');

const genresSchema =  new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        lowercase: true,
        trim:true,
        validate: {
            validator: function (value) {
              if(value==='aaaa') return false;  // If 'aaaa' is name post not allowed
            },
            message: 'Invalid Name..'
        }
    },
    // _id: Number // overriding of default id is possible
});

var Genres = mongoose.model('Genre', genresSchema);

function checkName(genresObj){
    // Setting joi to handle input validation
    const schema = {
        name: Joi.string().min(3).required() //checking name validation
    }
    return Joi.validate(genresObj, schema) ;
}

module.exports.Genres = Genres; 
module.exports.checkName = checkName; 