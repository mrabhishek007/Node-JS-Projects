const Joi = require('joi');
const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
          name: {
              type: String,
              required: true,
              minlength: 5,
              maxlength: 50  
          },
          isGold:{
              type: Boolean,
              default: false
          },
          phone:{
              type: String,
              required: true,
              maxlength: 20,
              minlength: 8
        }}),
    required: true     
    },
    movie:{
        type : new mongoose.Schema({
          title: {
            type: String,
            trim: true,
            required: true,
            minlength: 5,
            maxlength: 255
          },
          dailyRentalRate:{
            type: Number,
            required:true,
            min: 0,
            max: 255,
          }
        }),
        required: true
    },
    dateOut:{
        type: Date,
        default: Date.now,
        required: true
    },
    dateReturned:{
        type: Date,
    },
    rentalfee: {
        type: Number,
        min: 0
    }
});

function validateRental(rental) {
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    }
    return Joi.validate(rental, schema);
}

const Rental = mongoose.model('rentals', rentalSchema);

module.exports.Rental = Rental;
module.exports.validateRental = validateRental;  // (valid) exports is refrence of module.exports
