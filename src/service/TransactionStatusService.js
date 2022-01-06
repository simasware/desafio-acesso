import TransactionLog from "../models/TransactionLog.js";

const TransactionStatusService = async (transactionId) => {
  const transactionStatus = await TransactionLog.findByPk(transactionId, {
    attributes: { include: ["transactionMessage", "transactionMessage"] },
  });
  if (transactionStatus.transaction_message) {
    return {
      Status: transactionStatus.transactionStatus,
      Message: transactionStatus.transactionMessage,
    };
  }
  return {
    Status: transactionStatus.transactionStatus,
  };
};

export default TransactionStatusService;
