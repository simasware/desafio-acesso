const AccountInfoService = require("../../service/AccountInfoService.js");
const HandlerChain = require("./HandlerChain.js");

class OriginAccountExistsValidation extends HandlerChain {
  constructor() {
    super();
    this.nextValidation = new HandlerChain();
  }

  setNext(nextValidation) {
    this.nextValidation = nextValidation;
  }

  async handleNext(transactionObject) {
    let accountOrigin = {};
    try {
      accountOrigin = await AccountInfoService(transactionObject.accountOrigin);
    } catch (e) {
      console.log(e);
      throw "Failed to retrieve origin account info.";
    }

    if (!accountOrigin.accountInfo.accountNumber) {
      throw "Origin account does not exists";
    }

    if (accountOrigin.accountInfo.balance < transactionObject.value) {
      throw "Origin account balance insufficient for this operation.";
    }

    this.nextValidation.handleNext(transactionObject);
  }
}

module.exports = OriginAccountExistsValidation;
