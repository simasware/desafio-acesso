const AccountInfoService = require("../../service/AccountInfoService.js");
const HandlerChain = require("./HandlerChain.js");

class DestinationAccountExistsValidation extends HandlerChain {
  constructor() {
    super();
    this.nextValidation = new HandlerChain();
  }

  setNext(nextValidation) {
    this.nextValidation = nextValidation;
  }

  async handleNext(transactionObject) {
    try {
      const accountInfo = await AccountInfoService(
        transactionObject.accountDestination
      );
      if (accountInfo.accountNumber) {
        this.nextValidation.handleNext(transactionObject);
      } else {
        throw "Destination account does not exists.";
      }
    } catch (e) {
      throw "Service unavaiable";
    }
  }
}

module.exports = DestinationAccountExistsValidation;
