const TelegramBot = require('node-telegram-bot-api');
const token = '6813527987:AAGSIDjnmzPNScGS2TW6sWZAlK2Yb05Pj44';

const bot = new TelegramBot (token, { polling: true}) 

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет, октагон!');
});