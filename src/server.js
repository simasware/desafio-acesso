import dotenv from "dotenv";
import express from "express";
import routes from "./routes/index.js";
import queue from "./queue/queue.js";
import TransferService from "./service/TransferService.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.APP_PORT, () => {
  console.log(`Servidor iniciado na porta ${process.env.APP_PORT}`);
  queue.consume("transferencias", async (message) => {
    const transfer = JSON.parse(message.content.toString());
    await TransferService(transfer.transactionId);
  });
});
