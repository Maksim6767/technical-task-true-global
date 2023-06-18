const { catchAsync } = require('../../utils');
const User = require('../../models/userModel');

const getUserList = catchAsync(async (req, res) => {
  const users = await User.find().select('-__v'); 
  
  res.status(200).json({
      users,
    });
});

module.exports = getUserList;
