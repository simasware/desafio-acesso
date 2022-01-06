import FundTransferService from "../service/FundTransferService.js";

const FundTransferController = async (req, res, next) => {
  try {
    const { accountOrigin, accountDestination, value } = req.body;
    if (!accountOrigin || !accountDestination || !value) {
      res.status(400).json({ error: "Invalid values" });
    }
    const fundTransfer = await FundTransferService({
      accountOrigin,
      accountDestination,
      value,
    });
    res.json({ transactionId: fundTransfer }).status(200);
  } catch (e) {
    next(e);
  }
};

export default FundTransferController;
