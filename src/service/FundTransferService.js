const AppMessage = require("../classes/AppMessage.js");
const DestinationAccountExistsValidation = require("../classes/TransactionChain/DestinationAccountExistsValidation.js");
const OriginAccountExistsValidation = require("../classes/TransactionChain/OriginAccountExistsValidation.js");
const TransactionLog = require("../models/TransactionLog.js");

const FundTransferService = async (transactionInfo) => {
  const { accountOrigin, accountDestination, value } = transactionInfo;
  const originAccountValidation = new OriginAccountExistsValidation();
  const destinationAccountValidation = new DestinationAccountExistsValidation();

  try {
    originAccountValidation.setNext(destinationAccountValidation);

    await originAccountValidation.handleNext(transactionInfo);

    const transactionLog = await TransactionLog.create({
      accountOrigin,
      accountDestination,
      value,
    });

    return { success: true, transactionId: transactionLog.transactionId };
  } catch (e) {
    return AppMessage("Error", e, false);
  }
};

module.exports = FundTransferService;
