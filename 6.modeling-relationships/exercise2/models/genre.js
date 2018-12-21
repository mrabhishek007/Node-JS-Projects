const mongoose = require('mongoose');
const Joi = require('joi');

    // Schema
const genreSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    }
}); 
    // Model 
const Genre = mongoose.model('genres', genreSchema);

function validateGenre(genre) {
    const schema =  {
        name : Joi.string().min(3).required()
    } 
    return Joi.validate(genre, schema);
}

module.exports.validateGenre = validateGenre;
module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;