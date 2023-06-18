const { Types } = require('mongoose');
const { AppError, catchAsync, taskValidator } = require('../utils');
const Task = require('../models/taskModel');

exports.checkTaskId = catchAsync (async (req, res, next) => {
    const { taskId } = req.params;

    const taskIdIsValid = Types.ObjectId.isValid(taskId);

    if (!taskIdIsValid) next(new AppError(404, 'Task does not exist...'));

    const taskExists = await Task.exists({ _id: taskId });

    if (!taskExists) next(new AppError(404, 'Task does not exist...'));

    next();
});

exports.checkTaskData = catchAsync(async (req, res, next) => {
    const { error, value } = taskValidator.taskDataValidator(req.body);

    if (error) return next(new AppError(400, error.details.map(item => item.message)));

    const taskExists = await Task.exists({ name: value.name }); 

    if (taskExists) return next(new AppError(409, 'Task with this name already exists..'));

    req.body = value;

    next();
});
