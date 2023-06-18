const Category = require("../../models/categoryModel");
const { catchAsync } = require("../../utils");
const { USER } = require('../../constants/userRolesEnum');

const createCategory = catchAsync( async (req, res) => {
    const newCategoryData = {
        owner: req.user,
        name: req.body.name,
        dateCreated: req.body.dateCreated,
    };

    const newCategory = await Category.create(newCategoryData);
    res.status(201).json({
        message: 'category created',
        createCategory: newCategory,
    })
});

module.exports = createCategory;