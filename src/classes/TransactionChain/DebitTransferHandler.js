const CreditAmountService = require("../../service/CreditAmountService.js");
const HandlerChain = require("./HandlerChain.js");

class DebitTransferHandler extends HandlerChain {
  constructor() {
    super();
    this.nextValidation = new HandlerChain();
  }

  setNext(nextValidation) {
    this.nextValidation = nextValidation;
  }

  async handleNext(transactionObject) {
    try {
      const debitTransfer = await CreditAmountService(
        transactionObject.accountOrigin,
        transactionObject.value,
        "Debit"
      );
      if (debitTransfer.success) {
        this.nextValidation.handleNext(transactionObject);
      } else {
        throw "Failed to debit amount from origin account";
      }
    } catch (e) {
      throw "Service unavaiable";
    }
  }
}

module.exports = DebitTransferHandler;
