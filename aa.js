const express = require('express');
const mysql = require('mysql2/promise'); 
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'chatbottests',
  password: ''
});

app.use(bodyParser.json());

///addItem///
app.post('/addItem', async (request, response) => {
  const { id, name, description } = request.body;
  try {
    const sql = "INSERT INTO items (id, name, description) VALUES (?, ?, ?)";
    await pool.query(sql, [id, name, description]);
    console.log("Данные добавлены");
    response.sendStatus(200);
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
});

///deleteItem///
app.post('/deleteItem', async (request, response) => {
  const { id } = request.body;
  try {
    const sql = "DELETE FROM items WHERE id = ?";
    await pool.query(sql, [id]);
    console.log("Данные удалены");
    response.sendStatus(200);
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
});

///getAllItems///
app.post('/getAllItems', async (request, response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM items");
    console.log(rows);
    response.status(200).json(rows);
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
});

///updateItem///
app.post('/updateItem', async (request, response) => {
  const { id, name, description } = request.body;
  try {
    const sql = 'UPDATE items SET name = ?, description = ? WHERE id = ?';
    await pool.query(sql, [name, description, id]);
    console.log("Данные обновлены");
    response.sendStatus(200);
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
});

///End///
app.listen(port, () => {
  console.log("Сервер запущен на порту", port);
});
