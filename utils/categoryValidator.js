const Joi = require('joi');

exports.categoryDataValidator = (data) => Joi.object()
    .options({ abortEarly: false }) 
    .keys({
        name: Joi.string().min(3).max(300).required(),
        dateCreated: Joi.string().required(),
    })
    .validate(data);
    