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
//Команды для работы бота в БД
//randomItem
//Команда должна возвращать случайный предмет, в виде: “({поле ID}) - {поле NAME}: {поле DESC}”
app.get('/randomItem', (request, response) => {
  connection.query('SELECT * FROM items ORDER BY RAND() LIMIT 1', (error, results) => {
    if (error) {
      console.error('Ошибка при получении случайного элемента: ' + error.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results.length === 0) {
      res.send('База данных пуста');
    } else {
      const randomItem = results[0];
      res.send(`(${randomItem.id}) - ${randomItem.name}: ${randomItem.description}`);
    }
  });
});
//getItemByID
//Команда должна возвращать предмет из БД по ID //Возвращает строку в виде: “({поле ID}) - {поле NAME}: {поле DESC}”
app.post('/getItemByID', (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).send('Bad Request');
    return;
  }
  connection.query('SELECT * FROM items WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Ошибка при получении элемента по ID: ' + error.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results.length === 0) {
      res.send('Элемент с указанным ID не найден');
    } else {
      const item = results[0];
      res.send(`(${item.id}) - ${item.name}: ${item.description}`);
    }
  });
});

//Команды для работы БД
///addItem///
app.post('/addItem', (request, response) => {
  pool.query(sql, data, function(err, results) {
    if(err) console.log(err);
    console.log(results);
  });
  const sql = "INSERT INTO items (id, name, description) VALUES(INT, VARCHAR, TEXT) ";
  connection.query(sql, user, function(err, results) {
    if(err) console.log(err);
    else console.log("Данные добавлены");
  });
  });
  
///deleteItem///
//Команда должна удалять предмет из БД по ID и возвращать ответ:	//Удачно (в случае если предмет существует) //Ошибка (в случае если такого предмета нет)
app.post('/deleteItemByID', (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).send('Bad Request');
    return;
  }
  connection.query('DELETE FROM items WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Ошибка при удалении элемента: ' + error.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results.affectedRows === 0) {
      res.send('Ошибка: Элемент с указанным ID не найден');
    } else {
      res.send('Успешно удалено');
    }
  });
});

///getAllItems///
  app.post('/getAllItems', (request, response) => {
  connection.query("SELECT * FROM items")
  .then(([rows, fields]) =>{
    console.log(rows);
  })
  .catch(err =>{
    console.log(err);
  });
});

///updateItem///
  app.post('/updateItem', (request, response) => {
  const { id, name, desc } = request.body;
  if (!id, !name,  !desc) {
    response.send(null); 
    return;
  }
  connection.query('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, desc, id], (error, results) => {
    if (error) {
      console.error('Ошибка при обновлении объекта: ' + error.message);
      response.send(null);
      return;
    }
    if (results.affectedRows === 0) {
      response.json({}); 
    } else {
      connection.query('SELECT * FROM items WHERE id = ?', [id], (error, updatedItem) => {
        if (error) {
          console.error('Ошибка при получении обновленного объекта: ' + error.message);
          response.send(null);
          return;
        }
        response.json(updatedItem[0]);
      });
    }
  });
});
///End///
app.listen(port, () => {
  console.log("Сервер запущен на порту", {port});
});