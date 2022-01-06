import { Router } from "express";
import FundTransferController from "../controllers/FundTransferController.js";
import QueueTransferController from "../controllers/QueueTransferController.js";
import TransactionStatusController from "../controllers/TransactionStatusController.js";

const routes = Router();

routes.get("/api/fund-transfer/:id", TransactionStatusController);
routes.post("/api/fund-transfer", FundTransferController);
routes.post("/api/queue", QueueTransferController);

export default routes;
