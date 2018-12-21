const Joi = require('joi');

module.exports = function () {
    Joi.objectId = require('joi-objectid')(Joi);  // Validates mongo id. It creates a new function in Joi object so it is usable anywhere in project by default bcz objectId() is the property of Joi now. So inorder to validate we need to call Joi.objectId()
}