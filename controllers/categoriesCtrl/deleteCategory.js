const Category = require('../../models/categoryModel');
const createError = require('http-errors');
const { catchAsync } = require('../../utils');

const deleteCategory = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const { _id } = req.user;

  const deleteCategory = await Category.findByIdAndDelete(userId, _id);

  if (!deleteCategory) {
    throw createError(404, 'Not found');
  }

  res.status(200).json({
    message: 'category deleted',  
    data: { deleteCategory },
  });
});

module.exports = deleteCategory;