import TransactionLog from "../models/TransactionLog.js";

const TransactionStatusService = async (transactionId) => {
  const transactionStatus = await TransactionLog.findByPk(transactionId, {
    attributes: { include: ["transactionMessage", "transactionStatus"] },
  });
  if (!transactionStatus) {
    return {
      Status: "Not Found",
      Message: "Transaction not found :(",
    };
  }
  if (transactionStatus?.transactionMessage) {
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
