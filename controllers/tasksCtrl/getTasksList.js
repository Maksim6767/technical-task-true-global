const Task = require("../../models/taskModel");
const { catchAsync } = require("../../utils");
const { USER } = require('../../constants/userRolesEnum');

const getTasksList = catchAsync(async (req, res) => {
    const { page, limit, sort, order, search } = req.query;

    const findOptions = search
    ? { $or: [{ name: { $regex: search, $options: 'i' } } ]}
        : {owner:req.user.id};

    if (search && req.user.role === USER) {
        findOptions.$or.forEach((option) => {
            option.owner = req.user;
        })
    };

    if (!search && req.user.role === USER) {
        findOptions.owner = req.user;
        };
    
    const tasksQuery = Task.find(findOptions);

//sorting.......
    tasksQuery.sort(`${order === 'DESC' ? '-' : ''}${sort}`);

// pagination.....
    const paginationPage = +page || 1;
    const paginationLimit = +limit || 5;
    const skip = (paginationPage - 1) * paginationLimit;

    tasksQuery.skip(skip).limit(paginationLimit);

    const tasks = await tasksQuery;

    const total = await Task.count(findOptions);

    res.status(200).json({
        count: tasks.length,
        total,
        tasks,
    })
});

module.exports = getTasksList;