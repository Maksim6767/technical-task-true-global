const Category = require('../../models/categoryModel');
const createError = require('http-errors');
const { catchAsync } = require('../../utils');

const getCategoryById = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { _id } = req.user;

  const category = await Category.findById(userId, _id).populate(
    'owner',
    '_id name dateCreated'
  );

  if (!category) {
    throw createError(404, `Category with id ${userId} not found`);
  };

  res.status(200).json({
    data: { category },
  });
});

module.exports = getCategoryById;