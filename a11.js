const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'chatbottests',
  password: ''
});

connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к БД: ' + err.message);
    return;
  }
  console.log('Подключение к серверу MySQL успешно установлено');
});

app.use(bodyParser.json());

app.get('/randomItem', (request, response) => {
  connection.query("SELECT * FROM items ORDER BY RAND() LIMIT 1", (error, results) => {
    if (error) {
      console.error('Ошибка при получении случайного объекта: ' + error.message);
      response.send(null);
      return;
    }
    const randomItem = results[0];
    if (randomItem) {
      response.send(`(${randomItem.id}) - ${randomItem.name}: ${randomItem.description}`);
    } else {
      response.send('Нет доступных предметов.');
    }
  });
});

app.post('/deleteItem/:id', (request, response) => {
  const itemId = request.params.id;
  connection.query("DELETE FROM items WHERE id = ?", [itemId], (error, results) => {
    if (error) {
      console.error('Ошибка при удалении объекта: ' + error.message);
      response.send('Ошибка');
      return;
    }
    if (results.affectedRows > 0) {
      response.send('Успешно');
    } else {
      response.send('Ошибка: предмет с указанным ID не найден.');
    }
  });
});

app.get('/getItemByID/:id', (request, response) => {
  const itemId = request.params.id;
  connection.query("SELECT * FROM items WHERE id = ?", [itemId], (error, results) => {
    if (error) {
      console.error('Ошибка при получении объекта по ID: ' + error.message);
      response.send(null);
      return;
    }
    const item = results[0];
    if (item) {
      response.send(`(${item.id}) - ${item.name}: ${item.description}`);
    } else {
      response.send('Предмет с указанным ID не найден.');
    }
  });
});

app.listen(port, () => {
  console.log("Сервер запущен на порту", port);
});
