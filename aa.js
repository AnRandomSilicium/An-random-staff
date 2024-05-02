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
app.post('/deleteItem', (request, response) => {
  pool.query(sql, data, function(err, results) {
    if(err) console.log(err);
    console.log(results);
  });
  const sql = "DELETE items (id) VALUES (INT, VARCHAR,?)";
  connection.query(sql, Item)
          .then(result =>{
            console.log(result[0]);
          })
          .catch(err =>{
            console.log(err);
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
