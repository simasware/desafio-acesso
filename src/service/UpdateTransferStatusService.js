import TransactionLog from "../models/TransactionLog.js";

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

export default UpdateTransferStatusService;
