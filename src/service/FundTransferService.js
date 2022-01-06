import TransactionLog from "../models/TransactionLog.js";

const FundTransferService = async (transactionInfo) => {
  const { accountOrigin, accountDestination, value } = transactionInfo;
  const transactionLog = await TransactionLog.create({
    accountOrigin,
    accountDestination,
    value,
  });

  return transactionLog.transactionId;
};

export default FundTransferService;
