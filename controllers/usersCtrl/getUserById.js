const { catchAsync } = require('../../utils');
const User = require('../../models/userModel');

const getUserById = catchAsync(async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id);

        res.status(200).json({
            user,
        });
});

module.exports = getUserById;