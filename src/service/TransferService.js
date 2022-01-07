import AppMessage from "../classes/AppMessage.js";
import TransactionLog from "../models/TransactionLog.js";
import CreditAmountService from "./CreditAmountService.js";
import DebitAmountService from "./DebitAmountService.js";
import UpdateTransferStatusService from "./UpdateTransferStatusService.js";

const TransferService = async (transactionId) => {
  try {
    const transactionData = await TransactionLog.findByPk(transactionId);
    await UpdateTransferStatusService(transactionId, "Processing");
    const debitTransfer = await DebitAmountService(
      transactionData.accountOrigin,
      transactionData.value
    );
    const creditTransfer = await CreditAmountService(
      transactionData.accountDestination,
      transactionData.value
    );
    if (creditTransfer.sucess && debitTransfer.success) {
      await UpdateTransferStatusService(transactionId, "Confirmed");
      return AppMessage("Success");
    }

    await UpdateTransferStatusService(
      transactionId,
      "Error",
      debitTransfer.response.message + " " + creditTransfer.response.message
    );
    return AppMessage("Error", "Failed to complete transaction.", false);
  } catch (error) {
    await UpdateTransferStatusService(
      transactionId,
      "Error",
      "Transfer failed."
    );
    return AppMessage("Error", "Failed to complete transaction.", false);
  }
};

export default TransferService;
