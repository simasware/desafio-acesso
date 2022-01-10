const axios = require("axios");
const AppMessage = require("../classes/AppMessage.js");

const DebitAmountService = async (accountNumber, amount) => {
  try {
    await axios.post(
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
    return AppMessage("Success");
  } catch (e) {
    return AppMessage("Error", "Failed to finish transaction.", false);
  }
};

module.exports = DebitAmountService;
