const Joi = require('joi');

exports.taskDataValidator = (data) => Joi.object()
    .options({ abortEarly: false }) 
    .keys({
        name: Joi.string().min(3).max(300).required(),
        dateStart: Joi.string().required(),
        dateEnd: Joi.string().required(),
        category: Joi.string().required(),
        statusTask: Joi.string().lowercase().trim().min(2).max(30),
    })
    .validate(data);
    

