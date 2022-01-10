const queue = require("../queue/queue.js");
const FundTransferService = require("../service/FundTransferService.js");

const FundTransferController = async (req, res, next) => {
  try {
    const { accountOrigin, accountDestination, value } = req.body;
    if (!accountOrigin || !accountDestination || !value) {
      return res.status(400).json({ error: "Invalid request!" });
    }

    if (value < 0) {
      return res
        .status(400)
        .json({ error: "Transferred amount cannot be lesser than zero!" });
    }

    if (accountOrigin === accountDestination) {
      return res
        .status(400)
        .json({ error: "Destination and Origin accounts cannot be the same!" });
    }
    const fundTransfer = await FundTransferService({
      accountOrigin,
      accountDestination,
      value,
    });
    if (fundTransfer.success) {
      queue.sendToQueue("transferencias", {
        transactionId: fundTransfer.transactionId,
      });
    }
    const statusCode = fundTransfer.success ? 200 : 400;
    console.log(statusCode);
    res.status(statusCode).json(fundTransfer);
  } catch (e) {
    next(e);
  }
};

module.exports = FundTransferController;
