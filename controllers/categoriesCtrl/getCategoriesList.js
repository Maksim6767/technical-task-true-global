const Category = require("../../models/categoryModel");
const { catchAsync } = require("../../utils");
const { USER } = require('../../constants/userRolesEnum');

const getCategoriesList = catchAsync(async (req, res) => {
    const { page, limit, sort, order, search } = req.query;

    const findOptions = search
    ? { $or: [{ name: { $regex: search, $options: 'i' } } ] }
        : {owner:req.user.id};

    if (search && req.user.role === USER) {
        findOptions.$or.forEach((option) => {
            option.owner = req.user;
        })
    };

    if (!search && req.user.role === USER) {
        findOptions.owner = req.user;
        };
    
    const categoriesQuery = Category.find(findOptions);

    categoriesQuery.sort(`${order === 'DESC' ? '-' : ''}${sort}`);

    const paginationPage = +page || 1;
    const paginationLimit = +limit || 2;
    const skip = (paginationPage - 1) * paginationLimit;

    categoriesQuery.skip(skip).limit(paginationLimit);

    const categories = await categoriesQuery;

    const total = await Category.count(findOptions);

    res.status(200).json({
        count: categories.length,
        total,
        categories,
    })
});

module.exports = getCategoriesList;