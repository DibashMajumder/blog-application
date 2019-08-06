require '../auth/key.js';

let appConfig = {
    port: 3000,
    allowedCorsOrigin: "*",
    env: "dev",
    db: {
        uri: `mongodb+srv://${mongoAuth.user}:${mongoAuth.password}@cluster0-cdodn.mongodb.net/blog-application?retryWrites=true&w=majority`
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