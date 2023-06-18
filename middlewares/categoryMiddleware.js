const { Types } = require('mongoose');

const { AppError, catchAsync, categoryValidator } = require('../utils');

const Category = require('../models/categoryModel');

exports.checkCategoryId = catchAsync (async (req, res, next) => {
    const { userId } = req.params;

    const categoryIdIsValid = Types.ObjectId.isValid(userId);

    if (!categoryIdIsValid) next(new AppError(404, 'Category does not exist...'));

    const categoryExists = await Category.exists({ _id: userId });

    if (!categoryExists) next(new AppError(404, 'Category does not exist...'));

    next();
});

exports.checkCategoryData = catchAsync(async (req, res, next) => {
    const { error, value } = categoryValidator.categoryDataValidator(req.body);

    if (error) return next(new AppError(400, error.details.map(item => item.message)));

    const categoryExists = await Category.exists({ name: value.name }); 

    if (categoryExists) return next(new AppError(409, 'Category with this name already exists..'));

    req.body = value;

    next();
});