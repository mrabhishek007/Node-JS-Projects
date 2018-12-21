const Joi = require('joi');
const mongoose = require('mongoose');
const { Genre, genreSchema, validateGenre } = require('./genre'); // Object destructuring
 
    // Schema
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        min: 0, // negative no is prohibited
        max: 255,
        required: true
    },
    dailyRentalRate:{
        type: Number,
        min: 0,
        max: 255,
        required: true
    }
});
    // Model
const Movie = mongoose.model('movies', movieSchema);

    // Joi validation
function validateMovie(movie){
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.objectId.required(),
        nameInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required(),
    }
    return Joi.validate(movie, schema);
}

module.exports.validateMovie = validateMovie;
module.exports.Movie = Movie;


