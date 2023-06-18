const Task = require("../../models/taskModel");
const { catchAsync } = require("../../utils");
const { USER } = require('../../constants/userRolesEnum');

const createTask = catchAsync( async (req, res) => {
    const newTaskData = {
        owner: req.user,
        category: req.body.category,
        name: req.body.name,
        dateStart: req.body.dateStart,
        dateEnd: req.body.dateEnd,
    };
    
    const newTask = await Task.create(newTaskData);
    
    res.status(201).json({
        message: 'task created',
        createTask: { newTask },
    })
});

module.exports = createTask;