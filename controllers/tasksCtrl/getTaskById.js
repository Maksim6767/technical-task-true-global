const createError = require('http-errors');
const { catchAsync } = require('../../utils');
const Task = require('../../models/taskModel');

const getTaskById = catchAsync(async (req, res) => {
  const { taskId } = req.params;
  const { _id } = req.user;

  const task = await Task.findById(taskId, _id).populate(
    'owner',
    '_id email category name dateStart dateEnd'
  );

  if (!task) {
    throw createError(404, `Task with id ${taskId} not found`);
  };

  res.status(200).json({
    data: { task },
  });
});

module.exports = getTaskById;