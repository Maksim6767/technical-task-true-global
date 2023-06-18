const Joi = require('joi');
const PASSWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/;
const userRolesEnum = require('../constants/userRolesEnum');

exports.createUserDataValidator = (data) => Joi.object()
    .options({ abortEarly: false }) 
    .keys({
        email: Joi.string().email().required(),
        password: Joi.string().regex(PASSWD_REGEX).required(),
        role: Joi.string().valid(...Object.values(userRolesEnum)),
    })
    .validate(data);
    
    exports.updateUserDataValidator = (data) => Joi.object()
    .options({ abortEarly: false }) 
    .keys({
        email: Joi.string().email(),
        role: Joi.string().valid(...Object.values(userRolesEnum)),
    })
    .validate(data);

    exports.signupUserDataValidator = (data) => Joi.object()
    .options({ abortEarly: false }) 
    .keys({
        email: Joi.string().email().required(),
        password: Joi.string().regex(PASSWD_REGEX).required(),
    })
    .validate(data);