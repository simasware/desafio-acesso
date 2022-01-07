import { Router } from "express";
import FundTransferController from "../controllers/FundTransferController.js";
import TransactionStatusController from "../controllers/TransactionStatusController.js";

const routes = Router();

routes.get("/api/fund-transfer/:id", TransactionStatusController);
routes.post("/api/fund-transfer", FundTransferController);

export default routes;
