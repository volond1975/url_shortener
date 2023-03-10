//https://dev-gang.ru/article/razvertyvanie-prilozhenija-nodejs-v-heroku-3np8tg6bec/

const express = require('express');
const bodyParser = require('body-parser');
const urlShortener = require('node-url-shortener');
const app = express();
const path = require('path');
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded());
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.listen(port, () => console.log(`url-shortener listening on port ${port}!`));
app.post('/url', function(req, res) {
    const url = req.body.url;

    urlShortener.short(url, function(err, shortUrl) {
        res.send(shortUrl);
    });
});