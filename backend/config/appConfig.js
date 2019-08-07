const mongo = require('../auth/key');

let appConfig = {
    port: process.env.PORT || 3000,
    allowedCorsOrigin: "*",
    env: "dev",
    db: {
        uri: mongo.mongo_uri
    },
    apiVersion: "/api/v1"
};

module.exports = {
    port: appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    environment: appConfig.env,
    db: appConfig.db,
    apiVersion: appConfig.apiVersion
}