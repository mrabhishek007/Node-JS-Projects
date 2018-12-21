const mongoose =  require('mongoose');
const Joi = require('joi');

const customersSchema = new  mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
        trim: true,
        lowercase: true
    },
    isGold: {
        type: Boolean,
        default:false
    },
    phone: {
        type: String,
        maxlength: 20,
        minlength: 8,
        required: true
    }
});

const Customer = mongoose.model('customers', customersSchema );

function validateName(customer) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(8).max(20).required(),
        isGold: Joi.boolean()
    }
    return Joi.validate(customer, schema) ;
}

module.exports.validateName = validateName;
module.exports.Customer = Customer;
module.exports.customersSchema = customersSchema; 

