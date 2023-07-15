const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const createError = require('http-errors');
const { catchAsync } = require('../../utils');
const Task = require('../../models/taskModel');
const User = require('../../models/userModel');

const editTask = catchAsync(async (req, res, next) => {
  const { taskId } = req.params;
  const { name, dateStart, dateEnd, statusTask } = req.body;
  const { _id } = req.user;
  
  if (!name || !dateStart || !dateEnd || !statusTask) {
    throw createError(400, 'missing field');
  };

  const user = await User.findById(_id);

  const updateTask = await Task.findByIdAndUpdate(
    taskId,
    req.body,
    {
      new: true,
    },
    _id
  );
  
  if (!updateTask) {
    throw createError(404, 'Not found');
    };
    
  if (user.chatId) {
      const msg = `Status task "${name}" updated on "${statusTask}"!`;
      const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN, { polling: true });
      
      bot.sendMessage(user.chatId, msg);
    } else {
      console.log(`ChatId for user ${user._id} not found`);
    }
  
  res.status(200).json({
    data: { updateTask },
    });
  }
);

module.exports = editTask;