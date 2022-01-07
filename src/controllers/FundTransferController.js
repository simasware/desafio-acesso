import queue from "../queue/queue.js";
import FundTransferService from "../service/FundTransferService.js";

const FundTransferController = async (req, res, next) => {
  try {
    const { accountOrigin, accountDestination, value } = req.body;
    if (!accountOrigin || !accountDestination || !value) {
      return res.status(400).json({ error: "Invalid values" });
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
    queue.sendToQueue("transferencias", {
      transactionId: fundTransfer,
    });
    res.json({ transactionId: fundTransfer }).status(200);
  } catch (e) {
    next(e);
  }
};

export default FundTransferController;
