const Category = require('../../models/categoryModel');
const createError = require('http-errors');
const { catchAsync } = require('../../utils');

const editCategory = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const { name, dateCreated } = req.body;
  const { _id } = req.user;

  if (!name || !dateCreated) {
    throw createError(400, 'missing field');
  }

  const updateCategory = await Category.findByIdAndUpdate(
    userId,
    req.body,
    {
      new: true,
    },
    _id
  );

  if (!updateCategory) {
    throw createError(404, 'Not found');
    };
    
  res.status(200).json({
    message: 'category updated',
    data: { updateCategory },
  });
});

module.exports = editCategory;