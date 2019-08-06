const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const appConfig = require('./config/appConfig');
const errorHandlerMiddleware = require('./middlewares/appErrorHandler');
const routeLoggerMiddleware = require('./middlewares/routeLogger');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorHandlerMiddleware.errorHandler);
app.use(routeLoggerMiddleware.requestIpLogger);

let modelsPath = './models';
fs.readdirSync(modelsPath).forEach(function(file) {
    if(~file.indexOf(.js)) {
        console.log(file);
        require(modelsPath + '/' + file);
    }
})

let routesPath = './routes';
fs.readdirSync(routesPath).forEach(function (file) {
    if (~file.indexOf(.js)) {
        console.log(file);
        require(routesPath + '/' + file);
    }
})

app.use(errorHandlerMiddleware.notFoundHandler);

app.listen(appConfig.port, () => {
    console.log('Node server is running on port 3000');
    mongoose.connect(appConfig.db.uri);
});

mongoose.connection.on('open', err => {
    if(err) {
        console.log('Database error');
        console.log(err);
    } else {
        console.log('Database connection is successful');
    }
});

mongoose.connection.on('error', err => {
    console.log('Database connection error');
    console.log(err);
})