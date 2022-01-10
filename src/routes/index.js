const { Router } = require("express");
const FundTransferController = require("../controllers/FundTransferController.js");
const TransactionStatusController = require("../controllers/TransactionStatusController.js");
const RequestLogger = require("../middleware/RequestLogger.js");

const routes = Router();

routes.use(RequestLogger);

routes.get("/api/fund-transfer/:id", TransactionStatusController);
routes.post("/api/fund-transfer", FundTransferController);
routes.get("/", (req, res, next) => {
  res.send("Bankly API").status(200);
});

module.exports = routes;
