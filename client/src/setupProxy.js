const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require('./app/config/backend.config.js');

const API_URL = `http://${config.BACKEND_HOST}:8080`;

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://10.6.131.24:8080",
      changeOrigin: true,
    })
  );
};