const { catchAsync } = require('../../utils');
const User = require('../../models/userModel');

const createUser = catchAsync(async (req, res) => {
    
    const newUser = await User.create(req.body);
      
    newUser.password = undefined;
  
    res.status(201).json({
      user: newUser,
    });
});

module.exports = createUser;