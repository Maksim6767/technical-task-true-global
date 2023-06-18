const { catchAsync } = require('../../utils');
const User = require('../../models/userModel');

const deleteUserById = catchAsync(async (req, res) => {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.sendStatus(204);
});

module.exports = deleteUserById;
