const pino = require('pino');
const logger = pino({
    prettyPrint: {
        colorize: true
    }
});
const moment = require('moment');

let captureError = (errorMessage, errorOrigin, errorLevel) => {
    let currentTime = moment();

    let errorResponse = {
        timestamp: currentTime,
        errorMessage: errorMessage,
        errorOrigin: errorOrigin,
        errorLevel: errorLevel
    }

    logger.error(errorResponse);
    return errorResponse;
}

let captureInfo = (message, origin, importance) => {
    let currentTime = moment();

    let infoMessage = {
        timestamp: currentTime,
        message: message,
        origin: origin,
        importance: importance
    }

    logger.info(infoMessage);
    return infoMessage;
}

module.exports = {
    error: captureError,
    info: captureInfo
}