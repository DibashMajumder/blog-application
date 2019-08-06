const response = require('../libs/responseLib');

let errorHandler = (err, req, res, next) => {
    console.log('Application level error handler called');
    console.log(err);

    let apiResponse = response.generate(true, 'Global level error handler called', 500, null);
    res.send(apiResponse);
}

let notFoundHandler = (req, res, next) => {
    console.log('Global level not found handler called');
    let apiResponse = response.generate(true, 'Route not found in the application', 404, null);
    res.status(404).send(apiResponse);
}

module.exports = {
    errorHandler,
    notFoundHandler
}