const AppMessage = require("../classes/AppMessage.js");
const CreditTransferHandler = require("../classes/TransactionChain/CreditTransferHandler.js");
const DebitTransferHandler = require("../classes/TransactionChain/DebitTransferHandler.js");
const TransactionLog = require("../models/TransactionLog.js");
const UpdateTransferStatusService = require("./UpdateTransferStatusService.js");

const TransferService = async (transactionId) => {
  try {
    const transactionData = await TransactionLog.findByPk(transactionId);
    const debitTransferHandler = new DebitTransferHandler();
    const creditTransferHandler = new CreditTransferHandler();
    debitTransferHandler.setNext(creditTransferHandler);
    await debitTransferHandler.handleNext(transactionData);

    await UpdateTransferStatusService(transactionId, "Confirmed");
    return AppMessage("Success");
  } catch (error) {
    console.log(error);
    await UpdateTransferStatusService(transactionId, "Error", error);
    return AppMessage("Error", "Failed to complete transaction.", false);
  }
};

module.exports = TransferService;
