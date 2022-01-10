const dotenv = require("dotenv");
const express = require("express");
const routes = require("./routes/index.js");
const queue = require("./queue/queue.js");
const TransferService = require("./service/TransferService.js");
const winston = require("winston");
const axios = require("axios");

const { combine, timestamp, label, printf } = winston.format;
const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] [${level}]: ${message}`;
});

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "bankly-api.log" }),
  ],
  format: combine(label({ label: "bankly-api" }), timestamp(), logFormat),
});

dotenv.config();
const app = express();

app.use(express.json());
app.use(routes);

axios.interceptors.response.use(function (response) {
  global.logger.info(`${response.config.method} ${response.config.url}`);
  return response;
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Servidor iniciado na porta ${process.env.APP_PORT}`);
  queue.consume("transferencias", async (message) => {
    const transfer = JSON.parse(message.content.toString());
    await TransferService(transfer.transactionId);
  });
});
