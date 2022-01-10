const TransactionStatusService = require("../service/TransactionStatusService.js");

const TransactionStatusController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transactionStatus = await TransactionStatusService(id);
    if (transactionStatus.Status === "Not Found") {
      return res.json(transactionStatus).status(404);
    }
    return res.json(transactionStatus).status(200);
  } catch (e) {
    next(e);
  }
};

module.exports = TransactionStatusController;
