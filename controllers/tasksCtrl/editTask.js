const createError = require('http-errors');
const { catchAsync } = require('../../utils');
const Task = require('../../models/taskModel');

const editTask = catchAsync(async (req, res, next) => {
  const { taskId } = req.params;
  const { name, dateStart, dateEnd } = req.body;
  const { _id } = req.user;

  if (!name || !dateStart || !dateEnd ) {
    throw createError(400, 'missing field');
  }

  const updateTask = await Task.findByIdAndUpdate(
    taskId,
    req.body,
    {
      new: true,
    },
    _id
  );

  if (!updateTask) {
    throw createError(404, 'Not found');
    };
    
  res.status(200).json({
    message: 'updated',
    data: { updateTask },
  });
});

module.exports = editTask;