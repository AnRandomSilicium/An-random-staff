const TelegramBot = require('node-telegram-bot-api');
const token = '6813527987:AAGSIDjnmzPNScGS2TW6sWZAlK2Yb05Pj44';
console.log('bot has been started ....');

const bot = new TelegramBot (token, { polling: true}) 
//help
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '/site - сайт');
    bot.sendMessage(chatId, '/creator - создатель');
});

//site
bot.onText(/\/site/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'https://students.forus.ru/beta');
});

//creator 
bot.onText(/\/creator/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Voronov A.A.');
});


//Hello
bot.onText(/\/start/, msg =>{
    const { chat: { id }} = msg
    bot.sendMessage(id, 'Привет, октагон!')
});