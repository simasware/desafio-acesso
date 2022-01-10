const CreditAmountService = require("../../service/CreditAmountService.js");
const HandlerChain = require("./HandlerChain.js");

class CreditTransferHandler extends HandlerChain {
  constructor() {
    super();
    this.nextValidation = new HandlerChain();
  }

  setNext(nextValidation) {
    this.nextValidation = nextValidation;
  }

  async handleNext(transactionObject) {
    try {
      const creditTransfer = await CreditAmountService(
        transactionObject.accountDestination,
        transactionObject.value,
        "Credit"
      );
      if (creditTransfer.success) {
        return true;
      }
      throw "Failed to credit amount to destination account";
    } catch (e) {
      throw "Service unavaiable";
    }
  }
}

module.exports = CreditTransferHandler;
