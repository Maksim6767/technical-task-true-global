const createError = require('http-errors');
const { catchAsync } = require('../../utils');
const Task = require('../../models/taskModel');

const deleteTask = catchAsync(async (req, res, next) => {
  const { taskId } = req.params;
  const { _id } = req.user;

  const deleteTask = await Task.findByIdAndDelete(taskId, _id);

  if (!deleteTask) {
    throw createError(404, 'Not found');
  }

  res.status(200).json({
    message: 'task deleted',  
    data: { deleteTask },
  });
});

module.exports = deleteTask;