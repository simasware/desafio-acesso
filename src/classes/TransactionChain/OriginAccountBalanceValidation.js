const AccountInfoService = require("../../service/AccountInfoService.js");
const HandlerChain = require("./HandlerChain.js");

class OriginAccountBalanceValidation extends HandlerChain {
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
        transactionObject.accountOrigin
      );
      if (accountInfo.balance >= transactionObject.value) {
        this.nextValidation.handleNext(transactionObject);
      } else {
        throw "Origin account does not have enough balance for transaction.";
      }
    } catch (e) {
      throw "Service unavaiable";
    }
  }
}

module.exports = OriginAccountBalanceValidation;
