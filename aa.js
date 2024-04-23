const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Подключение к вашей базе данных MySQL
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

// Middleware для разбора тела запроса в формате JSON
app.use(bodyParser.json());

// Путь для обновления объекта в базе данных
app.post('/updateItem', (req, res) => {
  const { id, name, desc } = req.body;

  // Проверка наличия всех необходимых параметров
  if (!id, !name,  !desc) {
    res.send(null); // Если неправильные входные параметры, возвращаем null
    return;
  }

  // Обновление объекта в базе данных
  connection.query('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, desc, id], (error, results) => {
    if (error) {
      console.error('Ошибка при обновлении объекта: ' + error.message);
      res.send(null); // Если произошла ошибка при обновлении, возвращаем null
      return;
    }

    // Проверяем количество обновленных строк
    if (results.affectedRows === 0) {
      res.json({}); // Если объект не найден, возвращаем пустой объект
    } else {
      // Получаем обновленный объект из базы данных
      connection.query('SELECT * FROM items WHERE id = ?', [id], (error, updatedItem) => {
        if (error) {
          console.error('Ошибка при получении обновленного объекта: ' + error.message);
          res.send(null); // Если произошла ошибка при получении, возвращаем null
          return;
        }
        res.json(updatedItem[0]); // Возвращаем обновленный объект
      });
    }
  });
});

// Запуск сервера
app.listen(port, () => {
  console.log("Сервер запущен на порту", {port});
});