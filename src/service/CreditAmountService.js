const axios = require("axios");
const AppMessage = require("../classes/AppMessage.js");

const CreditAmountService = async (accountNumber, amount, type = "Credit") => {
  const amountTransferRequest = await axios.post(
    `${process.env.BANK_API_URL}/Account`,
    {
      accountNumber: accountNumber,
      value: amount,
      type: type,
    },
    {
      headers: {
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  if (amountTransferRequest.success) {
    return AppMessage("Success");
  }
  return AppMessage("Error", "Transaction failed.", false);
};

module.exports = CreditAmountService;
