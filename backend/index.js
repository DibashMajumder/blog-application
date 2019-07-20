const express = require('express');
const appConfig = require('./config/appConfig');
const app = express();



app.listen(appConfig.port, () => {
    console.log('Am able to connect, taht huge')
});