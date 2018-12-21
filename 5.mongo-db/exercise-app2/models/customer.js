const mongoose =  require('mongoose');
const Joi = require('joi');

const customersSchema = new  mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 20,
        required: true,
        trim: true,
        lowercase: true
    },
    isGold: {
        type: Boolean,
/*         required: function () {   //only required when name is valid
            if(this.name) return true;
        }, */
        default:false
    },
    phone: {
        type: String,
        maxlength: 10,
        minlength:8,
        required:true
    }
});

const Course = mongoose.model('customers', customersSchema );

function validateName(customer) {
    const schema = {
        name: Joi.string().min(3).max(20).required(),
        phone: Joi.string().min(8).max(10).required(),
        isGold: Joi.boolean()
    }
    return Joi.validate(customer, schema) ;
}

module.exports.validateName = validateName;
module.exports.Course = Course;

