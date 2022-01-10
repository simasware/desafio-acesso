class HandlerChain {
  setNext(nextValidation) {}
  async handleNext(transactionObject) {
    return true;
  }
}

module.exports = HandlerChain;
