import TransactionStatusService from "../service/TransactionStatusService.js";

const TransactionStatusController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transactionStatus = await TransactionStatusService(id);
    res.json(transactionStatus).status(200);
  } catch (e) {
    next(e);
  }
};

export default TransactionStatusController;
