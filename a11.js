const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'chatbottests',
  password: ''
});

const botToken = '6813527987:AAGSIDjnmzPNScGS2TW6sWZAlK2Yb05Pj44';
const bot = new TelegramBot(botToken, { polling: true });

connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к БД: ' + err.message);
    return;
  }
  console.log('Подключение к серверу MySQL успешно установлено');
});

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

app.use(bodyParser.json());

// Получение случайного элемента
app.get('/randomItem', (req, res) => {
  connection.query('SELECT * FROM items ORDER BY RAND() LIMIT 1', (error, results) => {
    if (error) {
      console.error('Ошибка при получении случайного элемента:', error.message);
      res.status(500).send('Ошибка сервера');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('База данных пуста');
      return;
    }
    res.json(results[0]);
  });
});

// Удаление элемента по ID
app.post('/deleteItem/:id', (req, res) => {
  const itemId = req.params.id;
  connection.query('DELETE FROM items WHERE id = ?', itemId, (error, results) => {
    if (error) {
      console.error('Ошибка при удалении элемента:', error.message);
      res.status(500).send('Ошибка сервера');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('Элемент не найден');
      return;
    }
    res.status(200).send('Элемент успешно удален');
  });
});

// Получение элемента по ID
app.get('/getItemByID/:id', (req, res) => {
  const itemId = req.params.id;
  connection.query('SELECT * FROM items WHERE id = ?', itemId, (error, results) => {
    if (error) {
      console.error('Ошибка при получении элемента:', error.message);
      res.status(500).send('Ошибка сервера');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Элемент не найден');
      return;
    }
    res.json(results[0]);
  });
});

// Обработчик команды /randomItem
bot.onText(/\/randomItem/, (msg) => {
  const chatId = msg.chat.id;
  fetch('http://localhost:3000/randomItem')
    .then(response => response.json())
    .then(data => bot.sendMessage(chatId, `(${data.id}) - ${data.name}: ${data.description}`))
    .catch(error => console.error('Ошибка при запросе случайного элемента:', error));
});

// Обработчик команды /deleteItem
bot.onText(/\/deleteItem (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const itemId = match[1];
  fetch(`http://localhost:3000/deleteItem/${itemId}`, { method: 'POST' })
    .then(response => response.text())
    .then(message => bot.sendMessage(chatId, message))
    .catch(error => console.error('Ошибка при удалении элемента:', error));
});

// Обработчик команды /getItemByID
bot.onText(/\/getItemByID (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const itemId = match[1];
  fetch(`http://localhost:3000/getItemByID/${itemId}`)
    .then(response => response.json())
    .then(data => bot.sendMessage(chatId, `(${data.id}) - ${data.name}: ${data.description}`))
    .catch(error => console.error('Ошибка при получении элемента по ID:', error));
});

app.listen(port, () => {
  console.log("Сервер запущен на порту", port);
});
