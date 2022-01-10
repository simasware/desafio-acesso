const TransactionLog = require("../models/TransactionLog.js");

const UpdateTransferStatusService = async (
  transactionId,
  newStatus,
  transactionMessage = null
) => {
  const transaction = TransactionLog.findByPk(transactionId);
  transaction.transactionStatus = newStatus;
  transaction.transactionMessage = transactionMessage;
  const updated = await TransactionLog.update(transaction, {
    where: {
      transactionId: transactionId,
    },
  });
  if (updated) {
    return true;
  }
  return false;
};

module.exports = UpdateTransferStatusService;
