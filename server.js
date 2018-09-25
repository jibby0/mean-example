const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const logger = require('morgan');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder


// API file for interacting with MongoDB
const api = require('./server/routes/api');

// API location
app.use('/api', api);

app.use('/', express.static(path.join(__dirname, 'dist/mean-example')));
app.use('*', express.static(path.join(__dirname, 'dist/mean-example')));

// Send all other requests to the Angular app
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist/mean-example/index.html'));
// });

// development stuff
var createError = require('http-errors');
app.use(logger('dev'));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});


//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
