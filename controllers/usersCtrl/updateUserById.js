const { catchAsync } = require('../../utils');
const User = require('../../models/userModel');

const updateUserById = catchAsync(async (req, res) => {
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json({
            user: updatedUser,
        });
});

module.exports = updateUserById;
