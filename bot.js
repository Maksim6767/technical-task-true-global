const TelegramBot = require('node-telegram-bot-api');
// const { catchAsync } = require('./utils');
// const createError = require('http-errors');
// const { AppError } = require('./utils');
const User = require('./models/userModel');

const startBot = (req, res) => {

const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN, { polling: true });  

  bot.on('message', async (msg) => {
  
  const chatId = msg.chat.id;
  const msgText = msg.text;
    
    console.log(chatId);
    // const msgText = 'Привет! Я получил твое сообщение:' + msg.text;
    console.log(msgText);
    // 1. /connect 6488ad50354f9a02b999c356 - приходит строка
    const args = msgText.split(' ');
    console.log(args);
    // 2. из нее нужно достать второе слово (певрое должно быть /коннект второе - айди)
    if (args[0] !== '/connect') {
      bot.sendMessage(chatId, 'Invalid command.');
      
    return;
    } 
    const userId = args[1];
    console.log(userId);
    // 3. Проверяем если ли такой пользователь по айди (если нет - отправляем сообщение в телеграм что пользователь не найден)
  const user = await User.findById(userId);
  
    console.log(user);
    if (!user) {
      bot.sendMessage(chatId, 'User not found..');
      return;
    };
      
    // 4. обновить чат айди в монго по этому айди пользователя
    await User.findByIdAndUpdate(userId, {chatId: chatId}, { new: true });
  
    // 5. отправляем сообщение что чат айди сохранен
    bot.sendMessage(chatId, 'Чат-айди сохранен!');
  
  bot.startPolling();

  return;
  })
};

module.exports = startBot;